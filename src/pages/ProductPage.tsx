import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ProductPage() {
  const product = {
    name: 'Беспроводные наушники',
    price: 3990,
    oldPrice: 5990,
    rating: 4.8,
    reviews: 124,
    image: '🎧',
    description: 'Премиальные беспроводные наушники с активным шумоподавлением и временем работы до 30 часов.',
    features: ['Bluetooth 5.0', 'Активное шумоподавление', 'До 30 часов работы', 'Быстрая зарядка'],
    seller: 'Официальный магазин',
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 bg-background border-b p-4 z-10 flex items-center gap-3">
        <button onClick={() => window.history.back()}>
          <Icon name="ArrowLeft" size={24} />
        </button>
        <h1 className="font-semibold truncate flex-1">Товар</h1>
        <button>
          <Icon name="Share2" size={24} />
        </button>
        <button>
          <Icon name="Heart" size={24} />
        </button>
      </div>

      <div className="p-4">
        <div className="text-center mb-6">
          <div className="text-[120px] mb-4">{product.image}</div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={18}
                  className={star <= Math.round(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} отзывов)
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-end gap-3 mb-4">
              <p className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
              <p className="text-lg text-muted-foreground line-through mb-1">{product.oldPrice.toLocaleString()} ₽</p>
              <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded mb-1">
                -33%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Особенности:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Icon name="Store" size={20} />
              <span className="text-sm font-medium">{product.seller}</span>
              <Icon name="BadgeCheck" size={16} className="text-primary" />
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t">
          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="flex-1">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              В корзину
            </Button>
            <Button size="lg" className="flex-1">
              <Icon name="Zap" size={20} className="mr-2" />
              Купить сейчас
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
