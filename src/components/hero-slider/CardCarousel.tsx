import Icon from '@/components/ui/icon';
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
  cardOffset,
  activeIndex,
  expandingCardIndex,
  onCardClick
}: CardCarouselProps) {
  return (
    <div className="flex gap-6">
      {visibleCards.map((dest, idx) => {
        const globalIndex = cardOffset + idx;
        const isActive = globalIndex === activeIndex;
        const isExpanding = globalIndex === expandingCardIndex;

        if (isActive && !isExpanding) {
          return null;
        }

        return (
          <div
            key={`${dest.id}-${cardOffset}`}
            onClick={() => onCardClick(globalIndex)}
            className={`
              relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out
              ${isActive ? 'w-56 h-[340px] shadow-2xl' : 'w-48 h-[280px] opacity-85 hover:opacity-100'}
              ${isExpanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            style={{
              animation: isExpanding ? 'none' : `slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s both`
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${dest.image})`,
                transform: isActive ? 'scale(1)' : 'scale(1.1)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.9)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-xs uppercase tracking-wider mb-1 opacity-80">{dest.subtitle}</p>
              <h3 className={`font-bold leading-tight transition-all duration-300 ${isActive ? 'text-sm' : 'text-xs'}`}>
                {dest.title}
              </h3>
            </div>

            {isActive && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-in zoom-in duration-500">
                <Icon name="ArrowRight" size={16} className="text-white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
