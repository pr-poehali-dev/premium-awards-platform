import { useLocation } from 'react-router-dom';
import AwardVisualizer from '@/components/AwardVisualizer';

export default function ConstructorPage() {
  const location = useLocation();
  const product = location.state?.product;

  return <AwardVisualizer preselectedAward={product} />;
}
