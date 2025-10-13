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
    link: '/catalog'
  },
  {
    id: 2,
    title: 'КОРПОРАТИВНЫЕ ПРЕМИИ',
    subtitle: 'Бизнес награды',
    description: 'Эксклюзивные награды для топ-менеджеров и лидеров бизнеса',
    image: 'https://cdn.poehali.dev/files/bd743598-2856-404c-a117-5b45e4b09746.jpg',
    link: '/catalog'
  },
  {
    id: 3,
    title: 'ХРУСТАЛЬНЫЕ ИЗДЕЛИЯ',
    subtitle: 'Премиум класс',
    description: 'Уникальные хрустальные подарки ручной работы для особых событий',
    image: 'https://cdn.poehali.dev/files/65f8b763-6238-4587-a7ca-a8b5275d2bb3.jpg',
    link: '/catalog'
  },
  {
    id: 4,
    title: 'СПОРТИВНЫЕ КУБКИ',
    subtitle: 'Победителям',
    description: 'Кубки и медали для чемпионов спортивных соревнований',
    image: 'https://cdn.poehali.dev/files/4358e6e7-ebdc-4187-992d-8531db32bad3.jpg',
    link: '/catalog'
  }
];

export default function AlternativeHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
      setIsAnimating(false);
    }, 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
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

  return (
    <>
      <AlternativeHeader />
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${active.image})`,
            filter: 'brightness(0.7)'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex items-start pt-32 pb-20">
            <div className="container mx-auto px-8 md:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="max-w-xl">
                  <div className="overflow-hidden">
                    <p
                      key={`subtitle-${activeIndex}`}
                      className="text-[#FAEEE1]/80 text-sm md:text-base mb-4 uppercase tracking-widest animate-in slide-in-from-left duration-700"
                    >
                      {active.subtitle}
                    </p>
                  </div>

                  <div className="overflow-hidden mb-6">
                    <h1
                      key={`title-${activeIndex}`}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-in slide-in-from-left duration-700 delay-100"
                    >
                      {active.title}
                    </h1>
                  </div>

                  <div className="overflow-hidden">
                    <p
                      key={`desc-${activeIndex}`}
                      className="text-white/90 text-base md:text-lg mb-8 animate-in slide-in-from-left duration-700 delay-200"
                    >
                      {active.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 animate-in slide-in-from-left duration-700 delay-300">
                    <button
                      onClick={() => navigate(active.link)}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 group"
                    >
                      <Icon name="Home" size={20} />
                      СМОТРЕТЬ КАТАЛОГ
                    </button>
                    <button
                      onClick={() => navigate('/constructor')}
                      className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-all"
                    >
                      ЗАКАЗАТЬ
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-end gap-8">
                  <div className="flex gap-4 justify-end">
                    {destinations.map((dest, index) => {
                      const isActive = index === activeIndex;
                      const offset = index - activeIndex;

                      return (
                        <div
                          key={dest.id}
                          onClick={() => handleCardClick(index)}
                          className={`
                            relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out
                            ${isActive ? 'w-56 h-[320px] shadow-2xl' : 'w-44 h-[280px] opacity-70 hover:opacity-90'}
                          `}
                          style={{
                            transform: `translateX(${offset * 15}px) scale(${isActive ? 1 : 0.95})`,
                            zIndex: destinations.length - Math.abs(offset)
                          }}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                            style={{
                              backgroundImage: `url(${dest.image})`,
                              transform: isActive ? 'scale(1)' : 'scale(1.1)'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="text-xs uppercase tracking-wider mb-1 opacity-80">{dest.subtitle}</p>
                            <h3 className="text-sm font-bold leading-tight">{dest.title}</h3>
                          </div>

                          {isActive && (
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Icon name="ArrowRight" size={16} className="text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-4 pr-4">
                    <button
                      onClick={handlePrev}
                      disabled={isAnimating}
                      className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
                    >
                      <Icon name="ChevronLeft" size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={isAnimating}
                      className="w-10 h-10 rounded-full border-2 border-white/40 hover:border-white/80 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 group"
                    >
                      <Icon name="ChevronRight" size={20} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 right-8 md:right-16 z-20">
            <div className="text-right">
              <div className="text-6xl md:text-7xl font-bold text-white/20 leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <div className="text-sm text-white/60 mt-2">
                / {String(destinations.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="lg:hidden absolute bottom-24 left-0 right-0 px-8">
            <div className="flex gap-3 justify-center mb-6">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === activeIndex ? 'w-12 bg-white' : 'w-8 bg-white/40'
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
      </div>
    </>
  );
}
