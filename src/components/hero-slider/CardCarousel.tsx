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
  onCardClick
}: CardCarouselProps) {
  return (
    <div className="flex gap-6">
      {visibleCards.map((dest, idx) => {
        return (
          <div
            key={`${dest.id}-${idx}`}
            onClick={() => onCardClick(idx)}
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out w-48 h-[280px] opacity-90 hover:opacity-100 hover:scale-105"
            style={{
              animation: `slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s both`
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${dest.image})`,
                transform: 'scale(1.1)',
                filter: 'brightness(0.9)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

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
