import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const images = [
  'https://cdn.poehali.dev/files/0927b776-464d-47c8-a300-0a7289fc0f77.jpg',
  'https://cdn.poehali.dev/files/fe732047-cbac-471c-a126-c1e2b67aa34e.jpg',
  'https://cdn.poehali.dev/files/bd743598-2856-404c-a117-5b45e4b09746.jpg',
  'https://cdn.poehali.dev/files/65f8b763-6238-4587-a7ca-a8b5275d2bb3.jpg',
  'https://cdn.poehali.dev/files/4358e6e7-ebdc-4187-992d-8531db32bad3.jpg',
  'https://cdn.poehali.dev/files/d41669eb-dd43-4a06-9c15-ebc49899d5d7.jpg',
  'https://cdn.poehali.dev/files/88196ba4-896e-41de-8aa0-df206f0574b0.jpg',
  'https://cdn.poehali.dev/files/c9621737-8774-46ce-86b1-5b6e4f218017.jpg',
  'https://cdn.poehali.dev/files/260284e9-c71d-4330-a54c-be76fc375800.jpg',
  'https://cdn.poehali.dev/files/584c73e7-cd8b-4179-ab3b-c81d88eaad60.jpg',
  'https://cdn.poehali.dev/files/4622e2e0-4e0e-4484-b429-6c834b219b2e.jpg',
  'https://cdn.poehali.dev/files/170b56f4-a888-4b42-98a8-83ff6879ee68.jpg',
  'https://cdn.poehali.dev/files/8c4a9ba5-2846-402e-9c22-f28614f4973b.jpg',
  'https://cdn.poehali.dev/files/33d23758-2590-423f-9231-0c7c1c74c3f3.jpg',
  'https://cdn.poehali.dev/files/9cb6b7ee-97f0-4831-892f-d04423b67547.jpg',
  'https://cdn.poehali.dev/files/2e9466db-3915-4380-9c08-a6fc08ae0997.jpg',
  'https://cdn.poehali.dev/files/53c6ae72-5bca-4376-9de7-b24c48a42d8e.jpg',
  'https://cdn.poehali.dev/files/460b76a3-ac0b-4921-8db3-1374b476790b.jpg',
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section with Slideshow Background */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <div className="slideshow-container w-full h-full">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-2xl">
            {/* Left Column - Text Content in Beige */}
            <div className="space-y-6 md:space-y-8 animate-fade-in pb-20 md:pb-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAEEE1]/20 border border-[#FAEEE1]/30 backdrop-blur-sm">
                <Icon name="Award" className="text-[#FAEEE1]" size={18} />
                <span className="text-sm subheading text-[#FAEEE1]">МЫ ЗНАЕМ, ЧТО ПОДАРИТЬ</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#FAEEE1]">
                Награды и подарки
                <span className="block mt-2">для первых</span>
              </h1>

              <div className="space-y-3 md:space-y-4">
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[#FAEEE1]">
                  Эксклюзивные решения для государственных церемоний и корпоративных событий
                </p>
                <p className="text-base md:text-lg text-[#FAEEE1]/80 leading-relaxed">
                  Разрабатываем и производим уникальные награды для высшего руководства, политических деятелей и VIP-персон. Каждое изделие — произведение искусства с безупречным исполнением.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button 
                  size="lg" 
                  onClick={scrollToCatalog}
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto shadow-lg hover:shadow-xl transition-all bg-primary text-background hover:bg-primary/90"
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Посмотреть каталог
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToContact}
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto border-2 border-[#FAEEE1] bg-transparent text-[#FAEEE1] hover:bg-[#FAEEE1] hover:text-[#191919] backdrop-blur-sm"
                >
                  <Icon name="MessageCircle" className="mr-2" size={20} />
                  Получить консультацию
                </Button>
              </div>

              <div className="hidden md:grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: 'Trophy', label: 'Индивидуальный дизайн', desc: 'Уникальные концепции' },
                  { icon: 'ShieldCheck', label: 'Безопасность и анонимность', desc: 'Конфиденциальность гарантирована' },
                  { icon: 'Gem', label: 'Ручная работа мастеров', desc: 'Только лимитированные тиражи изделий' },
                  { icon: 'Clock', label: 'От 5 дней', desc: 'Готовые решения под вашу задачу' },
                  { icon: 'Shield', label: 'Полный цикл контроля', desc: 'От заявки до доставки до двери' },
                  { icon: 'Truck', label: 'Доставка по всей России и СНГ', desc: 'Землей, водой и воздухом' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-[#FAEEE1]/10 backdrop-blur-sm border border-[#FAEEE1]/20 hover:border-[#FAEEE1]/40 transition-all">
                    <div className="w-10 h-10 rounded-full bg-[#FAEEE1]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} className="text-[#FAEEE1]" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#FAEEE1]">{feature.label}</p>
                      <p className="text-xs text-[#FAEEE1]/70">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Dots Navigation */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-[#FAEEE1] w-8' 
                  : 'bg-[#FAEEE1]/40 hover:bg-[#FAEEE1]/60'
              }`}
              aria-label={`Перейти к слайду ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" className="text-[#FAEEE1]" size={32} />
        </div>
      </section>

      {/* Gallery Section - Our Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Наши работы</h2>
              <p className="text-xl text-muted-foreground">Эксклюзивные награды для первых лиц государства и бизнеса</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {[
                { emoji: '🏆', title: 'Кубок Президента', category: 'Государственные церемонии' },
                { emoji: '⭐', title: 'Золотая Звезда Героя', category: 'Награды высшего уровня' },
                { emoji: '🎖️', title: 'Орден За Заслуги', category: 'Государственные награды' },
                { emoji: '🥇', title: 'Медаль Победителя', category: 'Спортивные события' },
                { emoji: '💎', title: 'Хрустальная Призма', category: 'Корпоративные награды' },
                { emoji: '🛡️', title: 'Щит Почёта', category: 'Министерства и ведомства' },
                { emoji: '🎭', title: 'Маска Театра', category: 'Культурные мероприятия' },
                { emoji: '📜', title: 'Памятный Диплом', category: 'Юбилейные события' },
                { emoji: '🗿', title: 'Статуэтка Лидера', category: 'Бизнес-премии' },
                { emoji: '🎨', title: 'Арт-объект', category: 'Эксклюзивные решения' },
                { emoji: '⚡', title: 'Кубок Инноваций', category: 'IT и технологии' },
                { emoji: '🌟', title: 'Звезда Года', category: 'Корпоративные премии' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-xl bg-card"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />
                  <div className="w-full h-full flex items-center justify-center text-8xl transform group-hover:scale-110 transition-transform duration-500">
                    {item.emoji}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                    <p className="text-white/70 text-xs">{item.category}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Icon name="Play" className="text-white" size={20} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border">
              {[
                { num: '15+', label: 'лет опыта', icon: 'Calendar' },
                { num: '500+', label: 'реализованных проектов', icon: 'CheckCircle' },
                { num: '98%', label: 'клиентов возвращаются', icon: 'Heart' },
                { num: '24/7', label: 'поддержка VIP-клиентов', icon: 'Headphones' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon name={stat.icon as any} className="text-primary" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.num}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}