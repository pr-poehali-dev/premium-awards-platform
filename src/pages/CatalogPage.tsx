import Breadcrumbs from '@/components/Breadcrumbs';
import Catalog, { Product } from '@/components/Catalog';

export default function CatalogPage() {
  const handleSelectForAI = (product: Product) => {
    window.location.href = '/constructor';
  };

  return (
    <>
      <Breadcrumbs />
      <Catalog onSelectForAI={handleSelectForAI} />
    </>
  );
}