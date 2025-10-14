import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AlternativeHeader from '@/components/AlternativeHeader';
import SlideContent from '@/components/hero-slider/SlideContent';
import CardCarousel from '@/components/hero-slider/CardCarousel';
import NavigationControls from '@/components/hero-slider/NavigationControls';
import ExpandingCard from '@/components/hero-slider/ExpandingCard';
import SliderStyles from '@/components/hero-slider/SliderStyles';
import { destinations } from '@/components/hero-slider/destinations-data';

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [cardOffset, setCardOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expandingCardIndex, setExpandingCardIndex] = useState<number | null>(null);
  const expandingCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAnimating) return;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 0.4;
      });
    }, 20);

    return () => clearInterval(progressInterval);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    if (progress >= 100 && !isAnimating) {
      handleNext();
    }
  }, [progress, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextIndex = (activeIndex + 1) % destinations.length;
    setExpandingCardIndex(nextIndex);
    
    setTimeout(() => {
      setIsFadingOut(true);
    }, 50);
    
    setTimeout(() => {
      setCardOffset(prev => {
        const newOffset = prev + 1;
        if (newOffset > destinations.length - 4) return 0;
        return newOffset;
      });
      
      setActiveIndex(nextIndex);
      setProgress(0);
    }, 400);
    
    setTimeout(() => {
      setIsFadingOut(false);
    }, 500);
    
    setTimeout(() => {
      setExpandingCardIndex(null);
      setIsAnimating(false);
    }, 900);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prevIndex = (activeIndex - 1 + destinations.length) % destinations.length;
    setExpandingCardIndex(prevIndex);
    
    setTimeout(() => {
      setIsFadingOut(true);
    }, 50);
    
    setTimeout(() => {
      setCardOffset(prev => {
        const newOffset = prev - 1;
        if (newOffset < 0) return destinations.length - 4;
        return newOffset;
      });
      
      setActiveIndex(prevIndex);
      setProgress(0);
    }, 400);
    
    setTimeout(() => {
      setIsFadingOut(false);
    }, 500);
    
    setTimeout(() => {
      setExpandingCardIndex(null);
      setIsAnimating(false);
    }, 900);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      navigate(destinations[index].link);
    } else {
      if (isAnimating) return;
      setIsAnimating(true);
      setExpandingCardIndex(index);
      
      setTimeout(() => {
        setIsFadingOut(true);
      }, 50);
      
      setTimeout(() => {
        setActiveIndex(index);
        setProgress(0);
      }, 400);
      
      setTimeout(() => {
        setIsFadingOut(false);
      }, 500);
      
      setTimeout(() => {
        setExpandingCardIndex(null);
        setIsAnimating(false);
      }, 900);
    }
  };

  const active = destinations[activeIndex];
  const [visibleCardsCount, setVisibleCardsCount] = useState(4);

  useEffect(() => {
    const updateCardsCount = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setVisibleCardsCount(4);
      } else if (width >= 1280) {
        setVisibleCardsCount(3);
      } else {
        setVisibleCardsCount(2);
      }
    };

    updateCardsCount();
    window.addEventListener('resize', updateCardsCount);
    return () => window.removeEventListener('resize', updateCardsCount);
  }, []);

  const nextCards = [];
  for (let i = 1; i <= visibleCardsCount; i++) {
    nextCards.push(destinations[(activeIndex + i) % destinations.length]);
  }

  return (
    <>
      <AlternativeHeader />
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div
          key={`bg-${activeIndex}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 z-[1] ${
            expandingCardIndex !== null ? 'opacity-0' : (isFadingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100 delay-100')
          }`}
          style={{
            backgroundImage: `url(${active.image})`,
            filter: 'brightness(0.6)'
          }}
        />

        {expandingCardIndex !== null && (
          <ExpandingCard
            expandingCardIndex={expandingCardIndex}
            activeIndex={activeIndex}
            destinations={destinations}
            expandingCardRef={expandingCardRef}
            visibleCardsCount={visibleCardsCount}
          />
        )}

        <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent ${
          expandingCardIndex !== null ? 'z-[10]' : 'z-[3]'
        }`} />

        <div className="relative z-[15] h-full flex flex-col justify-between">
          <SlideContent active={active} isFadingOut={isFadingOut} />

          <div className={`hidden lg:block absolute right-16 xl:right-32 bottom-44 transition-opacity duration-300 ${
            expandingCardIndex !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <CardCarousel
              visibleCards={nextCards}
              cardOffset={0}
              activeIndex={-1}
              expandingCardIndex={expandingCardIndex !== null ? destinations[expandingCardIndex].id : null}
              onCardClick={(idx) => {
                const targetIndex = (activeIndex + idx + 1) % destinations.length;
                handleCardClick(targetIndex);
              }}
            />
          </div>

          <div className="hidden lg:block absolute right-16 xl:right-32 bottom-28">
            <NavigationControls
              destinations={destinations}
              activeIndex={activeIndex}
              progress={progress}
              isAnimating={isAnimating}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>

          <div className="absolute bottom-12 right-8 md:right-16 z-30">
            <div className="text-right">
              <div className="text-7xl md:text-8xl font-bold text-white/15 leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <div className="text-xs text-white/50 mt-1">
                / {String(destinations.length).padStart(2, '0')}
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
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
              >
                <span className="text-white text-2xl">‹</span>
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
              >
                <span className="text-white text-2xl">›</span>
              </button>
            </div>
          </div>
        </div>

        <SliderStyles />
      </div>
    </>
  );
};

export default Index;