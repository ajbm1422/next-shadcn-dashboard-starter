import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function CtaGithub() {
  return (
    <Button variant='ghost' asChild size='sm' className='group hidden sm:flex'>
      <Link
        href='/dashboard/overview'
        aria-label='Dashboard overview'
        className='dark:text-foreground transition-colors duration-300'
      >
        <Icons.dashboard className='transition-transform duration-300 group-hover:scale-110' />
      </Link>
    </Button>
  );
}
