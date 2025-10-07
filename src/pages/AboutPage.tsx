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
  gallery?: string[];
}

const technologies: Technology[] = [
  {
    id: 'polymer-casting',
    name: 'Литье полимерных смол и пластиков',
    icon: 'Droplet',
    shortDesc: 'Производство изделий из полимерных материалов',
    fullDesc: 'Работаем с эпоксидными и полиэфирными смолами, полиуретаном и другими полимерами. Создаём изделия любой сложности методом заливки в формы. Возможность добавления пигментов, глиттера, люминофоров для уникального эффекта.',
    applications: [
      'Прозрачные награды с 3D-эффектом',
      'Декоративные элементы',
      'Инкапсуляция объектов',
      'Имитация янтаря и камня',
      'Цветные композиции'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&h=400&fit=crop'
    ]
  },
  {
    id: 'silicone-molds',
    name: 'Создание силиконовых форм',
    icon: 'Layers',
    shortDesc: 'Изготовление высокоточных силиконовых форм',
    fullDesc: 'Производим профессиональные силиконовые формы для тиражирования изделий. Используем двухкомпонентный силикон высокой прочности. Формы выдерживают сотни циклов отливки с сохранением мельчайших деталей оригинала.',
    applications: [
      'Формы для литья смол',
      'Тиражирование скульптур',
      'Создание серийных наград',
      'Копирование сложных рельефов',
      'Формы для шоколада и мыла'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '3d-printing',
    name: '3D-печать смолами',
    icon: 'Box',
    shortDesc: 'Высокоточная фотополимерная печать',
    fullDesc: 'Печатаем на SLA/DLP принтерах с разрешением до 25 микрон. Используем профессиональные фотополимерные смолы различной жёсткости и цвета. Технология позволяет создавать изделия со сложной геометрией и тончайшими деталями.',
    applications: [
      'Прототипы наград',
      'Мастер-модели для литья',
      'Сложные декоративные элементы',
      'Индивидуальный дизайн',
      'Быстрое производство малых серий'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&h=400&fit=crop'
    ]
  },
  {
    id: 'paint-shop',
    name: 'Лакокрасочный цех',
    icon: 'Paintbrush',
    shortDesc: 'Профессиональная окраска и финишная отделка',
    fullDesc: 'Покрасочный участок с системой вентиляции и сушки. Используем автомобильные краски, порошковое напыление, аэрографию. Возможность создания металликов, перламутров, текстурных покрытий. Финишное покрытие лаками 2К для долговечности.',
    applications: [
      'Окраска под золото/серебро',
      'Многоцветные покрытия',
      'Патинирование и эффект старения',
      'Металлизированные финиши',
      'Матовые и глянцевые покрытия'
    ]
  },
  {
    id: 'polishing',
    name: 'Шлифовка и полировка в идеальное зеркало',
    icon: 'Sparkles',
    shortDesc: 'Доведение поверхности до зеркального блеска',
    fullDesc: 'Многоэтапная обработка от грубой шлифовки до финишной полировки. Используем абразивы от P80 до P3000, полировальные пасты и войлочные круги. Достигаем идеально гладкой зеркальной поверхности на металле, акриле, смолах.',
    applications: [
      'Зеркальная полировка металлов',
      'Полировка акрилового стекла',
      'Доводка отливок',
      'Удаление дефектов',
      'Финишная обработка наград'
    ]
  },
  {
    id: 'acrylic',
    name: 'Работа с листовым акриловым стеклом до 80мм толщиной',
    icon: 'Square',
    shortDesc: 'Обработка толстого акрила премиум-качества',
    fullDesc: 'Режем, фрезеруем и полируем акриловое стекло толщиной до 80 мм на ЧПУ-станках. Используем литой акрил высшего качества. Возможность создания многослойных композиций, склейки, гравировки внутри материала.',
    applications: [
      'Массивные награды из акрила',
      'Прозрачные стелы',
      'Многослойные композиции',
      'Гравировка внутри блока',
      'Комбинированные конструкции'
    ]
  },
  {
    id: 'metal-casting',
    name: 'Литье металлов: латунь, бронза',
    icon: 'Flame',
    shortDesc: 'Художественное литьё цветных металлов',
    fullDesc: 'Литьё латуни и бронзы методом выплавляемых моделей и в песчаные формы. Собственная плавильная печь. Работаем с различными сплавами для достижения нужных свойств. Возможность литья изделий весом до 15 кг.',
    applications: [
      'Бронзовые статуэтки',
      'Латунные плакетки',
      'Барельефы',
      'Декоративная фурнитура',
      'Медали и значки'
    ]
  },
  {
    id: 'metal-processing',
    name: 'Обработка металлов',
    icon: 'Settings',
    shortDesc: 'Механическая обработка металлических изделий',
    fullDesc: 'Токарная и фрезерная обработка на станках с ЧПУ. Гибка, резка, сварка металлов. Нарезка резьб, сверление, зенкование. Работаем со сталью, алюминием, латунью, бронзой, нержавейкой.',
    applications: [
      'Изготовление постаментов',
      'Крепёжные элементы',
      'Металлические корпуса наград',
      'Комбинированные конструкции',
      'Фурнитура и механизмы'
    ]
  },
  {
    id: 'uv-printing',
    name: 'УФ-печать',
    icon: 'Image',
    shortDesc: 'Прямая печать на любых материалах',
    fullDesc: 'УФ-принтер для прямой печати на плоских и цилиндрических поверхностях. Печатаем на металле, пластике, стекле, дереве, коже. Разрешение до 1440 dpi. Краски мгновенно закрепляются УФ-лампой, изображение не стирается.',
    applications: [
      'Печать логотипов на наградах',
      'Полноцветные изображения на металле',
      'Фотопечать на акриле',
      'Брендирование подарков',
      'Персонализация изделий'
    ]
  },
  {
    id: 'laser-engraving',
    name: 'Лазерная гравировка',
    icon: 'Zap',
    shortDesc: 'Высокоточная гравировка на любых материалах',
    fullDesc: 'Лазерные станки мощностью 60-100 Вт для гравировки и резки. Работаем с металлом, пластиком, деревом, кожей, стеклом. Гравируем текст, логотипы, QR-коды, фотографии с высочайшей детализацией. Возможность глубокой гравировки до 3 мм.',
    applications: [
      'Персонализация наград',
      'Гравировка логотипов',
      'Фотогравировка',
      'Серийные номера',
      'Резка сложных контуров'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565372195868-33102a9555c4?w=400&h=400&fit=crop'
    ]
  },
  {
    id: 'woodworking',
    name: 'Деревообработка',
    icon: 'TreePine',
    shortDesc: 'Работа с ценными породами дерева',
    fullDesc: 'Используем массив дуба, ореха, ясеня, карельской берёзы. Выполняем распиловку, фрезеровку, токарную обработку, резьбу. Финишная отделка маслами, лаками, морилками. Создаём деревянные элементы для наград, подарочные боксы, плакетки.',
    applications: [
      'Деревянные постаменты',
      'Плакетки из массива',
      'Подарочная упаковка',
      'Футляры для наград',
      'Резные декоративные элементы'
    ]
  },
  {
    id: 'acrylic-bending',
    name: 'Гибка акрила',
    icon: 'Waves',
    shortDesc: 'Термоформовка акрилового стекла',
    fullDesc: 'Гибка акрила с помощью нагревательных элементов и формовочных столов. Создаём объёмные конструкции, изогнутые формы, угловые соединения под любым градусом. Работаем с акрилом толщиной от 2 до 30 мм. Сохраняем прозрачность материала после гибки.',
    applications: [
      'Изогнутые витрины для наград',
      'Объёмные буквы',
      'Дизайнерские конструкции',
      'Защитные колпаки',
      'Креативные формы наград'
    ]
  },
  {
    id: 'sawing',
    name: 'Распиловка',
    icon: 'Split',
    shortDesc: 'Точная резка различных материалов',
    fullDesc: 'Распиловочное оборудование для резки металла, дерева, пластика, акрила. Ленточные, дисковые, торцовочные пилы. Возможность резки под углом, создания фасок. Высокая точность и чистота реза для минимальной последующей обработки.',
    applications: [
      'Заготовка материалов',
      'Резка металлопроката',
      'Распиловка древесины',
      'Раскрой листовых материалов',
      'Подготовка к финишной обработке'
    ]
  },
  {
    id: 'cnc-milling',
    name: 'ЧПУ-фрезеровка',
    icon: 'Cpu',
    shortDesc: 'Высокоточная обработка на станках с ЧПУ',
    fullDesc: 'Фрезерные станки с ЧПУ для обработки дерева, пластика, алюминия, латуни. Рабочее поле до 2000×3000 мм. 3-осевая и 4-осевая обработка. Создаём сложные 3D-рельефы, вырезаем контуры, фрезеруем карманы. Точность позиционирования до 0.05 мм.',
    applications: [
      'Фрезеровка 3D-рельефов',
      'Вырезка сложных форм',
      'Создание мастер-моделей',
      'Обработка больших заготовок',
      'Серийное производство деталей'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=400&h=400&fit=crop'
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
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-muted-foreground">лет на рынке</p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Award" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">450+</div>
                <p className="text-muted-foreground">проектов ежегодно</p>
              </Card>

              <Card className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
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
                      <div className="animate-fade-in space-y-6 pt-4 border-t">
                        <p className="text-foreground leading-relaxed">{tech.fullDesc}</p>
                        
                        {tech.gallery && (
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Icon name="Image" size={18} className="text-primary" />
                              Примеры работ:
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {tech.gallery.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                                  <img
                                    src={img}
                                    alt={`${tech.name} - пример ${idx + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
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