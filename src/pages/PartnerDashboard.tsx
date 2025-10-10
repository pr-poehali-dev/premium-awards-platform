import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function PartnerDashboard() {
  const stats = [
    { label: 'Привлечено клиентов', value: '156', icon: 'Users', color: 'text-purple-600' },
    { label: 'Комиссия', value: '23 450 ₽', icon: 'Wallet', color: 'text-green-600' },
    { label: 'Уровень', value: 'Gold', icon: 'Award', color: 'text-yellow-600' },
    { label: 'Бонусы', value: '12 340 ₽', icon: 'Gift', color: 'text-pink-600' },
  ];

  const referrals = [
    { name: 'Магазин "Цветы"', joined: '15.09.2024', orders: 23, earned: 4500 },
    { name: 'ИП Иванов', joined: '20.09.2024', orders: 15, earned: 3200 },
    { name: 'ООО "Подарки"', joined: '25.09.2024', orders: 8, earned: 1800 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background border-b p-4 z-10">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icon name="Handshake" size={28} className="text-primary" />
          Партнерская программа
        </h1>
      </div>

      <div className="p-4">
        <Card className="mb-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ваша реферальная ссылка</p>
                <div className="flex gap-2">
                  <Input
                    value="https://gifts.app/ref/ABC123"
                    readOnly
                    className="text-sm"
                  />
                  <Button size="icon">
                    <Icon name="Copy" size={18} />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Делитесь ссылкой и получайте 10% с каждого заказа приглашенных партнеров
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <Icon name={stat.icon as any} size={24} className={`${stat.color} mb-2`} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Приглашенные партнеры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {referrals.map((ref, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{ref.name}</h3>
                    <p className="text-xs text-muted-foreground">Присоединился: {ref.joined}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+{ref.earned.toLocaleString()} ₽</p>
                    <p className="text-xs text-muted-foreground">{ref.orders} заказов</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Уровни партнера</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                <div className="flex items-center gap-3">
                  <Icon name="Award" size={24} className="text-yellow-600" />
                  <div>
                    <p className="font-semibold">Gold</p>
                    <p className="text-xs text-muted-foreground">Ваш текущий уровень</p>
                  </div>
                </div>
                <p className="font-bold">10%</p>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg opacity-50">
                <div className="flex items-center gap-3">
                  <Icon name="Award" size={24} className="text-slate-400" />
                  <div>
                    <p className="font-semibold">Platinum</p>
                    <p className="text-xs text-muted-foreground">Ещё 50 клиентов</p>
                  </div>
                </div>
                <p className="font-bold">15%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button className="h-20 flex-col">
            <Icon name="Download" size={28} className="mb-2" />
            <span>Вывести</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Icon name="FileText" size={28} className="mb-2" />
            <span>История</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
