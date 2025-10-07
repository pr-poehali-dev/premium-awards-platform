import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Technology {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  applications: string[];
}

const technologies: Technology[] = [
  {
    id: 'engraving',
    name: 'Лазерная гравировка',
    icon: 'Sparkles',
    shortDesc: 'Высокоточная технология нанесения изображений',
    fullDesc: 'Лазерная гравировка — это современная технология, позволяющая наносить текст, логотипы и изображения с микронной точностью на любые материалы. Мы используем профессиональное оборудование мощностью до 100 Вт, что обеспечивает непревзойденное качество.',
    applications: [
      'Гравировка логотипов компаний',
      'Персонализация наград',
      'Нанесение QR-кодов',
      'Художественные композиции',
      'Серийные номера и даты'
    ]
  },
  {
    id: 'casting',
    name: 'Художественное литьё',
    icon: 'Flame',
    shortDesc: 'Создание уникальных форм из бронзы и латуни',
    fullDesc: 'Художественное литьё — древнейшая технология, которую мы довели до совершенства. Используем методы литья по выплавляемым моделям и в песчаные формы. Работаем с бронзой, латунью, алюминиевыми сплавами. Каждое изделие проходит многоэтапную обработку и полировку.',
    applications: [
      'Статуэтки и скульптуры',
      'Барельефы на плакетках',
      'Декоративные элементы кубков',
      'Медали и значки',
      'Эксклюзивные подарки'
    ]
  },
  {
    id: 'crystal',
    name: 'Обработка хрусталя',
    icon: 'Gem',
    shortDesc: 'Работа с премиальным чешским и российским хрусталем',
    fullDesc: 'Мы работаем с хрусталём высшего качества: чешским Bohemia Crystal и российским Гусь-Хрустальным. Используем алмазную резку, пескоструйную обработку, гравировку и полировку. Каждое изделие обрабатывается вручную мастерами с многолетним опытом.',
    applications: [
      'Кубки и награды из хрусталя',
      'Памятные стелы',
      'VIP-подарки с гравировкой',
      'Корпоративные сувениры',
      'Юбилейные награды'
    ]
  },
  {
    id: 'gilding',
    name: 'Золочение и патинирование',
    icon: 'Crown',
    shortDesc: 'Нанесение драгоценных покрытий',
    fullDesc: 'Применяем технологии гальванического золочения (999 проба), серебрения и патинирования. Используем как классические методы, так и современное вакуумное напыление. Толщина покрытия — от 3 до 25 микрон, что гарантирует долговечность и сохранение внешнего вида десятилетиями.',
    applications: [
      'Позолота статуэток',
      'Серебрение кубков',
      'Патина на бронзе',
      'Комбинированные покрытия',
      'Реставрация антикварных наград'
    ]
  },
  {
    id: '3dprinting',
    name: '3D-моделирование и печать',
    icon: 'Box',
    shortDesc: 'Прототипирование сложных форм',
    fullDesc: 'Создаём цифровые 3D-модели в Blender, ZBrush и SolidWorks. Печатаем прототипы на высокоточных принтерах (разрешение до 25 микрон). Используем фотополимерные смолы и металлические порошки для SLM-печати. Это позволяет воплощать самые смелые дизайнерские идеи.',
    applications: [
      'Прототипы наград',
      'Сложные геометрические формы',
      'Мастер-модели для литья',
      'Эксклюзивный дизайн',
      'Серийное производство малых партий'
    ]
  },
  {
    id: 'woodstone',
    name: 'Камень и дерево',
    icon: 'TreePine',
    shortDesc: 'Работа с натуральными материалами',
    fullDesc: 'Используем премиальные породы: мрамор, гранит, оникс, карельскую берёзу, орех, дуб. Применяем ЧПУ-фрезеровку, ручную резьбу, полировку и пропитку маслами. Каждое изделие из натурального материала уникально — природный рисунок никогда не повторяется.',
    applications: [
      'Постаменты для кубков',
      'Деревянные плакетки',
      'Каменные стелы',
      'Наборы с элементами из дерева',
      'Подарочная упаковка премиум-класса'
    ]
  }
];

export default function AboutPage() {
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  const toggleTech = (techId: string) => {
    setExpandedTech(expandedTech === techId ? null : techId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              О компании
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Мы — производственная компания полного цикла, специализирующаяся на создании премиальных наград и корпоративных подарков. Используем передовые технологии и традиционные ремесленные методы.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">лет на рынке</p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Award" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">реализованных проектов</p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">клиентов возвращаются</p>
              </Card>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Наши технологии
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech) => (
                <Card
                  key={tech.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    expandedTech === tech.id ? 'md:col-span-2 lg:col-span-3 bg-primary/5' : ''
                  }`}
                  onClick={() => toggleTech(tech.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={tech.icon as any} className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                          {tech.name}
                          <Icon
                            name={expandedTech === tech.id ? 'ChevronUp' : 'ChevronDown'}
                            size={20}
                            className="text-muted-foreground"
                          />
                        </h3>
                        <p className="text-sm text-muted-foreground">{tech.shortDesc}</p>
                      </div>
                    </div>

                    {expandedTech === tech.id && (
                      <div className="animate-fade-in space-y-4 pt-4 border-t">
                        <p className="text-foreground leading-relaxed">{tech.fullDesc}</p>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Icon name="CheckCircle" size={18} className="text-primary" />
                            Применение:
                          </h4>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {tech.applications.map((app, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <Icon name="Dot" size={20} className="text-primary flex-shrink-0" />
                                <span>{app}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-20 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Готовы обсудить ваш проект?</h3>
              <p className="text-muted-foreground mb-6">
                Наши специалисты помогут подобрать оптимальную технологию для вашей награды
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                <Icon name="Phone" size={20} />
                Связаться с нами
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
