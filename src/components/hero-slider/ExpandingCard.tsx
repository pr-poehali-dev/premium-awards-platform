import { RefObject } from 'react';
import { Destination } from './destinations-data';

interface ExpandingCardProps {
  expandingCardIndex: number;
  cardOffset: number;
  activeIndex: number;
  destinations: Destination[];
  expandingCardRef: RefObject<HTMLDivElement>;
}

export default function ExpandingCard({
  expandingCardIndex,
  cardOffset,
  activeIndex,
  destinations,
  expandingCardRef
}: ExpandingCardProps) {
  const cardIndex = expandingCardIndex - cardOffset;
  const totalCards = 4;
  const cardWidth = 192;
  const activeCardWidth = 224;
  const gap = 24;
  
  let calculatedRight = 64;
  for (let i = totalCards - 1; i > cardIndex; i--) {
    const currentCardWidth = (cardOffset + i) === activeIndex ? activeCardWidth : cardWidth;
    calculatedRight += currentCardWidth + gap;
  }
  
  const initialWidth = expandingCardIndex === activeIndex ? activeCardWidth : cardWidth;
  const initialHeight = expandingCardIndex === activeIndex ? 340 : 280;
  
  return (
    <div
      ref={expandingCardRef}
      className="fixed z-[100] overflow-hidden"
      style={{
        bottom: '112px',
        right: `${calculatedRight}px`,
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        borderRadius: '16px',
        animation: 'expandCard 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
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
