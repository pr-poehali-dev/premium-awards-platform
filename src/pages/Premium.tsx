import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Premium() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              Премиум производство наград
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Награды и подарки<br />
              <span className="text-primary">премиум-класса</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эксклюзивное производство корпоративных наград, кубков и подарков с индивидуальным дизайном для вашего бизнеса
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="h-14 px-8 text-lg">
                Заказать консультацию
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                Посмотреть портфолио
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Что входит в премиум-пакет</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "Sparkles",
                title: "Индивидуальный дизайн",
                description: "Разработка уникального дизайна награды под ваш бренд и мероприятие"
              },
              {
                icon: "Crown",
                title: "Премиум материалы",
                description: "Благородные металлы, хрусталь, натуральное дерево и кожа"
              },
              {
                icon: "Palette",
                title: "Эксклюзивная упаковка",
                description: "Подарочная упаковка из дерева или кожи с вашим логотипом"
              },
              {
                icon: "Award",
                title: "Гравировка и логотипы",
                description: "Лазерная гравировка, тиснение, эмалирование любой сложности"
              },
              {
                icon: "Truck",
                title: "Доставка и монтаж",
                description: "Бережная доставка в любую точку мира и установка на месте"
              },
              {
                icon: "Shield",
                title: "Гарантия качества",
                description: "5 лет гарантии на все изделия и бесплатное обслуживание"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Наши категории наград</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Корпоративные кубки",
                  description: "Для спортивных турниров и бизнес-соревнований",
                  image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop"
                },
                {
                  title: "Статуэтки и награды",
                  description: "Эксклюзивные статуэтки для церемоний награждения",
                  image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop"
                },
                {
                  title: "VIP подарки",
                  description: "Премиальные бизнес-подарки для партнёров и клиентов",
                  image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop"
                },
                {
                  title: "Памятные плакетки",
                  description: "Для юбилеев, годовщин и важных событий компании",
                  image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop"
                }
              ].map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { number: "15+", label: "Лет на рынке" },
                { number: "500+", label: "Довольных клиентов" },
                { number: "5000+", label: "Изготовленных наград" }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Как мы работаем</h2>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Консультация и бриф",
                  description: "Обсуждаем ваши задачи, бюджет и сроки. Определяем концепцию и стиль наград"
                },
                {
                  step: "02",
                  title: "Разработка дизайна",
                  description: "Создаём 3D-визуализацию и согласовываем каждую деталь с вами"
                },
                {
                  step: "03",
                  title: "Производство",
                  description: "Изготавливаем награды на собственном производстве с контролем качества"
                },
                {
                  step: "04",
                  title: "Упаковка и доставка",
                  description: "Упаковываем в премиум-боксы и доставляем точно в срок"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Готовы создать идеальную награду?</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 30 минут
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="h-14 px-10 text-lg">
                <Icon name="Phone" className="mr-2" size={20} />
                Заказать звонок
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg">
                <Icon name="Mail" className="mr-2" size={20} />
                Написать нам
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
