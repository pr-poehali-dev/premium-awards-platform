import Icon from '@/components/ui/icon';

export default function MobileNav() {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const navItems = [
    { path: '/', icon: 'Home', label: 'Главная' },
    { path: '/profile', icon: 'User', label: 'Профиль' },
    { path: '/dealer', icon: 'Store', label: 'Дилеры' },
    { path: '/partner', icon: 'Handshake', label: 'Партнеры' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
