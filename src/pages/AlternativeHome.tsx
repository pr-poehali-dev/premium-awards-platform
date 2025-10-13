import { useState, useEffect } from 'react';
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

export default function AlternativeHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardOffset, setCardOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCardOffset(prev => {
      const newOffset = prev + 1;
      if (newOffset > destinations.length - 4) return 0;
      return newOffset;
    });
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
      setIsAnimating(false);
    }, 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCardOffset(prev => {
      const newOffset = prev - 1;
      if (newOffset < 0) return destinations.length - 4;
      return newOffset;
    });
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
      setIsAnimating(false);
    }, 800);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      navigate(destinations[index].link);
    } else {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 800);
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
          className="absolute inset-0 bg-cover bg-center animate-in fade-in zoom-in-95 duration-1000"
          style={{
            backgroundImage: `url(${active.image})`,
            filter: 'brightness(0.6)'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-8 md:px-16 py-20">
              <div className="max-w-xl">
                <div className="overflow-hidden mb-6">
                  <div
                    key={`badge-${activeIndex}`}
                    className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg animate-in slide-in-from-left duration-700"
                  >
                    <Icon name="Sparkles" size={16} className="text-primary" />
                    <span className="text-sm font-semibold text-gray-900">{active.badge}</span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <p
                    key={`subtitle-${activeIndex}`}
                    className="text-[#FAEEE1]/80 text-xs md:text-sm mb-3 uppercase tracking-widest animate-in slide-in-from-left duration-700 delay-100"
                  >
                    {active.subtitle}
                  </p>
                </div>

                <div className="overflow-hidden mb-4">
                  <h1
                    key={`title-${activeIndex}`}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-in slide-in-from-left duration-700 delay-200"
                  >
                    {active.title}
                  </h1>
                </div>

                <div className="overflow-hidden mb-8">
                  <p
                    key={`desc-${activeIndex}`}
                    className="text-white/90 text-sm md:text-base max-w-md animate-in slide-in-from-left duration-700 delay-300"
                  >
                    {active.description}
                  </p>
                </div>

                <div className="overflow-hidden mb-8">
                  <div
                    key={`advantage-${activeIndex}`}
                    className="flex items-start gap-4 bg-white/95 backdrop-blur-md rounded-2xl p-5 max-w-md shadow-lg animate-in slide-in-from-left duration-700 delay-400"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={active.advantage.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-sm mb-1">{active.advantage.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{active.advantage.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 animate-in slide-in-from-left duration-700 delay-500">
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

          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 xl:left-auto xl:translate-x-0 xl:right-32 bottom-28">
            <div className="flex flex-col gap-6">
              <div className="flex gap-5">
                {visibleCards.map((dest, idx) => {
                  const globalIndex = cardOffset + idx;
                  const isActive = globalIndex === activeIndex;

                  return (
                    <div
                      key={`${dest.id}-${cardOffset}`}
                      onClick={() => handleCardClick(globalIndex)}
                      className={`
                        relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out
                        ${isActive ? 'w-64 h-80 shadow-2xl scale-105' : 'w-56 h-72 opacity-80 hover:opacity-100 hover:scale-105'}
                      `}
                      style={{
                        animation: `slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s both`
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

              <div className="flex items-center justify-end gap-4">
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
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === activeIndex ? 'w-10 bg-white' : 'w-6 bg-white/40'
                  }`}
                />
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
        `}</style>
      </div>
    </>
  );
}