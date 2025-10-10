import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/7ab617d1-6082-491d-bcad-2d5e25f95486';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  category_id: number;
  category_name?: string;
  is_active: boolean;
  sort_order: number;
  primary_image?: string;
}

interface ProductMedia {
  id: number;
  product_id: number;
  media_type: 'image' | 'video';
  url: string;
  title: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'media'>('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    sort_order: 0
  });

  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: 0,
    category_id: 0,
    is_active: true,
    sort_order: 0
  });

  const [mediaForm, setMediaForm] = useState({
    product_id: 0,
    media_type: 'image' as 'image' | 'video',
    url: '',
    title: '',
    alt_text: '',
    is_primary: false,
    sort_order: 0
  });

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });
      if (response.ok) {
        setCategoryForm({ name: '', slug: '', description: '', sort_order: 0 });
        loadCategories();
      }
    } catch (error) {
      console.error('Ошибка создания категории:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });
      if (response.ok) {
        setProductForm({
          name: '',
          slug: '',
          description: '',
          short_description: '',
          price: 0,
          category_id: 0,
          is_active: true,
          sort_order: 0
        });
        loadProducts();
      }
    } catch (error) {
      console.error('Ошибка создания продукта:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?resource=media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mediaForm)
      });
      if (response.ok) {
        setMediaForm({
          product_id: 0,
          media_type: 'image',
          url: '',
          title: '',
          alt_text: '',
          is_primary: false,
          sort_order: 0
        });
      }
    } catch (error) {
      console.error('Ошибка добавления медиа:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Icon name="Settings" size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Админ-панель каталога</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'categories' ? 'default' : 'outline'}
            onClick={() => setActiveTab('categories')}
          >
            <Icon name="FolderTree" size={18} className="mr-2" />
            Категории
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            onClick={() => setActiveTab('products')}
          >
            <Icon name="Package" size={18} className="mr-2" />
            Изделия
          </Button>
          <Button
            variant={activeTab === 'media' ? 'default' : 'outline'}
            onClick={() => setActiveTab('media')}
          >
            <Icon name="Image" size={18} className="mr-2" />
            Медиа
          </Button>
        </div>

        {activeTab === 'categories' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить категорию</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название</label>
                    <Input
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      placeholder="Награды"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Slug (URL)</label>
                    <Input
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      placeholder="nagrady"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание</label>
                    <Textarea
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      placeholder="Описание категории"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Порядок сортировки</label>
                    <Input
                      type="number"
                      value={categoryForm.sort_order}
                      onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Создание...' : 'Создать категорию'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список категорий ({categories.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="p-3 border rounded-lg">
                      <h3 className="font-semibold">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground">/{cat.slug}</p>
                      {cat.description && <p className="text-sm mt-1">{cat.description}</p>}
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">Категорий пока нет</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить изделие</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название</label>
                    <Input
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="Кубок победителя"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Slug (URL)</label>
                    <Input
                      value={productForm.slug}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      placeholder="kubok-pobeditelya"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Краткое описание</label>
                    <Input
                      value={productForm.short_description}
                      onChange={(e) => setProductForm({ ...productForm, short_description: e.target.value })}
                      placeholder="Для главных побед"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Полное описание</label>
                    <Textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Подробное описание изделия"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Цена</label>
                      <Input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Категория</label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={productForm.category_id}
                        onChange={(e) => setProductForm({ ...productForm, category_id: parseInt(e.target.value) })}
                      >
                        <option value={0}>Выберите категорию</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={productForm.is_active}
                      onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium">Активно</label>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Создание...' : 'Создать изделие'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список изделий ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {products.map((prod) => (
                    <div key={prod.id} className="p-3 border rounded-lg">
                      <div className="flex gap-3">
                        {prod.primary_image && (
                          <img src={prod.primary_image} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{prod.name}</h3>
                          <p className="text-sm text-muted-foreground">{prod.category_name || 'Без категории'}</p>
                          {prod.price && <p className="text-sm font-medium mt-1">{prod.price} ₽</p>}
                          {!prod.is_active && <span className="text-xs text-red-500">Неактивно</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">Изделий пока нет</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'media' && (
          <Card>
            <CardHeader>
              <CardTitle>Добавить медиафайл</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateMedia} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Изделие</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={mediaForm.product_id}
                    onChange={(e) => setMediaForm({ ...mediaForm, product_id: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Выберите изделие</option>
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>{prod.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Тип</label>
                    <select
                      className="w-full px-3 py-2 border rounded-md"
                      value={mediaForm.media_type}
                      onChange={(e) => setMediaForm({ ...mediaForm, media_type: e.target.value as 'image' | 'video' })}
                    >
                      <option value="image">Изображение</option>
                      <option value="video">Видео</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Порядок</label>
                    <Input
                      type="number"
                      value={mediaForm.sort_order}
                      onChange={(e) => setMediaForm({ ...mediaForm, sort_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">URL</label>
                  <Input
                    value={mediaForm.url}
                    onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Название</label>
                  <Input
                    value={mediaForm.title}
                    onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                    placeholder="Фото кубка"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Alt текст</label>
                  <Input
                    value={mediaForm.alt_text}
                    onChange={(e) => setMediaForm({ ...mediaForm, alt_text: e.target.value })}
                    placeholder="Золотой кубок победителя"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_primary"
                    checked={mediaForm.is_primary}
                    onChange={(e) => setMediaForm({ ...mediaForm, is_primary: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_primary" className="text-sm font-medium">Главное изображение</label>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Добавление...' : 'Добавить медиафайл'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
