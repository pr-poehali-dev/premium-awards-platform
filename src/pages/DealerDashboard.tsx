import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function DealerDashboard() {
  const stats = [
    { label: 'Продано', value: '234', icon: 'TrendingUp', color: 'text-green-600' },
    { label: 'Заработано', value: '145 890 ₽', icon: 'DollarSign', color: 'text-blue-600' },
    { label: 'Заказов', value: '89', icon: 'ShoppingCart', color: 'text-orange-600' },
    { label: 'Рейтинг', value: '4.8', icon: 'Star', color: 'text-yellow-600' },
  ];

  const products = [
    { id: 1, name: 'Беспроводные наушники', sold: 45, stock: 12, price: 3990 },
    { id: 2, name: 'Смарт-часы', sold: 32, stock: 8, price: 12990 },
    { id: 3, name: 'Набор для кофе', sold: 67, stock: 23, price: 2490 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background border-b p-4 z-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icon name="Store" size={28} className="text-primary" />
          Кабинет дилера
        </h1>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={stat.icon as any} size={24} className={stat.color} />
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Мои товары</span>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Продано: <strong className="text-foreground">{product.sold}</strong></span>
                  <span>Остаток: <strong className={product.stock < 10 ? 'text-red-600' : 'text-foreground'}>{product.stock}</strong></span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Edit" size={14} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="BarChart" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex-col">
            <Icon name="Package" size={32} className="mb-2" />
            <span>Заказы</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <Icon name="Wallet" size={32} className="mb-2" />
            <span>Выплаты</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <Icon name="BarChart3" size={32} className="mb-2" />
            <span>Статистика</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <Icon name="HelpCircle" size={32} className="mb-2" />
            <span>Поддержка</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
