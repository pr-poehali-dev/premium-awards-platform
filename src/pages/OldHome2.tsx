import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Catalog, { Product } from '@/components/Catalog';
import Portfolio from '@/components/Portfolio';
import AwardVisualizer from '@/components/AwardVisualizer';
import ContactForm from '@/components/ContactForm';

const OldHome2 = () => {
  const navigate = useNavigate();

  const handleSelectForAI = (product: Product) => {
    navigate('/constructor', { state: { product } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Catalog onSelectForAI={handleSelectForAI} />
      <Portfolio />
      <AwardVisualizer />
      <ContactForm />
    </div>
  );
};

export default OldHome2;
