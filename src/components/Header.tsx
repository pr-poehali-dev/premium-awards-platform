import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-primary">
            Premium Awards
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/catalog" 
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Каталог
            </Link>
            <Link 
              to="/portfolio" 
              className={`text-sm font-medium transition-colors ${
                isActive('/portfolio') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Портфолио
            </Link>
            <Link 
              to="/constructor" 
              className={`text-sm font-medium transition-colors ${
                isActive('/constructor') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Конструктор
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              О компании
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Контакты
            </Link>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  to="/catalog"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Каталог
                </Link>
                <Link
                  to="/portfolio"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Портфолио
                </Link>
                <Link
                  to="/constructor"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Конструктор
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  О компании
                </Link>
                <Link
                  to="/contact"
                  className="text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Контакты
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}