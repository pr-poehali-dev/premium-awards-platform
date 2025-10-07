import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import Catalog, { Product } from '@/components/Catalog';

export default function CatalogPage() {
  const navigate = useNavigate();

  const handleSelectForAI = (product: Product) => {
    navigate('/constructor', { state: { product } });
  };

  return (
    <>
      <Breadcrumbs />
      <Catalog onSelectForAI={handleSelectForAI} />
    </>
  );
}