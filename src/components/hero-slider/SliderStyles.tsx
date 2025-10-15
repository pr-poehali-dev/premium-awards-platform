export default function SliderStyles() {
  return (
    <style>{`
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(80px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes expandFromPosition {
        0% {
          width: 192px;
          height: 280px;
          border-radius: 16px;
        }
        100% {
          width: 100vw;
          height: 100vh;
          top: 0 !important;
          left: 0 !important;
          border-radius: 0;
        }
      }
      
      @keyframes expandCardImage {
        0% {
          transform: scale(1.05);
          filter: brightness(1.2);
        }
        100% {
          transform: scale(1);
          filter: brightness(0.6);
        }
      }
    `}</style>
  );
}