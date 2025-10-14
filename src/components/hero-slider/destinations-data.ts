export interface Destination {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  badge: string;
  advantage: {
    icon: string;
    title: string;
    description: string;
  };
}

export const destinations: Destination[] = [
  {
    id: 1,
    title: 'ГОСУДАРСТВЕННЫЕ НАГРАДЫ',
    subtitle: 'Ордена и медали',
    description: 'Высшие награды Российской Федерации для первых лиц государства и героев',
    image: 'https://cdn.poehali.dev/files/fe732047-cbac-471c-a126-c1e2b67aa34e.jpg',
    link: '/catalog',
    badge: 'Мы знаем, чем наградить героев',
    advantage: {
      icon: 'Award',
      title: 'Государственный стандарт',
      description: 'Соответствие ГОСТ и требованиям геральдики РФ'
    }
  },
  {
    id: 2,
    title: 'КОРПОРАТИВНЫЕ ПРЕМИИ',
    subtitle: 'Бизнес награды',
    description: 'Эксклюзивные награды для топ-менеджеров и лидеров бизнеса',
    image: 'https://cdn.poehali.dev/files/bd743598-2856-404c-a117-5b45e4b09746.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что впечатлит партнёров',
    advantage: {
      icon: 'Gem',
      title: 'Эксклюзивный дизайн',
      description: 'Уникальные формы по индивидуальному проекту'
    }
  },
  {
    id: 3,
    title: 'ХРУСТАЛЬНЫЕ ИЗДЕЛИЯ',
    subtitle: 'Премиум класс',
    description: 'Уникальные хрустальные подарки ручной работы для особых событий',
    image: 'https://cdn.poehali.dev/files/65f8b763-6238-4587-a7ca-a8b5275d2bb3.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что подарить VIP-персоне',
    advantage: {
      icon: 'Sparkles',
      title: 'Ручная работа',
      description: 'Каждое изделие создается мастером вручную'
    }
  },
  {
    id: 4,
    title: 'СПОРТИВНЫЕ КУБКИ',
    subtitle: 'Победителям',
    description: 'Кубки и медали для чемпионов спортивных соревнований',
    image: 'https://cdn.poehali.dev/files/4358e6e7-ebdc-4187-992d-8531db32bad3.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что вдохновит победителей',
    advantage: {
      icon: 'Trophy',
      title: 'Спортивная символика',
      description: 'Соответствие стандартам международных федераций'
    }
  },
  {
    id: 5,
    title: 'ПАМЯТНЫЕ ПОДАРКИ',
    subtitle: 'Юбилеи',
    description: 'Эксклюзивные сувениры для памятных дат и юбилеев',
    image: 'https://cdn.poehali.dev/files/d41669eb-dd43-4a06-9c15-ebc49899d5d7.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что запомнится навсегда',
    advantage: {
      icon: 'Calendar',
      title: 'Персонализация',
      description: 'Индивидуальная гравировка дат и имён'
    }
  },
  {
    id: 6,
    title: 'БИЗНЕС СУВЕНИРЫ',
    subtitle: 'Корпоративные',
    description: 'Представительские подарки для партнеров и клиентов',
    image: 'https://cdn.poehali.dev/files/88196ba4-896e-41de-8aa0-df206f0574b0.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что укрепит отношения',
    advantage: {
      icon: 'Briefcase',
      title: 'Корпоративный стиль',
      description: 'Интеграция логотипа и фирменных цветов'
    }
  },
  {
    id: 7,
    title: 'КУЛЬТУРНЫЕ ПРЕМИИ',
    subtitle: 'Искусство',
    description: 'Награды для деятелей культуры и искусства',
    image: 'https://cdn.poehali.dev/files/c9621737-8774-46ce-86b1-5b6e4f218017.jpg',
    link: '/catalog',
    badge: 'Мы знаем, что оценят творцы',
    advantage: {
      icon: 'Palette',
      title: 'Художественная ценность',
      description: 'Каждая награда — произведение искусства'
    }
  },
  {
    id: 8,
    title: 'ВОЕННЫЕ НАГРАДЫ',
    subtitle: 'Геройство',
    description: 'Знаки отличия для военнослужащих и ветеранов',
    image: 'https://cdn.poehali.dev/files/260284e9-c71d-4330-a54c-be76fc375800.jpg',
    link: '/catalog',
    badge: 'Мы знаем, как отметить доблесть',
    advantage: {
      icon: 'Shield',
      title: 'Военный стандарт',
      description: 'Соответствие уставам и традициям ВС РФ'
    }
  }
];
