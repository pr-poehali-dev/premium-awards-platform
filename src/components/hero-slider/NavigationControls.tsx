import Icon from '@/components/ui/icon';
import { Destination } from './destinations-data';

interface NavigationControlsProps {
  destinations: Destination[];
  activeIndex: number;
  progress: number;
  isAnimating: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export default function NavigationControls({
  destinations,
  activeIndex,
  progress,
  isAnimating,
  onNext,
  onPrev
}: NavigationControlsProps) {
  return (
    <>
      <div className="hidden lg:block absolute right-16 xl:right-32 bottom-28">
        <div className="flex items-center justify-end gap-6">
          <button
            onClick={onPrev}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white/80 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
          >
            <Icon name="ChevronLeft" size={20} className="text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={onNext}
            disabled={isAnimating}
            className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white/80 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
          >
            <Icon name="ChevronRight" size={20} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex gap-2 ml-2">
            {destinations.map((_, index) => (
              <div
                key={index}
                className="relative w-16 h-1 bg-white/20 rounded-full overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-white rounded-full transition-all ease-linear"
                  style={{
                    width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                    transitionDuration: '20ms'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden absolute bottom-20 left-0 right-0 px-8">
        <div className="flex gap-2 justify-center mb-6">
          {destinations.map((_, index) => (
            <div
              key={index}
              className="relative h-1 rounded-full overflow-hidden bg-white/20"
              style={{ width: index === activeIndex ? '40px' : '24px' }}
            >
              <div
                className="absolute inset-0 bg-white rounded-full transition-all ease-linear"
                style={{
                  width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                  transitionDuration: '20ms'
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onPrev}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
          >
            <Icon name="ChevronLeft" size={24} className="text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={onNext}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
          >
            <Icon name="ChevronRight" size={24} className="text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}
