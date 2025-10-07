import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Заявка на консультацию:', {
        name,
        email,
        phone,
        company,
        message,
        timestamp: new Date().toISOString(),
      });

      toast({
        title: 'Заявка отправлена!',
        description: 'Наш менеджер свяжется с вами в течение 2 часов',
      });

      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Icon name="MessageSquare" className="mr-2" size={14} />
            Свяжитесь с нами
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Получить консультацию
          </h2>
          <p className="text-xl text-muted-foreground">
            Обсудим ваш проект, подберём оптимальное решение и подготовим индивидуальное предложение
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="p-8 border-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="User" size={16} />
                      Ваше имя *
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Петров"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Mail" size={16} />
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ivan@company.ru"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Phone" size={16} />
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Building2" size={16} />
                      Компания
                    </label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="ООО «Компания»"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="FileText" size={16} />
                    Ваше сообщение *
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Расскажите о вашем проекте: какие награды нужны, количество, сроки..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить заявку
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Быстрый ответ</h3>
                  <p className="text-sm text-muted-foreground">
                    Ответим в течение 2 часов в рабочее время
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Конфиденциальность</h3>
                  <p className="text-sm text-muted-foreground">
                    Подписываем NDA по первому требованию
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="TrendingUp" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Индивидуальный подход</h3>
                  <p className="text-sm text-muted-foreground">
                    Персональный менеджер на всех этапах проекта
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Phone" className="text-primary" size={20} />
                Срочная связь
              </h3>
              <div className="space-y-3">
                <a 
                  href="tel:+74951234567" 
                  className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
                >
                  <Icon name="Phone" size={18} />
                  +7 (495) 123-45-67
                </a>
                <a 
                  href="mailto:info@awards-premium.ru" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Mail" size={16} />
                  info@awards-premium.ru
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Москва, Красная площадь, д.1</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
