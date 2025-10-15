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

  return (
    <div className="flex gap-6 relative z-10">
      {visibleCards.map((dest, idx) => {
        const isExpanding = expandingCardIndex === dest.id;
        
        return (
          <div
            key={`${dest.id}-${idx}`}
            ref={el => cardRefs.current[idx] = el}
            onClick={() => onCardClick(idx)}
            className="relative rounded-2xl overflow-hidden cursor-pointer w-48 h-[280px] z-20 hover:scale-105 transition-transform duration-300"
            style={{
              animation: `slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s both`,
              opacity: isExpanding ? 0 : 1,
              transition: isExpanding ? 'opacity 0.6s ease-out' : 'none'
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${dest.image})`,
                transform: 'scale(1.05)',
                filter: 'brightness(1.2)'
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