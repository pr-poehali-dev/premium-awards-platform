import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeMap: Record<string, string> = {
  '': 'Главная',
  'catalog': 'Каталог',
  'portfolio': 'Портфолио',
  'constructor': 'Конструктор',
  'contact': 'Контакты',
  'about': 'О компании',
};

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
  ];

  pathnames.forEach((segment, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = routeMap[segment] || segment;
    breadcrumbs.push({ label, path });
  });

  return (
    <nav className="container mx-auto px-4 py-4">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground/50" />
              )}
              {isLast ? (
                <span className="text-foreground font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;