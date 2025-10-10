import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import AwardVisualizer from '@/components/AwardVisualizer';

export default function ConstructorPage() {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <>
      <Breadcrumbs />
      <AwardVisualizer preselectedAward={product} />
    </>
  );
}