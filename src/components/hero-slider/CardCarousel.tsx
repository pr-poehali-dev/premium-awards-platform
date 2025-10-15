import { Destination } from './destinations-data';

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
  return (
    <div className="flex gap-6 relative z-10">
      {visibleCards.map((dest, idx) => {
        const isExpanding = expandingCardIndex === dest.id;
        const cardRight = 64 + (visibleCards.length - 1 - idx) * (192 + 24);
        const cardBottom = 256;
        
        return (
          <div
            key={`${dest.id}-${idx}`}
            onClick={() => onCardClick(idx)}
            className={`${isExpanding ? 'fixed' : 'relative'} rounded-2xl overflow-hidden cursor-pointer ${!isExpanding ? 'w-48 h-[280px] z-10 hover:scale-105 transition-transform duration-300' : ''}`}
            style={
              isExpanding
                ? {
                    bottom: 0,
                    left: 0,
                    width: '192px',
                    height: '280px',
                    transform: `translate(calc(100vw - ${cardRight}px - 192px), -${cardBottom}px)`,
                    zIndex: 50,
                    animation: 'expandToFullscreen 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards'
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
                animation: isExpanding ? 'expandCardImage 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'
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