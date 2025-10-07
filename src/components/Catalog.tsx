import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  title: string;
  category: string;
  occasion: string;
  recipient: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Кубок "Лидерство"',
    category: 'Кубки',
    occasion: 'Корпоративное мероприятие',
    recipient: 'Руководителю',
    price: 'от 45 000 ₽',
    image: '🏆'
  },
  {
    id: 2,
    title: 'Статуэтка "Признание"',
    category: 'Статуэтки',
    occasion: 'Юбилей',
    recipient: 'Партнеру',
    price: 'от 65 000 ₽',
    image: '⭐'
  },
  {
    id: 3,
    title: 'Плакетка с гравировкой',
    category: 'Плакетки',
    occasion: 'Конференция',
    recipient: 'Спикеру',
    price: 'от 25 000 ₽',
    image: '🎯'
  },
  {
    id: 4,
    title: 'Награда "Инновация"',
    category: 'Кубки',
    occasion: 'Конкурс',
    recipient: 'Команде',
    price: 'от 80 000 ₽',
    image: '🥇'
  },
  {
    id: 5,
    title: 'Подарочный набор VIP',
    category: 'Наборы',
    occasion: 'Деловая встреча',
    recipient: 'Клиенту',
    price: 'от 120 000 ₽',
    image: '💼'
  },
  {
    id: 6,
    title: 'Медаль "Достижение"',
    category: 'Медали',
    occasion: 'Спортивное событие',
    recipient: 'Спортсмену',
    price: 'от 18 000 ₽',
    image: '🥉'
  }
];

const categories = ['Все', 'Кубки', 'Статуэтки', 'Плакетки', 'Медали', 'Наборы'];
const occasions = ['Все', 'Корпоративное мероприятие', 'Юбилей', 'Конференция', 'Конкурс', 'Деловая встреча', 'Спортивное событие'];
const recipients = ['Все', 'Руководителю', 'Партнеру', 'Спикеру', 'Команде', 'Клиенту', 'Спортсмену'];

interface CatalogProps {
  onSelectForAI?: (product: Product) => void;
}

export default function Catalog({ onSelectForAI }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [activeOccasion, setActiveOccasion] = useState('Все');
  const [activeRecipient, setActiveRecipient] = useState('Все');

  const filteredProducts = products.filter(p => {
    const categoryMatch = activeCategory === 'Все' || p.category === activeCategory;
    const occasionMatch = activeOccasion === 'Все' || p.occasion === activeOccasion;
    const recipientMatch = activeRecipient === 'Все' || p.recipient === activeRecipient;
    return categoryMatch && occasionMatch && recipientMatch;
  });

  return (
    <section id="catalog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          Каталог наград и подарков
        </h2>

        <div className="mb-12 space-y-6">
          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Тип награды</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Тип мероприятия</p>
            <div className="flex flex-wrap gap-2">
              {occasions.map(occ => (
                <Button
                  key={occ}
                  variant={activeOccasion === occ ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveOccasion(occ)}
                  className="rounded-full"
                >
                  {occ}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Кому дарят</p>
            <div className="flex flex-wrap gap-2">
              {recipients.map(rec => (
                <Button
                  key={rec}
                  variant={activeRecipient === rec ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveRecipient(rec)}
                  className="rounded-full"
                >
                  {rec}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center text-8xl">
                {product.image}
                <Badge className="absolute top-4 right-4 bg-secondary">
                  {product.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Icon name="Calendar" size={16} />
                  <span>{product.occasion}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Icon name="User" size={16} />
                  <span>{product.recipient}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-semibold text-primary">{product.price}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Подробнее
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onSelectForAI?.(product)}
                  >
                    <Icon name="Sparkles" className="mr-1" size={14} />
                    AI макет
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}