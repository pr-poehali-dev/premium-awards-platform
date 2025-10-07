import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from './Catalog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectForAI?: (product: Product) => void;
}

const productDetails: Record<number, {
  description: string;
  gallery: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  advantages: { icon: string; title: string; description: string }[];
}> = {
  1: {
    description: 'Премиальный кубок "Лидерство" — символ высших достижений и признания заслуг. Изготовлен из латуни с покрытием под золото, дополнен основанием из натурального мрамора.',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=800&h=800&fit=crop'
    ],
    features: [
      'Высота 35 см',
      'Латунь с золотым покрытием',
      'Основание из мрамора',
      'Персональная гравировка',
      'Подарочная упаковка'
    ],
    specifications: [
      { label: 'Материал', value: 'Латунь, мрамор' },
      { label: 'Высота', value: '35 см' },
      { label: 'Вес', value: '2.5 кг' },
      { label: 'Покрытие', value: 'Золото 24К' },
      { label: 'Срок изготовления', value: '7-10 дней' }
    ],
    advantages: [
      {
        icon: 'Award',
        title: 'Премиальное качество',
        description: 'Изготовлено вручную мастерами с 15-летним опытом'
      },
      {
        icon: 'Gem',
        title: 'Эксклюзивный дизайн',
        description: 'Уникальная форма, разработанная нашими дизайнерами'
      },
      {
        icon: 'Shield',
        title: 'Долговечность',
        description: 'Покрытие сохраняет вид более 10 лет'
      },
      {
        icon: 'Package',
        title: 'Премиум упаковка',
        description: 'В подарочном деревянном футляре с бархатом'
      }
    ]
  },
  2: {
    description: 'Статуэтка "Признание" — воплощение элегантности и престижа. Создана из эпоксидной смолы с эффектом золотого мрамора, каждая деталь прорисована вручную.',
    gallery: [
      'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&h=800&fit=crop'
    ],
    features: [
      'Высота 28 см',
      'Эпоксидная смола премиум',
      'Ручная роспись',
      'Металлическая табличка',
      'Индивидуальная упаковка'
    ],
    specifications: [
      { label: 'Материал', value: 'Эпоксидная смола' },
      { label: 'Высота', value: '28 см' },
      { label: 'Вес', value: '1.8 кг' },
      { label: 'Цвет', value: 'Золотой мрамор' },
      { label: 'Срок изготовления', value: '10-14 дней' }
    ],
    advantages: [
      {
        icon: 'Palette',
        title: 'Ручная работа',
        description: 'Каждая статуэтка уникальна благодаря ручной технике'
      },
      {
        icon: 'Sparkles',
        title: 'Эффект мрамора',
        description: 'Неповторимый узор в каждом изделии'
      },
      {
        icon: 'Star',
        title: 'Премиум смола',
        description: 'Кристально чистый материал высшего качества'
      },
      {
        icon: 'Gift',
        title: 'VIP упаковка',
        description: 'В эксклюзивной коробке с атласной отделкой'
      }
    ]
  },
  3: {
    description: 'Плакетка с гравировкой — классический выбор для официальных мероприятий. Выполнена из акрила с зеркальной поверхностью и деревянным основанием.',
    gallery: [
      'https://images.unsplash.com/photo-1621274790572-7c32596bc67f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=800&fit=crop'
    ],
    features: [
      'Размер 25x20 см',
      'Акрил 10 мм',
      'Лазерная гравировка',
      'Деревянное основание',
      'УФ-печать логотипа'
    ],
    specifications: [
      { label: 'Материал', value: 'Акрил, дерево' },
      { label: 'Размер', value: '25x20 см' },
      { label: 'Вес', value: '0.8 кг' },
      { label: 'Толщина', value: '10 мм' },
      { label: 'Срок изготовления', value: '5-7 дней' }
    ],
    advantages: [
      {
        icon: 'Zap',
        title: 'Быстрое производство',
        description: 'Изготовление за 5-7 дней без потери качества'
      },
      {
        icon: 'Printer',
        title: 'УФ-печать',
        description: 'Полноцветные логотипы в высоком разрешении'
      },
      {
        icon: 'Edit',
        title: 'Точная гравировка',
        description: 'Лазерная гравировка с точностью до 0.1 мм'
      },
      {
        icon: 'Box',
        title: 'Компактная упаковка',
        description: 'В защитном футляре для удобной транспортировки'
      }
    ]
  },
  4: {
    description: 'Награда "Инновация" — современный дизайн для прогрессивных компаний. Многослойная конструкция из цветного акрила с LED-подсветкой.',
    gallery: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=800&fit=crop'
    ],
    features: [
      'Высота 40 см',
      'LED подсветка',
      'Многослойный акрил',
      '3D гравировка внутри',
      'USB питание'
    ],
    specifications: [
      { label: 'Материал', value: 'Акрил, металл' },
      { label: 'Высота', value: '40 см' },
      { label: 'Вес', value: '3.2 кг' },
      { label: 'Подсветка', value: 'RGB LED' },
      { label: 'Срок изготовления', value: '14-21 день' }
    ],
    advantages: [
      {
        icon: 'Lightbulb',
        title: 'LED подсветка',
        description: 'Многоцветная подсветка с 7 режимами свечения'
      },
      {
        icon: 'Layers',
        title: 'Многослойность',
        description: 'Сложная конструкция из 5 слоев акрила'
      },
      {
        icon: 'Cpu',
        title: '3D гравировка',
        description: 'Объемное изображение внутри материала'
      },
      {
        icon: 'Smartphone',
        title: 'Умное управление',
        description: 'Управление подсветкой через пульт'
      }
    ]
  },
  5: {
    description: 'Подарочный набор VIP — эксклюзивный комплект для особых клиентов. Включает награду, ежедневник в кожаном переплете и премиальную ручку.',
    gallery: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=800&h=800&fit=crop'
    ],
    features: [
      'Награда из бронзы',
      'Кожаный ежедневник',
      'Перьевая ручка Parker',
      'Брендирование набора',
      'Деревянный кейс'
    ],
    specifications: [
      { label: 'Состав набора', value: '3 предмета' },
      { label: 'Материалы', value: 'Бронза, кожа, дерево' },
      { label: 'Вес набора', value: '4.5 кг' },
      { label: 'Упаковка', value: 'Деревянный кейс' },
      { label: 'Срок изготовления', value: '14-18 дней' }
    ],
    advantages: [
      {
        icon: 'Crown',
        title: 'Премиум класс',
        description: 'Только лучшие материалы и бренды'
      },
      {
        icon: 'Users',
        title: 'Полный набор',
        description: 'Все необходимое для делового человека'
      },
      {
        icon: 'Briefcase',
        title: 'Брендирование',
        description: 'Логотип компании на всех элементах набора'
      },
      {
        icon: 'Lock',
        title: 'Защита',
        description: 'Деревянный кейс с замком и ключом'
      }
    ]
  },
  6: {
    description: 'Медаль "Достижение" — для награждения победителей спортивных соревнований. Изготовлена методом литья из латуни с объемным рельефом.',
    gallery: [
      'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565372195868-33102a9555c4?w=800&h=800&fit=crop'
    ],
    features: [
      'Диаметр 7 см',
      'Литье из латуни',
      'Объемный рельеф',
      'Лента в комплекте',
      'Персональная гравировка'
    ],
    specifications: [
      { label: 'Материал', value: 'Латунь' },
      { label: 'Диаметр', value: '7 см' },
      { label: 'Вес', value: '0.15 кг' },
      { label: 'Покрытие', value: 'Золото/Серебро/Бронза' },
      { label: 'Срок изготовления', value: '7-10 дней' }
    ],
    advantages: [
      {
        icon: 'Medal',
        title: 'Спортивный стандарт',
        description: 'Соответствует олимпийским требованиям'
      },
      {
        icon: 'Target',
        title: 'Детальный рельеф',
        description: 'Четкая прорисовка всех элементов дизайна'
      },
      {
        icon: 'Repeat',
        title: 'Серийное производство',
        description: 'Изготовим любой тираж от 10 до 10000 штук'
      },
      {
        icon: 'Clock',
        title: 'Быстро',
        description: 'Готовность за неделю даже для больших тиражей'
      }
    ]
  }
};

export default function ProductDetailModal({ 
  product, 
  open, 
  onOpenChange,
  onSelectForAI 
}: ProductDetailModalProps) {
  if (!product) return null;

  const details = productDetails[product.id] || productDetails[1];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="h-[90vh]">
          <div className="relative">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">{product.occasion}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mt-2">{product.price}</p>
                  </div>
                </div>
              </DialogHeader>
            </div>

            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {details.gallery.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`${idx === 0 ? 'col-span-2' : ''} aspect-square rounded-lg overflow-hidden border`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} - фото ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  Описание
                </h3>
                <p className="text-muted-foreground leading-relaxed">{details.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-primary" />
                  Преимущества
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {details.advantages.map((adv, idx) => (
                    <div key={idx} className="flex gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={adv.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{adv.title}</h4>
                        <p className="text-sm text-muted-foreground">{adv.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  Что входит
                </h3>
                <ul className="space-y-2">
                  {details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-primary" />
                  Характеристики
                </h3>
                <div className="grid gap-2">
                  {details.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between p-3 rounded-lg bg-muted">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 bg-background border-t pt-4 pb-2 -mx-6 px-6">
                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={() => {
                      onSelectForAI?.(product);
                      onOpenChange(false);
                    }}
                  >
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Создать AI макет
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Связаться
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
