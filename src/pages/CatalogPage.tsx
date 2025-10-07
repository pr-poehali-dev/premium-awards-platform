import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Catalog, { Product } from '@/components/Catalog';

export default function CatalogPage() {
  const navigate = useNavigate();

  const handleSelectForAI = (product: Product) => {
    navigate('/constructor', { state: { product } });
  };

  return <Catalog onSelectForAI={handleSelectForAI} />;
}
