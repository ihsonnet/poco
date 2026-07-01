import { PortfolioPage } from '@/components/PortfolioPage';
import { getRuntimeSiteSettings } from '@/lib/siteSettings';

export default async function Home() {
  return <PortfolioPage settings={await getRuntimeSiteSettings()} />;
}
