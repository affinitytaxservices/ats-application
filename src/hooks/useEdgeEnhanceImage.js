import { useEffect, useState } from 'react';

export default function useEdgeEnhanceImage(src, { enabled = false } = {}) {
  const [processedSrc, setProcessedSrc] = useState(src);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !src) {
      setProcessedSrc(src);
      return;
    }

    let cancelled = false;
    setIsProcessing(true);
    setError(null);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data, width, height } = imageData;

        const gray = new Uint8ClampedArray(width * height);
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          gray[j] = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
        }

        const gxK = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const gyK = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

        const out = new Uint8ClampedArray(width * height);
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            let gx = 0, gy = 0;
            let idx = 0;
            for (let ky = -1; ky <= 1; ky++) {
              for (let kx = -1; kx <= 1; kx++) {
                const p = gray[(y + ky) * width + (x + kx)];
                gx += p * gxK[idx];
                gy += p * gyK[idx];
                idx++;
              }
            }
            const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
            out[y * width + x] = mag;
          }
        }

        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
          const e = out[j];
          data[i] = Math.min(255, data[i] + e * 0.2);
          data[i + 1] = Math.min(255, data[i + 1] + e * 0.2);
          data[i + 2] = Math.min(255, data[i + 2] + e * 0.2);
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL('image/png', 0.92);
        if (!cancelled) setProcessedSrc(url);
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setProcessedSrc(src);
        }
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    };
    img.onerror = () => {
      if (!cancelled) {
        setError(new Error('Image load error'));
        setProcessedSrc(src);
        setIsProcessing(false);
      }
    };
    img.src = src;

    return () => { cancelled = true; };
  }, [enabled, src]);

  return { processedSrc, isProcessing, error };
}
