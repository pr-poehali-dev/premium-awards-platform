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

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
    `}</style>
  );
}