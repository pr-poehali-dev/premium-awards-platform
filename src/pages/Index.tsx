import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Portfolio from '@/components/Portfolio';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Каталог', href: '#catalog' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
              <Icon name="Award" size={28} />
              Premium Awards
            </a>

            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="MessageCircle" className="mr-2" size={16} />
                Консультация
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Консультация
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <Hero />
      <Catalog />
      <Portfolio />
      <ContactForm />

      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold tracking-tight text-primary flex items-center gap-2 mb-4">
                <Icon name="Award" size={24} />
                Premium Awards
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Создаём премиальные награды и подарки для первых лиц с 2015 года
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="tel:+74951234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </a>
                <a href="mailto:info@awards-premium.ru" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Icon name="Mail" size={16} />
                  info@awards-premium.ru
                </a>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Москва, Красная площадь, д.1</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Время работы</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Пт: 10:00 - 19:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Сб-Вс: по записи</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Premium Awards. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
