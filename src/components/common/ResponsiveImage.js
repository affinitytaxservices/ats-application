import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  borderRadius = 0,
  lazy = true,
  placeholder = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Generate responsive srcSet for different screen sizes
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc || error) return '';
    
    // For SVG files, return as-is
    if (baseSrc.endsWith('.svg')) {
      return baseSrc;
    }
    
    // For other images, you could implement different sizes
    // This is a simplified version - in production, you'd have actual responsive images
    return baseSrc;
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        backgroundColor: placeholder ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        ...props.sx
      }}
      {...props}
    >
      {/* Loading skeleton */}
      {placeholder && !isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height || 200}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius,
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <Box
          sx={{
            width: '100%',
            height: height || 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.875rem',
            borderRadius
          }}
        >
          Image not available
        </Box>
      )}

      {/* Actual image */}
      {isInView && !error && (
        <Box
          component="img"
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit,
            borderRadius,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block'
          }}
        />
      )}
    </Box>
  );
};

export default ResponsiveImage;