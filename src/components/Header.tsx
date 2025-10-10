import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img 
              src="https://cdn.poehali.dev/files/22ce25dc-a953-4ec4-bfe3-9b8eaa50205b.png" 
              alt="ART STEKLOV" 
              className="h-10 md:h-12 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a 
              href="/catalog" 
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Каталог
            </a>
            <a 
              href="/portfolio" 
              className={`text-sm font-medium transition-colors ${
                isActive('/portfolio') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Портфолио
            </a>
            <a 
              href="/constructor" 
              className={`text-sm font-medium transition-colors ${
                isActive('/constructor') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Конструктор
            </a>
            <a 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              О компании
            </a>
            <a 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
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
                  href="/catalog"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Каталог
                </a>
                <a
                  href="/portfolio"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Портфолио
                </a>
                <a
                  href="/constructor"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Конструктор
                </a>
                <a
                  href="/about"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  О компании
                </a>
                <a
                  href="/contact"
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
  );
}
