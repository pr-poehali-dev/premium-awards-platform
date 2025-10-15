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

      @keyframes expandFromCenter {
        0% {
          width: 192px;
          height: 280px;
          border-radius: 16px;
        }
        100% {
          width: 100vw;
          height: 100vh;
          border-radius: 0;
        }
      }
    `}</style>
  );
}