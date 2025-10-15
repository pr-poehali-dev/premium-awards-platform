import { Destination } from './destinations-data';
import { useRef, useEffect, useState } from 'react';

interface CardCarouselProps {
  visibleCards: Destination[];
  cardOffset: number;
  activeIndex: number;
  expandingCardIndex: number | null;
  onCardClick: (index: number) => void;
}

export default function CardCarousel({
  visibleCards,
  expandingCardIndex,
  onCardClick
}: CardCarouselProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<{top: number, left: number}[]>([]);

  useEffect(() => {
    if (expandingCardIndex !== null) {
      const slider = document.querySelector('.hero-slider-container');
      const sliderBounds = slider?.getBoundingClientRect();
      
      const positions = cardRefs.current.map(ref => {
        if (ref && sliderBounds) {
          const rect = ref.getBoundingClientRect();
          return { 
            top: rect.top - sliderBounds.top, 
            left: rect.left - sliderBounds.left
          };
        }
        return { top: 0, left: 0 };
      });
      setCardPositions(positions);
    }
  }, [expandingCardIndex]);

  return (
    <div ref={containerRef} className="flex gap-6 relative z-10">
      {visibleCards.map((dest, idx) => {
        const isExpanding = expandingCardIndex === dest.id;
        const position = cardPositions[idx];
        
        return (
          <div
            key={`${dest.id}-${idx}`}
            ref={el => cardRefs.current[idx] = el}
            onClick={() => onCardClick(idx)}
            className={`${isExpanding ? 'absolute' : 'relative'} rounded-2xl overflow-hidden cursor-pointer w-48 h-[280px] ${!isExpanding ? 'z-20 hover:scale-105 transition-transform duration-300' : 'z-[100]'}`}
            style={
              isExpanding && position
                ? {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    animation: 'expandToFullSlider 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  }
                : {
                    animation: `slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s both`
                  }
            }
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${dest.image})`,
                transform: 'scale(1.05)',
                filter: 'brightness(1.2)',
                animation: isExpanding ? 'expandCardImage 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs uppercase tracking-wider mb-1 opacity-80">{dest.subtitle}</p>
              <h3 className="font-bold leading-tight text-xs">
                {dest.title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}