import { keyframes } from '@emotion/react';

// Premium entrance animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Premium glow and pulse effects
export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
  }
`;

export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.8), 0 0 60px rgba(99, 102, 241, 0.5), 0 0 90px rgba(99, 102, 241, 0.3);
  }
`;

export const premiumGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(139, 92, 246, 0.4),
      0 0 60px rgba(236, 72, 153, 0.3),
      0 0 80px rgba(245, 87, 108, 0.2);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(99, 102, 241, 0.9),
      0 0 60px rgba(139, 92, 246, 0.7),
      0 0 90px rgba(236, 72, 153, 0.5),
      0 0 120px rgba(245, 87, 108, 0.3);
  }
`;

// Floating and movement animations
export const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const floatSlow = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(1deg);
  }
  66% {
    transform: translateY(-10px) rotate(-1deg);
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

// Premium shimmer and gradient effects
export const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

export const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const rainbowShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Morphing and transformation effects
export const morphing = keyframes`
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
`;

export const breathe = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.08);
    filter: brightness(1.2);
  }
`;

// Text and typography animations
export const typewriter = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const textGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(99, 102, 241, 0.8),
      0 0 10px rgba(99, 102, 241, 0.6),
      0 0 15px rgba(99, 102, 241, 0.4),
      0 0 20px rgba(99, 102, 241, 0.2);
  }
  50% {
    text-shadow: 
      0 0 10px rgba(99, 102, 241, 1),
      0 0 20px rgba(99, 102, 241, 0.8),
      0 0 30px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(99, 102, 241, 0.4);
  }
`;

export const gradientText = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Particle and background effects
export const particleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-40px) translateX(-5px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-20px) translateX(-15px) rotate(270deg);
    opacity: 0.9;
  }
`;

export const backgroundShift = keyframes`
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// Interactive hover effects
export const hoverLift = keyframes`
  0% {
    transform: translateY(0) scale(1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
`;

export const hoverGlow = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
  }
`;

// Loading and progress animations
export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const progressGlow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(139, 92, 246, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
  }
`;

// Premium card animations
export const cardHover = keyframes`
  0% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: translateY(-15px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  }
`;

export const cardGlow = keyframes`
  0% {
    box-shadow: 
      0 0 0 rgba(99, 102, 241, 0),
      0 10px 30px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 
      0 0 40px rgba(99, 102, 241, 0.4),
      0 30px 80px rgba(0, 0, 0, 0.2);
  }
`;

// Heart animation for footer
export const heartBeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.15);
  }
`;

export const heartGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(236, 72, 153, 0.6));
    color: #EC4899;
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(236, 72, 153, 0.9));
    color: #F43F5E;
  }
`;

// Utility animation classes
export const animationClasses = {
  fadeIn: `animation: ${fadeIn} 0.8s ease-out forwards`,
  slideUp: `animation: ${slideUp} 0.8s ease-out forwards`,
  slideInLeft: `animation: ${slideInLeft} 0.8s ease-out forwards`,
  slideInRight: `animation: ${slideInRight} 0.8s ease-out forwards`,
  scaleIn: `animation: ${scaleIn} 0.6s ease-out forwards`,
  pulse: `animation: ${pulse} 2s infinite`,
  glow: `animation: ${glow} 2s ease-in-out infinite alternate`,
  premiumGlow: `animation: ${premiumGlow} 3s ease-in-out infinite alternate`,
  float: `animation: ${float} 3s ease-in-out infinite`,
  floatSlow: `animation: ${floatSlow} 6s ease-in-out infinite`,
  rotate: `animation: ${rotate} 2s linear infinite`,
  bounce: `animation: ${bounce} 2s infinite`,
  shimmer: `animation: ${shimmer} 2s linear infinite`,
  gradientShift: `animation: ${gradientShift} 4s ease infinite`,
  rainbowShift: `animation: ${rainbowShift} 6s ease infinite`,
  morphing: `animation: ${morphing} 8s ease-in-out infinite`,
  breathe: `animation: ${breathe} 4s ease-in-out infinite`,
  typewriter: `animation: ${typewriter} 3s steps(40, end)`,
  textGlow: `animation: ${textGlow} 2s ease-in-out infinite alternate`,
  gradientText: `animation: ${gradientText} 3s ease infinite`,
  particleFloat: `animation: ${particleFloat} 8s ease-in-out infinite`,
  backgroundShift: `animation: ${backgroundShift} 20s ease infinite`,
  spin: `animation: ${spin} 1s linear infinite`,
  progressGlow: `animation: ${progressGlow} 2s ease-in-out infinite`,
  heartBeat: `animation: ${heartBeat} 1.5s ease-in-out infinite`,
  heartGlow: `animation: ${heartGlow} 2s ease-in-out infinite alternate`,
};

// Staggered animation delays for lists
export const staggerDelays = {
  item1: '0s',
  item2: '0.1s',
  item3: '0.2s',
  item4: '0.3s',
  item5: '0.4s',
  item6: '0.5s',
  item7: '0.6s',
  item8: '0.7s',
};

// Easing functions
export const easings = {
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export default {
  fadeIn,
  slideUp,
  slideInLeft,
  slideInRight,
  scaleIn,
  pulse,
  glow,
  premiumGlow,
  float,
  floatSlow,
  rotate,
  bounce,
  shimmer,
  gradientShift,
  rainbowShift,
  morphing,
  breathe,
  typewriter,
  textGlow,
  gradientText,
  particleFloat,
  backgroundShift,
  hoverLift,
  hoverGlow,
  spin,
  progressGlow,
  cardHover,
  cardGlow,
  heartBeat,
  heartGlow,
  animationClasses,
  staggerDelays,
  easings,
};