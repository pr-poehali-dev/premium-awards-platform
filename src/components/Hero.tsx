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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=1920&q=80" 
          alt="Premium awards" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/90" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Icon name="Award" className="text-primary" size={18} />
                <span className="text-sm font-medium text-primary">Награды премиум-класса</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Премиальные награды
                <span className="block text-primary mt-2">для первых лиц</span>
              </h1>

              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  Эксклюзивные решения для государственных церемоний и корпоративных событий
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Разрабатываем и производим уникальные награды для высшего руководства, политических деятелей и VIP-персон. Каждое изделие — произведение искусства с безупречным исполнением.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={scrollToCatalog}
                  className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Посмотреть каталог
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToContact}
                  className="text-lg px-8 py-6 h-auto border-2 backdrop-blur-sm bg-background/50 hover:bg-background/80"
                >
                  <Icon name="MessageCircle" className="mr-2" size={20} />
                  Получить консультацию
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8">
                {[
                  { icon: 'Trophy', label: 'Индивидуальный дизайн', desc: 'Уникальные концепции' },
                  { icon: 'Gem', label: 'Премиум материалы', desc: 'Золото, хрусталь, камень' },
                  { icon: 'Clock', label: 'От 7 дней', desc: 'Срочное производство' },
                  { icon: 'Shield', label: '100% гарантия', desc: 'Качество и сроки' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{feature.label}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats/USP */}
            <div className="space-y-6 animate-fade-in-delay">
              <div className="bg-background/80 backdrop-blur-md rounded-2xl border border-border/50 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Почему выбирают нас</h3>
                <div className="space-y-6">
                  {[
                    { num: '15+', label: 'лет опыта', icon: 'Calendar' },
                    { num: '500+', label: 'проектов реализовано', icon: 'CheckCircle' },
                    { num: '98%', label: 'клиентов возвращаются', icon: 'Heart' },
                    { num: '24/7', label: 'поддержка проектов', icon: 'Headphones' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon name={stat.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">{stat.num}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" className="text-muted-foreground" size={32} />
      </div>
    </section>
  );
}