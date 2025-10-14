import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Destination } from './destinations-data';

interface SlideContentProps {
  active: Destination;
  isFadingOut: boolean;
}

export default function SlideContent({ active, isFadingOut }: SlideContentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center">
      <div className="container mx-auto px-8 md:px-16 py-20">
        <div className={`max-w-xl transition-all duration-600 ${
          isFadingOut ? 'opacity-0 translate-y-[40px]' : 'opacity-100 translate-y-0 delay-400'
        }`}>
          <div className="overflow-hidden mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5">
              <Icon name="Sparkles" size={16} className="text-white" />
              <span className="text-sm font-medium text-white">{active.badge}</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <p className="text-[#FAEEE1]/80 text-xs md:text-sm mb-3 uppercase tracking-widest">
              {active.subtitle}
            </p>
          </div>

          <div className="overflow-hidden mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {active.title}
            </h1>
          </div>

          <div className="overflow-hidden mb-8">
            <p className="text-white/90 text-sm md:text-base max-w-md">
              {active.description}
            </p>
          </div>

          <div className="overflow-hidden mb-8">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-md">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name={active.advantage.icon as any} size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{active.advantage.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{active.advantage.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(active.link)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group"
            >
              <Icon name="Home" size={18} />
              КАТАЛОГ
            </button>
            <button
              onClick={() => navigate('/constructor')}
              className="border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-all"
            >
              ЗАКАЗАТЬ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}