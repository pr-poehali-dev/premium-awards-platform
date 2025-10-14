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

      @keyframes expandCard {
        0% {
          width: var(--initial-width, 192px);
          height: var(--initial-height, 280px);
          bottom: 112px;
          right: var(--initial-right, 300px);
          border-radius: 16px;
        }
        100% {
          width: 100vw;
          height: 100vh;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }
      }
    `}</style>
  );
}
