import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import AlternativeHeader from '@/components/AlternativeHeader';

const destinations = [
  {
    id: 1,
    title: 'ГОСУДАРСТВЕННЫЕ НАГРАДЫ',
    subtitle: 'Ордена и медали',
    description: 'Высшие награды Российской Федерации для первых лиц государства и героев',
    image: 'https://cdn.poehali.dev/files/fe732047-cbac-471c-a126-c1e2b67aa34e.jpg',
    link: '/catalog',
    badge: 'Мы знаем, чем наградить героев',
    advantage: {
      icon: 'Award',
      title: 'Государственный стандарт',
      description: 'Соответствие ГОСТ и требованиям геральдики РФ'
    }
  },
  {
    id: 2,
    title: 'КОРПОРАТИВНЫЕ ПРЕМИИ',
    subtitle: 'Бизнес награды',
    description: 'Эксклюзивные награды для топ-менеджеров и лидеров бизнеса',
    image: 'https://cdn.poehali.dev/files/bd743598-2856-404c-a117-5b45e4b09746.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что впечатлит партнёров',
    advantage: {
      icon: 'Gem',
      title: 'Эксклюзивный дизайн',
      description: 'Уникальные формы по индивидуальному проекту'
    }
  },
  {
    id: 3,
    title: 'ХРУСТАЛЬНЫЕ ИЗДЕЛИЯ',
    subtitle: 'Премиум класс',
    description: 'Уникальные хрустальные подарки ручной работы для особых событий',
    image: 'https://cdn.poehali.dev/files/65f8b763-6238-4587-a7ca-a8b5275d2bb3.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что подарить VIP-персоне',
    advantage: {
      icon: 'Sparkles',
      title: 'Ручная работа',
      description: 'Каждое изделие создается мастером вручную'
    }
  },
  {
    id: 4,
    title: 'СПОРТИВНЫЕ КУБКИ',
    subtitle: 'Победителям',
    description: 'Кубки и медали для чемпионов спортивных соревнований',
    image: 'https://cdn.poehali.dev/files/4358e6e7-ebdc-4187-992d-8531db32bad3.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что вдохновит победителей',
    advantage: {
      icon: 'Trophy',
      title: 'Спортивная символика',
      description: 'Соответствие стандартам международных федераций'
    }
  },
  {
    id: 5,
    title: 'ПАМЯТНЫЕ ПОДАРКИ',
    subtitle: 'Юбилеи',
    description: 'Эксклюзивные сувениры для памятных дат и юбилеев',
    image: 'https://cdn.poehali.dev/files/d41669eb-dd43-4a06-9c15-ebc49899d5d7.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что запомнится навсегда',
    advantage: {
      icon: 'Calendar',
      title: 'Персонализация',
      description: 'Индивидуальная гравировка дат и имён'
    }
  },
  {
    id: 6,
    title: 'БИЗНЕС СУВЕНИРЫ',
    subtitle: 'Корпоративные',
    description: 'Представительские подарки для партнеров и клиентов',
    image: 'https://cdn.poehali.dev/files/88196ba4-896e-41de-8aa0-df206f0574b0.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что укрепит отношения',
    advantage: {
      icon: 'Briefcase',
      title: 'Корпоративный стиль',
      description: 'Интеграция логотипа и фирменных цветов'
    }
  },
  {
    id: 7,
    title: 'КУЛЬТУРНЫЕ ПРЕМИИ',
    subtitle: 'Искусство',
    description: 'Награды для деятелей культуры и искусства',
    image: 'https://cdn.poehali.dev/files/c9621737-8774-46ce-86b1-5b6e4f218017.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что оценят творцы',
    advantage: {
      icon: 'Palette',
      title: 'Художественная ценность',
      description: 'Каждая награда — произведение искусства'
    }
  },
  {
    id: 8,
    title: 'ВОЕННЫЕ НАГРАДЫ',
    subtitle: 'Геройство',
    description: 'Знаки отличия для военнослужащих и ветеранов',
    image: 'https://cdn.poehali.dev/files/260284e9-c71d-4330-a54c-be76fc375800.jpg',
    link: '/catalog',
    badge: 'Мы знаем, как отметить доблесть',
    advantage: {
      icon: 'Shield',
      title: 'Военный стандарт',
      description: 'Соответствие уставам и традициям ВС РФ'
    }
  }
];

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
  const visibleCards = destinations.slice(cardOffset, cardOffset + 4);

  return (
    <>
      <AlternativeHeader />
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div
          key={`bg-${activeIndex}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
            isFadingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100 delay-200'
          }`}
          style={{
            backgroundImage: `url(${active.image})`,
            filter: 'brightness(0.6)'
          }}
        />

        {expandingCardIndex !== null && (() => {
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
        })()}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-[6]" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-8 md:px-16 py-20">
              <div className={`max-w-xl transition-all duration-500 ${
                isFadingOut ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0 delay-300'
              }`}>
                <div className="overflow-hidden mb-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5">
                    <Icon name="Sparkles" size={16} className="text-white" />
                    <span className="text-sm font-medium text-white">{active.badge}</span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <p className="text-[#FAEEE1]/80 text-xs md:text-sm mb-3 uppercase tracking-widest">
                    {active.subtitle}
                  </p>
                </div>

                <div className="overflow-hidden mb-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    {active.title}
                  </h1>
                </div>

                <div className="overflow-hidden mb-8">
                  <p className="text-white/90 text-sm md:text-base max-w-md">
                    {active.description}
                  </p>
                </div>

                <div className="overflow-hidden mb-8">
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-md">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon name={active.advantage.icon as any} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{active.advantage.title}</h3>
                      <p className="text-white/70 text-xs leading-relaxed">{active.advantage.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate(active.link)}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group"
                  >
                    <Icon name="Home" size={18} />
                    КАТАЛОГ
                  </button>
                  <button
                    onClick={() => navigate('/constructor')}
                    className="border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all"
                  >
                    ЗАКАЗАТЬ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-16 xl:right-32 bottom-28">
            <div className="flex flex-col gap-6">
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
                      onClick={() => handleCardClick(globalIndex)}
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

              <div className="flex items-center justify-end gap-6">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white/80 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
                >
                  <Icon name="ChevronLeft" size={20} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
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
                <Icon name="ChevronLeft" size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
              >
                <Icon name="ChevronRight" size={24} className="text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(80px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes expandCard {
            0% {
              width: var(--initial-width, 192px);
              height: var(--initial-height, 280px);
              bottom: 112px;
              right: var(--initial-right, 300px);
              border-radius: 16px;
            }
            100% {
              width: 100vw;
              height: 100vh;
              bottom: 0;
              right: 0;
              border-radius: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Index;