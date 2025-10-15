import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlternativeHeader from '@/components/AlternativeHeader';
import SlideContent from '@/components/hero-slider/SlideContent';
import CardCarousel from '@/components/hero-slider/CardCarousel';
import NavigationControls from '@/components/hero-slider/NavigationControls';
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Footer from "@/components/Footer";

import SliderStyles from '@/components/hero-slider/SliderStyles';
import { destinations } from '@/components/hero-slider/destinations-data';

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardOffset, setCardOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const [expandingCardIndex, setExpandingCardIndex] = useState<number | null>(null);
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
      setCardOffset(prev => {
        const newOffset = prev + 1;
        if (newOffset > destinations.length - 4) return 0;
        return newOffset;
      });
      
      setActiveIndex(nextIndex);
      setProgress(0);
    }, 1600);
    
    setTimeout(() => {
      setExpandingCardIndex(null);
      setIsAnimating(false);
    }, 1800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prevIndex = (activeIndex - 1 + destinations.length) % destinations.length;
    setExpandingCardIndex(prevIndex);
    
    setTimeout(() => {
      setCardOffset(prev => {
        const newOffset = prev - 1;
        if (newOffset < 0) return destinations.length - 4;
        return newOffset;
      });
      
      setActiveIndex(prevIndex);
      setProgress(0);
    }, 1600);
    
    setTimeout(() => {
      setExpandingCardIndex(null);
      setIsAnimating(false);
    }, 1800);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      navigate(destinations[index].link);
    } else {
      if (isAnimating) return;
      setIsAnimating(true);
      setExpandingCardIndex(index);
      
      setTimeout(() => {
        setActiveIndex(index);
        setProgress(0);
      }, 1600);
      
      setTimeout(() => {
        setExpandingCardIndex(null);
        setIsAnimating(false);
      }, 1200);
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
      <div className="hero-slider-container relative w-full h-screen overflow-hidden bg-black isolate">
        <div
          key={`bg-${activeIndex}`}
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{
            backgroundImage: `url(${active.image})`,
            filter: 'brightness(0.6)'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-[6]" />

        <div className="relative z-[15] h-full flex flex-col">
          <SlideContent active={active} />
        </div>

        <div className="hidden lg:block absolute right-16 xl:right-32 bottom-64 z-[3]">
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

        <div className="hidden lg:block absolute right-16 xl:right-32 bottom-20 z-[3]">
          <NavigationControls
            destinations={destinations}
            activeIndex={activeIndex}
            progress={progress}
            isAnimating={isAnimating}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>

        <div className="relative z-[15]">

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

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Что входит в премиум-пакет</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "Sparkles",
                title: "Индивидуальный дизайн",
                description: "Разработка уникального дизайна награды под ваш бренд и мероприятие"
              },
              {
                icon: "Crown",
                title: "Премиум материалы",
                description: "Благородные металлы, хрусталь, натуральное дерево и кожа"
              },
              {
                icon: "Palette",
                title: "Эксклюзивная упаковка",
                description: "Подарочная упаковка из дерева или кожи с вашим логотипом"
              },
              {
                icon: "Award",
                title: "Гравировка и логотипы",
                description: "Лазерная гравировка, тиснение, эмалирование любой сложности"
              },
              {
                icon: "Truck",
                title: "Доставка и монтаж",
                description: "Бережная доставка в любую точку мира и установка на месте"
              },
              {
                icon: "Shield",
                title: "Гарантия качества",
                description: "5 лет гарантии на все изделия и бесплатное обслуживание"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { number: "15+", label: "Лет на рынке" },
                { number: "500+", label: "Довольных клиентов" },
                { number: "5000+", label: "Изготовленных наград" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Как мы работаем</h2>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Консультация и бриф",
                  description: "Обсуждаем ваши задачи, бюджет и сроки. Определяем концепцию и стиль наград"
                },
                {
                  step: "02",
                  title: "Разработка дизайна",
                  description: "Создаём 3D-визуализацию и согласовываем каждую деталь с вами"
                },
                {
                  step: "03",
                  title: "Производство",
                  description: "Изготавливаем награды на собственном производстве с контролем качества"
                },
                {
                  step: "04",
                  title: "Упаковка и доставка",
                  description: "Упаковываем в премиум-боксы и доставляем точно в срок"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Готовы создать идеальную награду?</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 30 минут
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="h-14 px-10 text-lg">
                <Icon name="Phone" className="mr-2" size={20} />
                Заказать звонок
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg">
                <Icon name="Mail" className="mr-2" size={20} />
                Написать нам
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;