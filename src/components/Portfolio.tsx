import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PortfolioItem {
  id: number;
  client: string;
  project: string;
  category: string;
  year: number;
  description: string;
  results: string[];
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    client: 'Администрация Президента РФ',
    project: 'Награды для государственной церемонии',
    category: 'Государственные',
    year: 2024,
    description: 'Разработка и производство эксклюзивных наград для вручения лауреатам государственной премии. Каждая награда выполнена из золота 585 пробы с индивидуальной гравировкой.',
    results: ['150 наград изготовлено', 'Срок выполнения 14 дней', '100% одобрение заказчика'],
    image: '🏛️',
  },
  {
    id: 2,
    client: 'Газпром',
    project: 'Корпоративные награды к юбилею',
    category: 'Корпоративные',
    year: 2024,
    description: 'Создание линейки корпоративных наград к 30-летию компании. Разработали уникальный дизайн с элементами фирменного стиля и логотипом компании.',
    results: ['500+ наград', 'Индивидуальная упаковка', 'Логистика по всей России'],
    image: '💎',
  },
  {
    id: 3,
    client: 'Олимпийский комитет России',
    project: 'Кубки чемпионата',
    category: 'Спортивные',
    year: 2023,
    description: 'Производство кубков и медалей для национального чемпионата. Использовали сочетание хрусталя, серебра и золотого напыления для создания престижного вида.',
    results: ['300 кубков и 1000 медалей', 'Ручная работа мастеров', 'Персональная гравировка'],
    image: '🏅',
  },
  {
    id: 4,
    client: 'Сбербанк',
    project: 'VIP-подарки для топ-менеджмента',
    category: 'Подарки',
    year: 2023,
    description: 'Эксклюзивные подарочные наборы для руководителей высшего звена. Включали аксессуары из кожи, швейцарские часы и персонализированную упаковку.',
    results: ['200 индивидуальных наборов', 'Швейцарские часы', 'Итальянская кожа'],
    image: '🎁',
  },
];

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Icon name="Briefcase" className="mr-2" size={14} />
            Портфолио
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-muted-foreground">
            Работаем с государственными структурами, Fortune 500 и ведущими российскими компаниями
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {portfolioItems.map((item) => (
            <Card 
              key={item.id}
              className={`group overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                selectedItem === item.id ? 'border-primary shadow-2xl scale-[1.02]' : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/5 via-muted/30 to-secondary/5 flex items-center justify-center text-9xl relative overflow-hidden">
                <div className="transition-transform duration-500 group-hover:scale-110">
                  {item.image}
                </div>
                <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-bold">{item.year}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Icon 
                    name={selectedItem === item.id ? "ChevronUp" : "ChevronDown"} 
                    className="text-muted-foreground transition-transform" 
                    size={20} 
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.project}
                </h3>

                <p className="text-muted-foreground mb-4 flex items-center gap-2">
                  <Icon name="Building2" size={16} />
                  {item.client}
                </p>

                <p className="text-foreground/90 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className={`space-y-3 transition-all duration-300 overflow-hidden ${
                  selectedItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Target" className="text-primary" size={18} />
                      Результаты проекта
                    </h4>
                    <div className="space-y-2">
                      {item.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12 text-center border-2 border-primary/20">
          <Icon name="Users" className="mx-auto mb-6 text-primary" size={48} />
          <h3 className="text-3xl font-bold mb-4">
            Станьте частью нашего портфолио
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Мы создаём награды мирового уровня для компаний, которые ценят качество и престиж
          </p>
          <Button size="lg" onClick={scrollToContact}>
            <Icon name="Rocket" className="mr-2" size={20} />
            Обсудить проект
          </Button>
        </div>
      </div>
    </section>
  );
}