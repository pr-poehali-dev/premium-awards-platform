import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Award {
  id: number;
  title: string;
  category: string;
  occasion: string;
  recipient: string;
  price: string;
  image: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const awards: Award[] = [
    {
      id: 1,
      title: 'Кубок "Лидерство"',
      category: 'Кубки',
      occasion: 'Корпоративное мероприятие',
      recipient: 'Руководителю',
      price: 'от 45 000 ₽',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Статуэтка "Признание"',
      category: 'Статуэтки',
      occasion: 'Юбилей',
      recipient: 'Партнеру',
      price: 'от 65 000 ₽',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Плакетка с гравировкой',
      category: 'Плакетки',
      occasion: 'Конференция',
      recipient: 'Спикеру',
      price: 'от 25 000 ₽',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Награда "Инновация"',
      category: 'Кубки',
      occasion: 'Конкурс',
      recipient: 'Команде',
      price: 'от 80 000 ₽',
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Подарочный набор VIP',
      category: 'Наборы',
      occasion: 'Деловая встреча',
      recipient: 'Клиенту',
      price: 'от 120 000 ₽',
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Медаль "Достижение"',
      category: 'Медали',
      occasion: 'Спортивное событие',
      recipient: 'Спортсмену',
      price: 'от 18 000 ₽',
      image: '/placeholder.svg'
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Награждение Forbes',
      description: 'Премиальные кубки для церемонии награждения',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Корпоративный юбилей',
      description: 'Индивидуальные статуэтки с гравировкой',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Международный саммит',
      description: 'Наборы премиальных подарков для спикеров',
      image: '/placeholder.svg'
    }
  ];

  const filteredAwards = awards.filter(award => {
    const categoryMatch = selectedCategory === 'all' || award.category === selectedCategory;
    const occasionMatch = selectedOccasion === 'all' || award.occasion === selectedOccasion;
    const recipientMatch = selectedRecipient === 'all' || award.recipient === selectedRecipient;
    return categoryMatch && occasionMatch && recipientMatch;
  });

  const categories = ['all', 'Кубки', 'Статуэтки', 'Плакетки', 'Медали', 'Наборы'];
  const occasions = ['all', 'Корпоративное мероприятие', 'Юбилей', 'Конференция', 'Конкурс', 'Деловая встреча', 'Спортивое событие'];
  const recipients = ['all', 'Руководителю', 'Партнеру', 'Спикеру', 'Команде', 'Клиенту', 'Спортсмену'];

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
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                О компании
              </a>
              <a href="#production" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Производство
              </a>
              <a href="#order" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Индивидуальный заказ
              </a>
              <a href="#contacts" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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
                    href="#about"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    О компании
                  </a>
                  <a
                    href="#production"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Производство
                  </a>
                  <a
                    href="#order"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Индивидуальный заказ
                  </a>
                  <a
                    href="#contacts"
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

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
              Премиальные награды
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Эксклюзивные награды и подарки для первых лиц с возможностью персонализации
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              <a href="#catalog">Посмотреть каталог</a>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-background"></div>
      </section>

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
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full"
                  >
                    {cat === 'all' ? 'Все' : cat}
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
                    variant={selectedOccasion === occ ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedOccasion(occ)}
                    className="rounded-full"
                  >
                    {occ === 'all' ? 'Все' : occ}
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
                    variant={selectedRecipient === rec ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRecipient(rec)}
                    className="rounded-full"
                  >
                    {rec === 'all' ? 'Все' : rec}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAwards.map((award, index) => (
              <Card
                key={award.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-secondary">
                    {award.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="Calendar" size={16} />
                    <span>{award.occasion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="User" size={16} />
                    <span>{award.recipient}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-primary">{award.price}</p>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Портфолио
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выполненные проекты для ведущих компаний
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              О компании
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Premium Awards специализируется на создании эксклюзивных наград и подарков для первых лиц компаний. 
              Мы работаем с премиальными материалами и предлагаем полную персонализацию каждого изделия.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Наша команда дизайнеров и мастеров создает уникальные награды, 
              которые подчеркивают статус получателя и значимость момента.
            </p>
          </div>
        </div>
      </section>

      <section id="production" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Производство
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
            Каждая награда проходит путь от идеи до готового изделия через несколько этапов
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              <Card className="text-center p-6 hover:shadow-xl transition-shadow animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Lightbulb" size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">01</div>
                <h3 className="text-xl font-semibold mb-3">Концепция</h3>
                <p className="text-muted-foreground">
                  Обсуждение идеи, подбор материалов и создание эскизов
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Palette" size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">02</div>
                <h3 className="text-xl font-semibold mb-3">Дизайн</h3>
                <p className="text-muted-foreground">
                  3D-визуализация и согласование финального варианта
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Hammer" size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">03</div>
                <h3 className="text-xl font-semibold mb-3">Изготовление</h3>
                <p className="text-muted-foreground">
                  Создание награды из премиальных материалов мастерами
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Sparkles" size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">04</div>
                <h3 className="text-xl font-semibold mb-3">Финализация</h3>
                <p className="text-muted-foreground">
                  Гравировка, упаковка и доставка готовой награды
                </p>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-lg p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center text-primary">Персонализация</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4 animate-fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Icon name="Type" size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Гравировка</h4>
                    <p className="text-muted-foreground">
                      Лазерная или ручная гравировка любого текста, логотипов и изображений
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Icon name="Gem" size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Материалы</h4>
                    <p className="text-muted-foreground">
                      Выбор из благородных металлов, хрусталя, дерева премиум-пород
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Упаковка</h4>
                    <p className="text-muted-foreground">
                      Индивидуальная упаковка с брендированием под ваш корпоративный стиль
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Icon name="Award" size={24} className="text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Уникальный дизайн</h4>
                    <p className="text-muted-foreground">
                      Разработка эксклюзивной формы и дизайна специально для вас
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              Индивидуальный заказ
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Создайте уникальную награду с персональной гравировкой и дизайном
            </p>

            <Card className="p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание проекта</label>
                  <Textarea
                    placeholder="Расскажите о вашем мероприятии и пожеланиях к награде"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Персонализация
                  </label>
                  <Textarea
                    placeholder="Текст для гравировки, логотип компании, особые пожелания"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Отправить заявку
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Контакты</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <Icon name="Phone" size={32} className="mb-4" />
                <p className="text-lg">+7 (495) 123-45-67</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Mail" size={32} className="mb-4" />
                <p className="text-lg">info@premiumawards.ru</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="MapPin" size={32} className="mb-4" />
                <p className="text-lg">Москва, ул. Примерная, 123</p>
              </div>
            </div>

            <p className="text-lg opacity-90">
              Работаем по будням с 10:00 до 19:00
            </p>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Premium Awards. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;