import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const mockGifts: Gift[] = [
  { id: 1, name: 'Беспроводные наушники', price: 3990, image: '🎧', category: 'Электроника', rating: 4.8 },
  { id: 2, name: 'Набор для кофе', price: 2490, image: '☕', category: 'Дом', rating: 4.5 },
  { id: 3, name: 'Смарт-часы', price: 12990, image: '⌚', category: 'Электроника', rating: 4.9 },
  { id: 4, name: 'Косметический набор', price: 4590, image: '💄', category: 'Красота', rating: 4.7 },
  { id: 5, name: 'Книга-бестселлер', price: 890, image: '📚', category: 'Книги', rating: 4.6 },
  { id: 6, name: 'Букет цветов', price: 2990, image: '💐', category: 'Цветы', rating: 4.8 },
];

const categories = ['Все', 'Электроника', 'Дом', 'Красота', 'Книги', 'Цветы'];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredGifts = mockGifts.filter(gift => {
    const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || gift.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">🎁 Подарки</h1>
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск подарков..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredGifts.map((gift) => (
            <a key={gift.id} href={`/product/${gift.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-6xl mb-3 text-center">{gift.image}</div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{gift.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    <span>{gift.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-primary">{gift.price.toLocaleString()} ₽</p>
                  <Button size="sm" className="w-full mt-3">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {filteredGifts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Подарки не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
