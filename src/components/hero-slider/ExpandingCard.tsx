import { RefObject } from 'react';
import { Destination } from './destinations-data';

interface ExpandingCardProps {
  expandingCardIndex: number;
  activeIndex: number;
  destinations: Destination[];
  expandingCardRef: RefObject<HTMLDivElement>;
}

export default function ExpandingCard({
  expandingCardIndex,
  activeIndex,
  destinations,
  expandingCardRef
}: ExpandingCardProps) {
  const nextCardIndex = (expandingCardIndex - activeIndex - 1 + destinations.length) % destinations.length;
  
  const cardWidth = 192;
  const gap = 24;
  
  let calculatedRight = 64;
  for (let i = 3; i > nextCardIndex; i--) {
    calculatedRight += cardWidth + gap;
  }
  
  const initialWidth = cardWidth;
  const initialHeight = 280;
  
  return (
    <div
      ref={expandingCardRef}
      className="fixed z-[5] overflow-hidden"
      style={{
        bottom: '112px',
        right: `${calculatedRight}px`,
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        borderRadius: '16px',
        animation: 'expandCard 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        willChange: 'width, height, bottom, right, border-radius',
        ['--initial-width' as any]: `${initialWidth}px`,
        ['--initial-height' as any]: `${initialHeight}px`,
        ['--initial-right' as any]: `${calculatedRight}px`
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${destinations[expandingCardIndex].image})`,
          filter: 'brightness(0.6)'
        }}
      />
    </div>
  );
}
