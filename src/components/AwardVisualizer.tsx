import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Award {
  id: number;
  title: string;
  image: string;
  basePrice: number;
}

const AwardVisualizer = () => {
  const [activeTab, setActiveTab] = useState('ai-generate');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [customText, setCustomText] = useState('');
  const [textPosition, setTextPosition] = useState<'top' | 'center' | 'bottom'>('center');
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  
  const { toast } = useToast();

  const baseAwards: Award[] = [
    { id: 1, title: 'Кубок "Классика"', image: '/placeholder.svg', basePrice: 45000 },
    { id: 2, title: 'Статуэтка "Престиж"', image: '/placeholder.svg', basePrice: 65000 },
    { id: 3, title: 'Плакетка "Элегантность"', image: '/placeholder.svg', basePrice: 25000 },
    { id: 4, title: 'Награда "Триумф"', image: '/placeholder.svg', basePrice: 80000 },
  ];

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите описание награды',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/e63b8f9c-c00d-4e88-97f7-89a90183feec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка генерации');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setShowQuoteForm(true);
      
      toast({
        title: 'Готово!',
        description: 'Награда создана. Запросите расчёт стоимости.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Не удалось сгенерировать изображение';
      toast({
        title: 'Ошибка',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRequestQuote = async () => {
    if (!clientName || !clientEmail || !clientPhone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const quoteData = {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      type: activeTab === 'ai-generate' ? 'AI-генерация' : 'Готовая награда',
      details: activeTab === 'ai-generate' 
        ? { prompt: aiPrompt, imageUrl: generatedImage }
        : { award: selectedAward?.title, customText, textPosition },
    };

    console.log('Запрос расчёта:', quoteData);

    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setShowQuoteForm(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Конструктор наград
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Создайте уникальную награду с помощью AI или выберите готовую модель
        </p>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="ai-generate" className="text-lg">
                <Icon name="Sparkles" size={20} className="mr-2" />
                AI-генерация
              </TabsTrigger>
              <TabsTrigger value="customize" className="text-lg">
                <Icon name="Pencil" size={20} className="mr-2" />
                Готовые награды
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-generate">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Опишите награду</h3>
                  <p className="text-muted-foreground mb-6">
                    Опишите желаемую награду: материал, форму, стиль, назначение
                  </p>
                  
                  <Textarea
                    placeholder="Например: Хрустальный кубок с золотыми элементами, современный минималистичный дизайн, для награждения лучшего CEO года"
                    rows={6}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="mb-4"
                  />

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-medium">Примеры промптов:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setAiPrompt('Элегантная статуэтка из тёмного дерева с золотой плакеткой для корпоративного юбилея')}
                      >
                        Деревянная статуэтка
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setAiPrompt('Современный стеклянный кубок с LED-подсветкой для инновационной компании')}
                      >
                        Кубок с подсветкой
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setAiPrompt('Металлическая награда в форме звезды с гравировкой, для спортивного события')}
                      >
                        Звезда металлическая
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={handleAIGenerate} 
                    disabled={isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Генерируем...
                      </>
                    ) : (
                      <>
                        <Icon name="Wand2" size={20} className="mr-2" />
                        Сгенерировать награду
                      </>
                    )}
                  </Button>
                </Card>

                <Card className="p-6 bg-muted/30">
                  <h3 className="text-2xl font-semibold mb-4">Предварительный вид</h3>
                  
                  {generatedImage ? (
                    <div className="space-y-4">
                      <div className="aspect-square bg-background rounded-lg overflow-hidden">
                        <img
                          src={generatedImage}
                          alt="Сгенерированная награда"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {showQuoteForm && (
                        <div className="space-y-4 animate-fade-in">
                          <h4 className="font-semibold text-lg">Запросить расчёт</h4>
                          <Input
                            placeholder="Ваше имя"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                          />
                          <Input
                            type="email"
                            placeholder="Email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                          />
                          <Input
                            type="tel"
                            placeholder="Телефон"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                          />
                          <Button onClick={handleRequestQuote} className="w-full">
                            Отправить запрос
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square bg-background rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Icon name="ImagePlus" size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Здесь появится ваша награда</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Выберите награду</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {baseAwards.map((award) => (
                      <Card
                        key={award.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedAward?.id === award.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedAward(award)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img
                            src={award.image}
                            alt={award.title}
                            className="w-full h-full object-cover"
                          />
                          {selectedAward?.id === award.id && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Icon name="Check" size={20} />
                              </div>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-1">{award.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            от {award.basePrice.toLocaleString()} ₽
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedAward && (
                    <Card className="p-6 animate-fade-in">
                      <h4 className="font-semibold text-lg mb-4">Текст гравировки</h4>
                      
                      <Textarea
                        placeholder="Введите текст для гравировки"
                        rows={3}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="mb-4"
                      />

                      <div className="mb-6">
                        <p className="text-sm font-medium mb-2">Позиция текста</p>
                        <div className="flex gap-2">
                          <Button
                            variant={textPosition === 'top' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTextPosition('top')}
                          >
                            Вверху
                          </Button>
                          <Button
                            variant={textPosition === 'center' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTextPosition('center')}
                          >
                            По центру
                          </Button>
                          <Button
                            variant={textPosition === 'bottom' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTextPosition('bottom')}
                          >
                            Внизу
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={() => setShowQuoteForm(true)}
                        className="w-full"
                        disabled={!customText.trim()}
                      >
                        Запросить расчёт
                      </Button>
                    </Card>
                  )}
                </div>

                <Card className="p-6 bg-muted/30">
                  <h3 className="text-2xl font-semibold mb-4">Предварительный вид</h3>
                  
                  {selectedAward ? (
                    <div className="space-y-4">
                      <div className="aspect-square bg-background rounded-lg overflow-hidden relative">
                        <img
                          src={selectedAward.image}
                          alt={selectedAward.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {customText && (
                          <div
                            className={`absolute inset-x-0 flex items-center justify-center px-4 ${
                              textPosition === 'top' ? 'top-8' : 
                              textPosition === 'center' ? 'top-1/2 -translate-y-1/2' : 
                              'bottom-8'
                            }`}
                          >
                            <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg text-center font-semibold max-w-full">
                              {customText}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-4 bg-background rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">Базовая стоимость:</span>
                          <span className="font-semibold">{selectedAward.basePrice.toLocaleString()} ₽</span>
                        </div>
                        {customText && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Гравировка:</span>
                            <span className="font-semibold">+ уточняется</span>
                          </div>
                        )}
                      </div>

                      {showQuoteForm && (
                        <div className="space-y-4 animate-fade-in">
                          <h4 className="font-semibold text-lg">Запросить расчёт</h4>
                          <Input
                            placeholder="Ваше имя"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                          />
                          <Input
                            type="email"
                            placeholder="Email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                          />
                          <Input
                            type="tel"
                            placeholder="Телефон"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                          />
                          <Button onClick={handleRequestQuote} className="w-full">
                            Отправить запрос
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square bg-background rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Icon name="MousePointerClick" size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Выберите награду слева</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AwardVisualizer;