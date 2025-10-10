import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="YOUR_VIDEO_URL_HERE.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            {/* Left Column - Text Content in Beige */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAEEE1]/20 border border-[#FAEEE1]/30 backdrop-blur-sm">
                <Icon name="Award" className="text-[#FAEEE1]" size={18} />
                <span className="text-sm subheading text-[#FAEEE1]">Когда нельзя ошибиться</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#FAEEE1]">
                Награды
                <span className="block mt-2">для первых лиц</span>
              </h1>

              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-semibold text-[#FAEEE1]">
                  Эксклюзивные решения для государственных церемоний и корпоративных событий
                </p>
                <p className="text-lg text-[#FAEEE1]/80 leading-relaxed">
                  Разрабатываем и производим уникальные награды для высшего руководства, политических деятелей и VIP-персон. Каждое изделие — произведение искусства с безупречным исполнением.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={scrollToCatalog}
                  className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all bg-primary text-background hover:bg-primary/90"
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Посмотреть каталог
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToContact}
                  className="text-lg px-8 py-6 h-auto border-2 border-[#FAEEE1] bg-transparent text-[#FAEEE1] hover:bg-[#FAEEE1] hover:text-[#191919] backdrop-blur-sm"
                >
                  <Icon name="MessageCircle" className="mr-2" size={20} />
                  Получить консультацию
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: 'Trophy', label: 'Индивидуальный дизайн', desc: 'Уникальные концепции' },
                  { icon: 'Gem', label: 'Лучшие материалы', desc: 'Золото, хрусталь, камень' },
                  { icon: 'Clock', label: 'От 7 дней', desc: 'Срочное производство' },
                  { icon: 'Shield', label: '100% гарантия', desc: 'Качество и сроки' },
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" className="text-[#FAEEE1]" size={32} />
        </div>
      </section>

      {/* Why Choose Us Section - Below Video */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Почему выбирают нас</h2>
              <p className="text-xl text-muted-foreground">Доверие ведущих компаний и государственных структур</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: '15+', label: 'лет опыта', icon: 'Calendar' },
                { num: '500+', label: 'проектов реализовано', icon: 'CheckCircle' },
                { num: '98%', label: 'клиентов возвращаются', icon: 'Heart' },
                { num: '24/7', label: 'поддержка проектов', icon: 'Headphones' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={stat.icon as any} className="text-primary" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.num}</div>
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