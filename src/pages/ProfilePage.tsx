import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

export default function ProfilePage() {
  const user = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    balance: 5000,
  };

  const orders = [
    { id: 1, name: 'Беспроводные наушники', status: 'Доставлен', date: '10.10.2024', price: 3990 },
    { id: 2, name: 'Смарт-часы', status: 'В пути', date: '08.10.2024', price: 12990 },
  ];

  const menuItems = [
    { icon: 'ShoppingBag', label: 'Мои заказы', count: orders.length },
    { icon: 'Heart', label: 'Избранное', count: 12 },
    { icon: 'CreditCard', label: 'Способы оплаты', count: 2 },
    { icon: 'MapPin', label: 'Адреса доставки', count: 3 },
    { icon: 'Bell', label: 'Уведомления', count: 5 },
    { icon: 'Settings', label: 'Настройки', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Баланс бонусов</p>
                <p className="text-2xl font-bold text-primary">{user.balance} ₽</p>
              </div>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Пополнить
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Последние заказы</span>
              <Button variant="ghost" size="sm">Все</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{order.name}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    order.status === 'Доставлен' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="font-bold">{order.price.toLocaleString()} ₽</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between p-4 bg-card border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={item.icon as any} size={20} className="text-primary" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4" size="lg">
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
}
