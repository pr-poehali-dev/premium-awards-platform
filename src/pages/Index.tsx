import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Portfolio from '@/components/Portfolio';
import AwardVisualizer from '@/components/AwardVisualizer';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight text-primary">
              Premium Awards
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Портфолио
              </a>
              <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Контакты
              </a>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-8">
                  <a
                    href="#catalog"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Каталог
                  </a>
                  <a
                    href="#portfolio"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Портфолио
                  </a>
                  <a
                    href="#contact"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Контакты
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <Hero />
      <Catalog />
      <Portfolio />
      <AwardVisualizer />
      <ContactForm />

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Premium Awards. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
