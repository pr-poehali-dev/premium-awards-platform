import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: 'Кристальная звезда',
    category: 'Награды',
    price: 'от 45 000 ₽',
    image: '🏆',
    description: 'Премиальная награда из оптического хрусталя с гравировкой',
    features: ['Оптический хрусталь', 'Лазерная гравировка', 'Подарочная упаковка'],
  },
  {
    id: 2,
    title: 'Золотая звезда Героя',
    category: 'Государственные',
    price: 'от 120 000 ₽',
    image: '⭐',
    description: 'Эксклюзивная награда из золота 585 пробы с эмалью',
    features: ['Золото 585°', 'Ручная эмаль', 'Сертификат подлинности'],
  },
  {
    id: 3,
    title: 'Премиум набор руководителя',
    category: 'Подарки',
    price: 'от 85 000 ₽',
    image: '💼',
    description: 'Набор из итальянской кожи с персонализацией',
    features: ['Итальянская кожа', 'Швейцарские часы', 'Индивидуальная гравировка'],
  },
  {
    id: 4,
    title: 'Кубок Победителя',
    category: 'Спортивные',
    price: 'от 65 000 ₽',
    image: '🥇',
    description: 'Эксклюзивный кубок с золотым напылением',
    features: ['Золотое напыление', 'Мраморная подставка', '3D гравировка'],
  },
  {
    id: 5,
    title: 'Корпоративный щит',
    category: 'Корпоративные',
    price: 'от 55 000 ₽',
    image: '🛡️',
    description: 'Настенный щит с логотипом компании',
    features: ['Латунь с патиной', 'Объёмный логотип', 'Крепление в комплекте'],
  },
  {
    id: 6,
    title: 'Статуэтка "Лидер"',
    category: 'Награды',
    price: 'от 95 000 ₽',
    image: '🗿',
    description: 'Бронзовая статуэтка работы известного скульптора',
    features: ['Авторская работа', 'Бронза ЛМЦ', 'Нумерованный тираж'],
  },
];

const categories = ['Все', 'Награды', 'Государственные', 'Подарки', 'Спортивные', 'Корпоративные'];

interface CatalogProps {
  onSelectForAI?: (product: Product) => void;
}

export default function Catalog({ onSelectForAI }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProducts = activeCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Icon name="Grid3x3" className="mr-2" size={14} />
            Каталог продукции
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Наши награды и подарки
          </h2>
          <p className="text-xl text-muted-foreground">
            Эксклюзивная коллекция премиальных наград, созданных для особых событий и выдающихся достижений
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center text-8xl relative overflow-hidden">
                <div className={`transition-transform duration-500 ${hoveredId === product.id ? 'scale-110' : 'scale-100'}`}>
                  {product.image}
                </div>
                <div className={`absolute inset-0 bg-primary/10 transition-opacity ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={scrollToContact}
                    className="group/btn"
                  >
                    Заказать
                  </Button>
                  <Button 
                    onClick={() => onSelectForAI?.(product)}
                    className="group/btn"
                  >
                    <Icon name="Sparkles" className="mr-1" size={16} />
                    AI макет
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Не нашли подходящий вариант?
          </p>
          <Button size="lg" variant="outline" onClick={scrollToContact}>
            <Icon name="Lightbulb" className="mr-2" size={20} />
            Создать индивидуальный дизайн
          </Button>
        </div>
      </div>
    </section>
  );
}