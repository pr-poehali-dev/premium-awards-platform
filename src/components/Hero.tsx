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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(158,135,115,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,65,45,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Icon name="Award" className="text-primary" size={18} />
            <span className="text-sm font-medium text-primary">Награды премиум-класса</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Премиальные награды
            <span className="block text-primary mt-2">для первых лиц</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Создаём эксклюзивные награды и подарки для высшего руководства, государственных деятелей и VIP-клиентов
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={scrollToCatalog}
              className="text-lg px-8 py-6 h-auto"
            >
              <Icon name="Sparkles" className="mr-2" size={20} />
              Посмотреть каталог
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 h-auto border-2"
            >
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Получить консультацию
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { icon: 'Trophy', label: 'Индивидуальный дизайн' },
              { icon: 'Gem', label: 'Премиальные материалы' },
              { icon: 'Clock', label: 'Срочное производство' },
              { icon: 'Shield', label: 'Гарантия качества' },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={feature.icon as any} className="text-primary" size={24} />
                </div>
                <p className="text-sm font-medium text-center">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" className="text-muted-foreground" size={32} />
      </div>
    </section>
  );
}
