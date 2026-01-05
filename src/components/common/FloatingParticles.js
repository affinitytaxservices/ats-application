import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ParticlesContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0,
});

const Canvas = styled('canvas')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -10;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = Math.random() * 1 + 0.5;
    this.size = Math.random() * 3 + 1;
    this.life = 1;
    this.decay = Math.random() * 0.01 + 0.005;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      'rgba(99, 102, 241, 0.6)',   // Indigo
      'rgba(139, 92, 246, 0.6)',   // Purple
      'rgba(16, 185, 129, 0.6)',   // Emerald
      'rgba(245, 158, 11, 0.6)',   // Amber
      'rgba(236, 72, 153, 0.6)',   // Pink
      'rgba(6, 182, 212, 0.6)',    // Cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.opacity = this.life * 0.5;

    // Reset particle if it goes off screen or dies
    if (this.y > this.canvas.height + 10 || this.life <= 0 || this.x < -10 || this.x > this.canvas.width + 10) {
      this.reset();
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Add glow effect
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.color;
    this.ctx.fill();
    
    this.ctx.restore();
  }
}

const FloatingParticles = ({ 
  particleCount = 50, 
  speed = 1, 
  opacity = 0.6,
  interactive = true 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }
    particlesRef.current = particles;

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, _index) => {
        // Mouse interaction effect
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        }

        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, speed, opacity, interactive]);

  return (
    <ParticlesContainer>
      <Canvas ref={canvasRef} />
    </ParticlesContainer>
  );
};

export default FloatingParticles;