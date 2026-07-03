import { MarketingAuthPage } from '@/features/marketing/components/marketing-pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return <MarketingAuthPage mode='sign-in' />;
}
