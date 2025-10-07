import { useState } from 'react';
import Hero from '@/components/Hero';
import Catalog, { Product } from '@/components/Catalog';
import Portfolio from '@/components/Portfolio';
import AwardVisualizer from '@/components/AwardVisualizer';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const [selectedAwardForAI, setSelectedAwardForAI] = useState<Product | undefined>();

  const handleSelectForAI = (product: Product) => {
    setSelectedAwardForAI(product);
    setTimeout(() => {
      document.getElementById('constructor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Catalog onSelectForAI={handleSelectForAI} />
      <Portfolio />
      <AwardVisualizer preselectedAward={selectedAwardForAI} />
      <ContactForm />
    </div>
  );
};

export default Index;
