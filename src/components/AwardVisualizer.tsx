import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Award {
  id: number;
  title: string;
  emoji: string;
  basePrice: number;
}

const awards: Award[] = [
  { id: 1, title: 'Кристальная звезда', emoji: '🏆', basePrice: 45000 },
  { id: 2, title: 'Золотая звезда Героя', emoji: '⭐', basePrice: 120000 },
  { id: 3, title: 'Кубок Победителя', emoji: '🥇', basePrice: 65000 },
  { id: 4, title: 'Корпоративный щит', emoji: '🛡️', basePrice: 55000 },
  { id: 5, title: 'Статуэтка "Лидер"', emoji: '🗿', basePrice: 95000 },
  { id: 6, title: 'Бронзовая медаль', emoji: '🥉', basePrice: 35000 },
];

export default function AwardVisualizer() {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [engraving, setEngraving] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [renderedImage, setRenderedImage] = useState<string>('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите изображение',
        variant: 'destructive',
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateRender = async () => {
    if (!selectedAward) {
      toast({
        title: 'Выберите награду',
        description: 'Сначала выберите награду из каталога',
        variant: 'destructive',
      });
      return;
    }

    if (!engraving.trim()) {
      toast({
        title: 'Добавьте текст',
        description: 'Введите текст для гравировки',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Professional product photography of ${selectedAward.title} premium award trophy, 
${logoPreview ? 'with custom company logo engraved on it, ' : ''}
engraved text: "${engraving}", 
studio lighting, white background, high quality, detailed, luxurious, elegant, 
photorealistic, 8k resolution, professional photography`;

      const response = await fetch('https://functions.poehali.dev/e63b8f9c-c00d-4e88-97f7-89a90183feec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Ошибка генерации изображения');
      }

      const data = await response.json();
      setRenderedImage(data.imageUrl);
      setShowQuoteForm(true);
      
      toast({
        title: 'Рендер готов!',
        description: 'Награда создана. Запросите коммерческое предложение.',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сгенерировать рендер. Попробуйте ещё раз.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRequestQuote = async () => {
    if (!clientName || !clientEmail || !clientPhone) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите контактные данные',
        variant: 'destructive',
      });
      return;
    }

    const quoteData = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      award: selectedAward?.title,
      engraving,
      hasLogo: !!logoFile,
      imageUrl: renderedImage,
    };

    console.log('Запрос коммерческого предложения:', quoteData);

    toast({
      title: 'Заявка отправлена!',
      description: 'Мы подготовим КП и свяжемся с вами в течение 2 часов',
    });

    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setShowQuoteForm(false);
  };

  const resetConstructor = () => {
    setSelectedAward(null);
    setLogoFile(null);
    setLogoPreview('');
    setEngraving('');
    setRenderedImage('');
    setShowQuoteForm(false);
  };

  return (
    <section id="constructor" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Конструктор наград
          </h2>
          <p className="text-xl text-muted-foreground">
            Выберите награду, добавьте логотип и текст — AI создаст реалистичный рендер
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Шаг 1: Выберите награду</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    onClick={() => setSelectedAward(award)}
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:shadow-lg ${
                      selectedAward?.id === award.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-5xl mb-2">{award.emoji}</div>
                    <p className="text-sm font-medium mb-1">{award.title}</p>
                    <p className="text-xs text-muted-foreground">
                      от {award.basePrice.toLocaleString()} ₽
                    </p>
                    {selectedAward?.id === award.id && (
                      <div className="mt-2">
                        <Icon name="Check" className="text-primary mx-auto" size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {selectedAward && (
              <>
                <Card className="p-6 animate-fade-in">
                  <h3 className="text-2xl font-semibold mb-6">Шаг 2: Добавьте логотип (опционально)</h3>
                  
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    
                    {!logoPreview ? (
                      <Button
                        variant="outline"
                        className="w-full h-32"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon name="Upload" size={32} />
                          <span>Загрузить логотип</span>
                        </div>
                      </Button>
                    ) : (
                      <div className="relative">
                        <div className="border-2 border-dashed border-primary rounded-lg p-4 flex items-center justify-center">
                          <img
                            src={logoPreview}
                            alt="Логотип"
                            className="max-h-32 object-contain"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview('');
                          }}
                        >
                          <Icon name="X" size={20} />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-6 animate-fade-in">
                  <h3 className="text-2xl font-semibold mb-6">Шаг 3: Текст гравировки</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="engraving">Текст для награды</Label>
                      <Textarea
                        id="engraving"
                        placeholder="Например: Лучший сотрудник года&#10;Иван Иванов&#10;2024"
                        rows={4}
                        value={engraving}
                        onChange={(e) => setEngraving(e.target.value)}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      onClick={handleGenerateRender}
                      disabled={isGenerating || !engraving.trim()}
                      className="w-full"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                          Создаём рендер...
                        </>
                      ) : (
                        <>
                          <Icon name="Sparkles" className="mr-2" size={20} />
                          Создать AI рендер
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 bg-muted/30">
              <h3 className="text-2xl font-semibold mb-6">Предпросмотр</h3>
              
              {!renderedImage ? (
                <div className="aspect-square bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    {!selectedAward ? (
                      <>
                        <Icon name="Award" size={64} className="mx-auto mb-4 opacity-30" />
                        <p>Выберите награду из каталога</p>
                      </>
                    ) : !engraving.trim() ? (
                      <>
                        <Icon name="Type" size={64} className="mx-auto mb-4 opacity-30" />
                        <p>Добавьте текст гравировки</p>
                      </>
                    ) : (
                      <>
                        <Icon name="Wand2" size={64} className="mx-auto mb-4 opacity-30" />
                        <p>Нажмите "Создать AI рендер"</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="aspect-square bg-background rounded-lg overflow-hidden border">
                    <img
                      src={renderedImage}
                      alt="Рендер награды"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 p-4 bg-background rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Награда:</span>
                      <span className="font-semibold">{selectedAward?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Базовая цена:</span>
                      <span className="font-semibold">{selectedAward?.basePrice.toLocaleString()} ₽</span>
                    </div>
                    {logoFile && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Логотип:</span>
                        <span className="font-semibold text-primary">✓ Добавлен</span>
                      </div>
                    )}
                  </div>

                  {!showQuoteForm ? (
                    <Button
                      onClick={() => setShowQuoteForm(true)}
                      className="w-full"
                      size="lg"
                    >
                      <Icon name="FileText" className="mr-2" size={20} />
                      Получить коммерческое предложение
                    </Button>
                  ) : (
                    <div className="space-y-4 p-4 bg-background rounded-lg animate-fade-in">
                      <h4 className="font-semibold text-lg">Ваши контакты</h4>
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          id="name"
                          placeholder="Иван Иванов"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ivan@company.ru"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleRequestQuote} className="w-full">
                        Отправить запрос
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={resetConstructor}
                    className="w-full"
                  >
                    <Icon name="RotateCcw" className="mr-2" size={18} />
                    Начать заново
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
