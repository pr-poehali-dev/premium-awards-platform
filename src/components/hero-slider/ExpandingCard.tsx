import { RefObject } from 'react';
import { Destination } from './destinations-data';

interface ExpandingCardProps {
  expandingCardIndex: number;
  activeIndex: number;
  destinations: Destination[];
  expandingCardRef: RefObject<HTMLDivElement>;
  visibleCardsCount: number;
}

export default function ExpandingCard({
  expandingCardIndex,
  activeIndex,
  destinations,
  expandingCardRef,
  visibleCardsCount
}: ExpandingCardProps) {
  const nextCardIndex = (expandingCardIndex - activeIndex - 1 + destinations.length) % destinations.length;
  
  const cardWidth = 192;
  const gap = 24;
  
  let calculatedRight = 64;
  for (let i = visibleCardsCount - 1; i > nextCardIndex; i--) {
    calculatedRight += cardWidth + gap;
  }
  
  const initialWidth = cardWidth;
  const initialHeight = 280;
  
  return (
    <div
      ref={expandingCardRef}
      className="absolute overflow-hidden z-[2]"
      style={{
        bottom: '176px',
        right: `${calculatedRight}px`,
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        borderRadius: '16px',
        animation: 'expandCard 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        willChange: 'width, height, bottom, right, border-radius'
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${destinations[expandingCardIndex].image})`,
          filter: 'brightness(0.6)',
          animation: 'expandCardImage 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
        style={{
          animation: 'fadeOutGradient 0.6s ease-out forwards'
        }}
      />
    </div>
  );
}
