import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { FlurLogo } from '@/components/brand/flur-logo';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  blogCategories,
  blogPosts,
  faqs,
  featureMatrix,
  footerGroups,
  guideFaqs,
  guideNav,
  landingComparison,
  landingFeatures,
  landingMetrics,
  landingTouchpoints,
  marketingNav,
  marketingPages,
  pricingPlans,
  storeShowcases,
  type MarketingPage
} from '../data';

const CHARLLA_ASSET_BASE = 'https://charlla.io/about/image/';
const LOCAL_SIGN_IN_URL = '/auth/sign-in';
const LOCAL_SIGN_UP_URL = '/auth/sign-up';
const LOCAL_SAMPLE_URL = '/sample';
const LOCAL_SUPPORT_URL = '/support';
const MARKETING_NAV_TRIGGER_CLASS =
  'bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 focus:bg-neutral-100 focus:text-neutral-950 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-950 dark:bg-white dark:text-neutral-700 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 dark:focus:bg-neutral-100 dark:focus:text-neutral-950';
const MARKETING_NAV_CONTENT_CLASS =
  'border-neutral-200 bg-white text-neutral-950 dark:border-neutral-200 dark:bg-white dark:text-neutral-950';
const MARKETING_NAV_LINK_CLASS =
  'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 focus:bg-neutral-100 focus:text-neutral-950 dark:text-neutral-700 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 dark:focus:bg-neutral-100 dark:focus:text-neutral-950';
const MARKETING_PRIMARY_BUTTON_CLASS =
  'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800';
const MARKETING_GHOST_BUTTON_CLASS =
  'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:bg-transparent dark:text-neutral-700 dark:hover:bg-neutral-100 dark:hover:text-neutral-950';
const MARKETING_OUTLINE_BUTTON_CLASS =
  'border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-200 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 dark:hover:text-neutral-950';

function asset(path: string) {
  return `${CHARLLA_ASSET_BASE}${path}`;
}

function BrandLogo({ size = 'md' }: { size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  return <FlurLogo size={size} />;
}

function AssetImage({
  src,
  alt,
  className,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(src)}
      alt={alt}
      width={1200}
      height={800}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}

function MarketingHeader() {
  return (
    <header className='sticky top-0 z-40 border-b border-neutral-200 bg-white/95 text-neutral-950 backdrop-blur supports-[backdrop-filter]:bg-white/80'>
      <div className='bg-neutral-950 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm'>
        [무료 다운로드] 레퍼런스 찾느라 밤새지 마세요. 업종별 숏폼 활용법 총정리.zip
      </div>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2 font-semibold tracking-tight'>
          <BrandLogo />
        </Link>

        <NavigationMenu viewport={false} className='hidden lg:flex'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={MARKETING_NAV_TRIGGER_CLASS}>
                서비스 소개
              </NavigationMenuTrigger>
              <NavigationMenuContent className={cn('w-72', MARKETING_NAV_CONTENT_CLASS)}>
                <div className='grid gap-1 p-1'>
                  {marketingNav.map((item) => (
                    <NavigationMenuLink
                      asChild
                      key={item.href}
                      className={MARKETING_NAV_LINK_CLASS}
                    >
                      <Link href={item.href} className='flex items-center justify-between gap-3'>
                        <span>{item.label}</span>
                        {item.badge && <Badge variant='secondary'>{item.badge}</Badge>}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {[
              ['가격 안내', '/price'],
              ['이용 가이드', '/guide'],
              ['자주 묻는 질문', '/faq'],
              ['블로그', '/blog']
            ].map(([label, href]) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className={cn(navigationMenuTriggerStyle(), MARKETING_NAV_TRIGGER_CLASS)}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='hidden items-center gap-2 md:flex'>
          <Button asChild variant='ghost' className={MARKETING_GHOST_BUTTON_CLASS}>
            <Link href={LOCAL_SIGN_IN_URL}>로그인</Link>
          </Button>
          <Button asChild className={MARKETING_PRIMARY_BUTTON_CLASS}>
            <Link href={LOCAL_SIGN_UP_URL}>무료로 시작하기</Link>
          </Button>
        </div>

        <div className='flex gap-2 md:hidden'>
          <Button asChild size='sm' variant='outline' className={MARKETING_OUTLINE_BUTTON_CLASS}>
            <Link href='/price'>가격</Link>
          </Button>
          <Button asChild size='sm' className={MARKETING_PRIMARY_BUTTON_CLASS}>
            <Link href={LOCAL_SIGN_UP_URL}>시작</Link>
          </Button>
        </div>
      </div>
      <div className='border-t border-neutral-200 bg-white px-4 py-2 text-neutral-950 lg:hidden'>
        <div className='mx-auto flex max-w-7xl gap-2 overflow-x-auto text-sm whitespace-nowrap'>
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
            >
              {{
                '/widget': '숏폼 위젯',
                '/setting': '설정',
                '/player': '플레이어',
                '/statistic': '통계'
              }[item.href] ?? item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function MarketingFooter() {
  return (
    <footer className='border-t bg-white text-neutral-950'>
      <div className='mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_2fr] md:px-6'>
        <div>
          <BrandLogo />
          <p className='mt-4 max-w-sm text-sm leading-6 text-neutral-600'>
            플러는 생생한 고화질 플레이어, 구매 링크를 삽입한 샵 플레이어로 커머스에 꼭 필요한
            서비스를 노코드로 사용할 수 있는 숏폼 솔루션입니다.
          </p>
          <p className='mt-6 text-xs leading-5 text-neutral-500'>
            주식회사 카테노이드
            <br />
            대표이사 김형석 | 사업자등록번호 114-86-89540 | 통신판매번호 2013-서울강남-00887
            <br />
            서울특별시 강남구 봉은사로 502, 삼하빌딩 4~5층
            <br />
            (C) 2023 Catenoid Inc. All Rights Reserved.
          </p>
          <nav className='mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500'>
            <Link href='/kr/terms/use' className='hover:text-neutral-950'>
              회원 이용약관
            </Link>
            <Separator orientation='vertical' className='h-3' />
            <Link href='/kr/terms/privacy' className='hover:text-neutral-950'>
              개인정보 처리방침
            </Link>
            <Separator orientation='vertical' className='h-3' />
            <Link href='/kr/terms/dpa' className='hover:text-neutral-950'>
              데이터 처리 계약서
            </Link>
            <Separator orientation='vertical' className='h-3' />
            <Link href='/kr/terms/japan-addendum' className='hover:text-neutral-950'>
              일본 고객 특약
            </Link>
          </nav>
        </div>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {footerGroups.map((group) => (
            <div key={group.label}>
              <h3 className='text-sm font-semibold'>{group.label}</h3>
              <div className='mt-3 space-y-2'>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='block text-sm text-neutral-600 hover:text-neutral-950'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='marketing-light-scope min-h-screen bg-white text-neutral-950'>
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className='mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center'>
      <div className='grid grid-cols-2 gap-3 sm:gap-5'>
        <div className='overflow-hidden rounded-[28px] bg-neutral-950 p-2 shadow-xl'>
          <AspectRatio ratio={9 / 16}>
            <div className='flex h-full w-full flex-col justify-between rounded-[20px] bg-[linear-gradient(160deg,#fff7ed_0%,#fef3c7_42%,#111827_42%,#111827_100%)] p-3'>
              <div className='flex items-center justify-between text-[11px] font-semibold text-neutral-950'>
                <span>Sample Mall</span>
                <Badge className='bg-white/90 text-neutral-950 hover:bg-white'>1080p</Badge>
              </div>
              <div className='rounded-2xl bg-white/90 p-2 shadow-lg'>
                <div className='aspect-square rounded-xl bg-[linear-gradient(135deg,#f59e0b,#10b981)]' />
                <div className='mt-2 h-2 rounded-full bg-neutral-200' />
                <div className='mt-2 h-2 w-2/3 rounded-full bg-neutral-200' />
              </div>
              <div className='rounded-2xl bg-white p-3 text-neutral-950 shadow-lg'>
                <div className='text-xs font-semibold'>Pure Balance Skin Serum</div>
                <div className='mt-1 text-sm font-bold text-[#ff5a3d]'>15% ₩28,000</div>
              </div>
            </div>
          </AspectRatio>
        </div>
        <div className='mt-10 overflow-hidden rounded-[28px] bg-neutral-950 p-2 shadow-xl'>
          <AspectRatio ratio={9 / 16}>
            <div className='flex h-full w-full flex-col justify-between rounded-[20px] bg-[linear-gradient(160deg,#bae6fd,#14b8a6_52%,#111827_52%)] p-3 text-white'>
              <div className='flex items-center justify-between text-[11px] font-semibold'>
                <span>Shop Player</span>
                <span className='rounded-full bg-white px-2 py-1 text-neutral-950'>+2</span>
              </div>
              <div className='mx-auto w-4/5 rounded-[24px] bg-white/20 p-2 shadow-lg ring-1 ring-white/25'>
                <div className='aspect-[4/5] rounded-[18px] bg-[linear-gradient(135deg,#fca5a5,#fde68a,#67e8f9)]' />
              </div>
              <div className='space-y-2 rounded-2xl bg-white p-3 text-neutral-950 shadow-lg'>
                <div className='h-2 rounded-full bg-neutral-200' />
                <div className='h-2 w-2/3 rounded-full bg-neutral-200' />
                <div className='flex items-center justify-between text-xs font-bold'>
                  <span>Tropical Swimwear</span>
                  <span className='text-[#ff5a3d]'>₩72,000</span>
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>
      <div className='rounded-[32px] bg-white p-4 shadow-xl ring-1 ring-black/5'>
        <AssetImage
          src='img-main-ui.svg'
          alt='charlla main interface'
          className='h-auto w-full rounded-[24px]'
          priority
        />
      </div>
    </div>
  );
}

function StoreLogoStrip() {
  return (
    <div className='mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8'>
      {storeShowcases.map((showcase) => (
        <Card key={showcase} className='rounded-lg py-0'>
          <CardContent className='flex h-20 items-center justify-center px-3 text-center text-sm font-semibold text-neutral-600'>
            {showcase}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className='mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center'>
      <div className='rounded-lg border bg-neutral-950 p-4 text-white shadow-sm'>
        <div className='rounded-md bg-white p-3 text-neutral-950'>
          <div className='grid gap-4 md:grid-cols-[0.86fr_1fr]'>
            <div className='aspect-[9/14] rounded-md bg-[linear-gradient(150deg,#111827,#10b981_50%,#f59e0b)] p-3 text-white'>
              <div className='flex h-full flex-col justify-between rounded-md border border-white/30 p-3'>
                <div className='flex items-center justify-between text-xs'>
                  <span>1080p</span>
                  <span className='rounded-full bg-white px-2 py-1 text-neutral-950'>2MB</span>
                </div>
                <div>
                  <div className='mb-3 h-3 w-2/3 rounded-full bg-white/80' />
                  <div className='h-9 rounded-md bg-white/20' />
                </div>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='rounded-md border p-3'>
                <div className='text-xs font-medium text-neutral-500'>GIF</div>
                <div className='mt-2 h-3 rounded-full bg-neutral-200' />
                <div className='mt-2 h-3 w-3/4 rounded-full bg-neutral-200' />
                <div className='mt-4 text-3xl font-semibold text-neutral-400'>16.7MB</div>
              </div>
              <div className='rounded-md bg-neutral-950 p-3 text-white'>
                <div className='text-xs font-medium text-neutral-400'>플러</div>
                <div className='mt-2 h-3 rounded-full bg-emerald-400' />
                <div className='mt-2 h-3 w-3/4 rounded-full bg-emerald-300' />
                <div className='mt-4 text-3xl font-semibold'>2MB대</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className='overflow-hidden rounded-lg py-0'>
        <Table>
          <TableHeader className='bg-neutral-950'>
            <TableRow className='hover:bg-neutral-950'>
              {['항목', '숏폼 플레이어', 'GIF'].map((heading) => (
                <TableHead key={heading} className='h-12 px-4 font-semibold text-white'>
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {landingComparison.map((row) => (
              <TableRow key={row.label}>
                <TableCell className='px-4 py-4 font-semibold text-neutral-950'>
                  {row.label}
                </TableCell>
                <TableCell className='px-4 py-4 text-emerald-700'>{row.shorts}</TableCell>
                <TableCell className='px-4 py-4 text-neutral-500'>{row.gif}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function CommerceFlowVisual() {
  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <div className='grid gap-4 md:grid-cols-[0.85fr_1fr]'>
        <div className='rounded-md bg-[#edf2ff] p-4 text-white'>
          <div className='flex items-center justify-between text-xs text-neutral-300'>
            <span className='text-neutral-700'>Shop player</span>
            <span className='rounded-full bg-white px-2 py-1 text-neutral-950'>Preview</span>
          </div>
          <div className='mx-auto mt-4 max-w-[260px] overflow-hidden rounded-[28px] bg-neutral-950 p-2 shadow-xl'>
            <AssetImage
              src='shoplayer-phone.svg'
              alt='shop player preview'
              className='h-auto w-full rounded-[20px]'
            />
          </div>
        </div>
        <div className='space-y-3'>
          {landingTouchpoints.map((item, index) => (
            <div key={item.title} className='rounded-md border p-4'>
              <div className='flex items-center gap-3'>
                <span className='flex size-8 items-center justify-center rounded-md bg-neutral-950 text-sm text-white'>
                  {index + 1}
                </span>
                <div className='font-semibold'>{item.title}</div>
              </div>
              <p className='mt-3 text-sm leading-6 text-neutral-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className='mx-auto max-w-3xl text-center'>
      {eyebrow && <div className='mb-3 text-sm font-semibold text-emerald-700'>{eyebrow}</div>}
      <h2 className='text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl'>{title}</h2>
      {description && (
        <p className='mt-4 text-base leading-7 text-neutral-600 md:text-lg'>{description}</p>
      )}
    </div>
  );
}

function FinalCta() {
  return (
    <section className='bg-neutral-950 px-4 py-20 text-white md:px-6'>
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight md:text-5xl'>
          플러의 모든 기능, 30일 동안 무제한 사용하세요.
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-neutral-300'>
          플러의 생생한 몰입으로 쇼핑몰 매출을 올려 보세요.
        </p>
        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <Button asChild size='lg'>
            <Link href={LOCAL_SAMPLE_URL}>샘플페이지</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href={LOCAL_SIGN_UP_URL}>무료로 시작하기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <MarketingShell>
      <section className='relative overflow-hidden bg-[#f6f7f1] px-4 pt-20 pb-14 md:px-6'>
        <div className='mx-auto max-w-6xl text-center'>
          <Badge className='mb-6 bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
            온라인 쇼핑몰에 숏폼 솔루션을 더하세요!
          </Badge>
          <h1 className='mx-auto max-w-5xl text-4xl leading-tight font-bold tracking-tight text-neutral-950 md:text-7xl'>
            사진보다 영상으로, 더욱 생생한 쇼핑몰 만들기
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700'>
            GIF보다 빠른 플러 숏폼으로 시작하세요
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Button asChild size='lg'>
              <Link href={LOCAL_SAMPLE_URL}>샘플페이지</Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href={LOCAL_SIGN_UP_URL}>무료로 시작하기</Link>
            </Button>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className='px-4 py-20 md:px-6'>
        <SectionHeading
          eyebrow='GIF 대체'
          title='GIF보다 용량은 작게, 화질은 높게'
          description='GIF만들기 대신 가볍고 선명한 플러 숏폼으로 상세페이지를 최적화하세요.'
        />
        <ComparisonTable />
      </section>

      <section className='bg-neutral-50 px-4 py-20 md:px-6'>
        <SectionHeading
          title='영상으로 더 오래 기억되는 쇼핑몰'
          description='쇼핑몰 동영상 넣기에 최적화된 숏폼 솔루션. HTML은 물론, 노코드 편집툴 적용도 문제 없어요.'
        />
        <div className='mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3'>
          {landingMetrics.map((metric, index) => (
            <Card key={metric.label} className='rounded-lg'>
              <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className='text-4xl'>{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className='text-sm text-neutral-600'>
                <p>{metric.description}</p>
                <AssetImage
                  src={`img_info_graph_0${index + 1}.svg`}
                  alt={metric.label}
                  className='mt-6 h-auto w-full'
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <StoreLogoStrip />
      </section>

      <section className='px-4 py-20 md:px-6'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center'>
          <div>
            <div className='text-sm font-semibold text-emerald-700'>구매 흐름 연결</div>
            <h2 className='mt-3 text-3xl font-bold tracking-tight md:text-5xl'>
              클릭! 한 번에 구매까지 이어지는 플러 숏폼
            </h2>
            <p className='mt-4 leading-7 text-neutral-700'>
              구매전환율을 높이는 가장 똑똑한 방법. 숏폼 영상에 구매 링크를 추가하고 상품페이지까지
              연결하세요!
            </p>
            <Button asChild className='mt-8'>
              <Link href='/player'>플레이어 더 보기</Link>
            </Button>
          </div>
          <CommerceFlowVisual />
        </div>
      </section>

      <section className='px-4 py-20 md:px-6'>
        <SectionHeading
          eyebrow='플레이어 유형'
          title='쇼핑몰에 최적화된 숏폼 플레이어로 하나의 동영상을 다양하게 활용하세요!'
          description='GIF보다 가볍고 선명한 상품 소개부터, SNS 바이럴 숏폼으로 구매까지!'
        />
        <div className='mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3'>
          {landingFeatures.map((feature) => {
            const Icon = Icons[feature.icon];
            const image =
              feature.title === '디스플레이어'
                ? 'displayer-laptop.svg'
                : feature.title === '샵 플레이어'
                  ? 'shoplayer-phone.svg'
                  : 'img_widget_main.png';
            return (
              <Card key={feature.title} className='rounded-lg'>
                <CardHeader>
                  <div className='mb-4 flex size-10 items-center justify-center rounded-lg bg-neutral-950 text-white'>
                    <Icon className='size-5' />
                  </div>
                  <div className='text-xs font-semibold text-emerald-700'>{feature.eyebrow}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-sm leading-6 text-neutral-600'>
                  {feature.description}
                  <AssetImage src={image} alt={feature.title} className='mt-6 h-auto w-full' />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className='bg-[#f7f0df] px-4 py-20 md:px-6'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center'>
          <div>
            <div className='text-sm font-semibold text-amber-800'>설정 자동화</div>
            <h2 className='mt-3 text-3xl font-bold tracking-tight md:text-5xl'>
              버튼 하나로 완성하는 숏폼 설정
            </h2>
            <p className='mt-4 leading-7 text-neutral-700'>
              복잡한 코딩 없이 버튼 클릭 한 번에 숏폼 설정부터, 쇼핑몰 적용까지.
            </p>
            <Button asChild className='mt-8'>
              <Link href='/setting'>간편한 플레이어 설정</Link>
            </Button>
          </div>
          <div className='rounded-[32px] bg-white p-4 shadow-sm ring-1 ring-black/5'>
            <AssetImage
              src='img-main-nocode-new.svg'
              alt='no code player setting'
              className='h-auto w-full rounded-[24px]'
            />
            <div className='mt-5 grid gap-3 sm:grid-cols-3'>
              {[
                ['컨트롤 바 표시 / 숨기기', 'icon-volume.svg'],
                ['자동 재생 / 반복 재생', 'icon-loop.svg'],
                ['자유로운 크기 조절', 'icon-resizing.svg']
              ].map(([step, icon]) => (
                <div key={step} className='rounded-lg bg-[#f3eefc] p-4 text-[#7950f2]'>
                  <AssetImage src={icon} alt='' className='mb-3 size-8' />
                  <div className='text-sm font-bold leading-6'>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-20 md:px-6'>
        <SectionHeading
          eyebrow='비디오 · 커머스 통계'
          title='쇼핑몰에 최적화된 숏폼 플레이어로 어디서 얼마나 노출될까요?'
          description='플레이어 로드수, 페이지 전환율, 시청자 참여 데이터 까지. 상세한 숏폼 시청 통계로 소비자의 반응을 살펴보세요.'
        />
        <div className='mx-auto mt-12 max-w-6xl rounded-[32px] border bg-white p-4 shadow-sm'>
          <div className='grid gap-4 md:grid-cols-[1.05fr_0.95fr]'>
            <AssetImage
              src='img-statistic-01.png'
              alt='statistic dashboard'
              className='h-auto w-full rounded-[24px]'
            />
            <div className='grid gap-3'>
              {[
                ['플레이어 로드수', 'img-statistic-02.png'],
                ['페이지 전환율', 'img-statistic-03.png'],
                ['시청자 참여 데이터', 'img-statistic-04.png']
              ].map(([item, image]) => (
                <div key={item} className='rounded-[20px] border bg-neutral-50 p-3'>
                  <div className='font-semibold'>{item}</div>
                  <AssetImage
                    src={image}
                    alt={item}
                    className='mt-3 h-auto w-full rounded-[14px]'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </MarketingShell>
  );
}

function StatisticHeroPreview() {
  const bars = [38, 72, 54, 88, 67, 112, 96, 124];

  return (
    <div className='rounded-[24px] bg-neutral-950 p-5 text-white'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-xs font-medium text-neutral-400'>Video analytics</div>
          <div className='mt-2 text-3xl font-bold'>24,810</div>
          <div className='mt-1 text-xs text-neutral-400'>날짜별 조회수</div>
        </div>
        <Badge className='bg-emerald-400 text-neutral-950 hover:bg-emerald-400'>+18.4%</Badge>
      </div>
      <div className='mt-6 grid grid-cols-[1fr_auto] items-end gap-3'>
        <div className='flex h-32 items-end gap-2 rounded-2xl bg-white/8 p-3'>
          {bars.map((height, index) => (
            <div
              key={`${height}-${index}`}
              className='flex-1 rounded-t bg-[linear-gradient(180deg,#67e8f9,#34d399)]'
              style={{ height }}
            />
          ))}
        </div>
        <div className='space-y-2 text-right text-xs text-neutral-400'>
          <div>조회수</div>
          <div>좋아요</div>
          <div>댓글</div>
          <div>참여율</div>
        </div>
      </div>
      <div className='mt-5 grid gap-2 sm:grid-cols-3'>
        {[
          ['좋아요', '3,428'],
          ['댓글', '812'],
          ['참여율', '8.7%']
        ].map(([label, value]) => (
          <div key={label} className='rounded-xl bg-white p-3 text-neutral-950'>
            <div className='text-xs text-neutral-500'>{label}</div>
            <div className='mt-1 text-lg font-bold'>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureHero({ page }: { page: MarketingPage }) {
  const heroImages: Record<string, string> = {
    widget: 'img_floatingwidget.png',
    setting: 'img-setting-control-01.png',
    player: 'img-player-01.svg',
    statistic: 'img-statistic-01.png'
  };
  const heroImage = heroImages[page.slug];

  return (
    <section className='bg-[#f6f7f1] px-4 py-20 md:px-6'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center'>
        <div>
          <Badge className='mb-5 bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
            {page.eyebrow}
          </Badge>
          <h1 className='text-4xl leading-tight font-bold tracking-tight md:text-6xl'>
            {page.title}
          </h1>
          <p className='mt-5 max-w-2xl text-lg leading-8 text-neutral-700'>{page.description}</p>
          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <Button asChild size='lg'>
              <Link href={LOCAL_SIGN_UP_URL}>{page.primaryCta}</Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href={LOCAL_SAMPLE_URL}>{page.secondaryCta}</Link>
            </Button>
          </div>
        </div>
        <div className='overflow-hidden rounded-[32px] bg-white p-4 shadow-xl ring-1 ring-black/5'>
          {page.slug === 'statistic' ? (
            <StatisticHeroPreview />
          ) : heroImage ? (
            <AssetImage
              src={heroImage}
              alt={`${page.slug} preview`}
              className='h-auto w-full rounded-[24px]'
              priority={page.slug === 'widget'}
            />
          ) : (
            <div className='rounded-md bg-neutral-950 p-5 text-white'>
              <div className='text-sm text-neutral-400'>Commerce video module</div>
              <div className='mt-4 text-5xl font-bold'>{page.heroMetric}</div>
              <div className='mt-2 text-neutral-300'>{page.heroMetricLabel}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WidgetDetail() {
  const widgetTypes = [
    [
      '플로팅 위젯',
      '작은 위젯이 화면 한쪽에 떠 있어 쇼핑 흐름을 방해하지 않으면서도 영상 콘텐츠를 계속 노출할 수 있어요.',
      'img_floatingwidget.png'
    ],
    [
      '슬라이드 위젯',
      '여러 동영상을 슬라이드 형태로 보여주는 위젯이에요. 다양한 콘텐츠를 한 화면 안에서 자연스럽게 탐색할 수 있어요.',
      'img_slidewidget.png'
    ],
    [
      '멀티 샵플레이어 위젯',
      '동영상과 상품 목록을 함께 배치해, 콘텐츠를 보며 상품을 쉽게 탐색할 수 있는 위젯이에요.',
      'img_multishopplayerwidget.png'
    ],
    [
      '스포트라이트 위젯',
      '가운데 영상을 강조해 보여주는 위젯입니다. 동영상과 상품 이미지를 함께 배치해 풍부한 쇼핑 경험을 제공합니다.',
      'img_spotlightwidget.png'
    ]
  ];
  const setupSteps = [
    ['디자인 선택', '위젯 레이아웃과 모서리, 색상, 상품 배너 스타일을 선택합니다.'],
    ['동영상 & 상품 선택', '보여줄 영상과 연결할 상품을 한 번에 묶습니다.'],
    ['코드 복사해서 붙이기', '생성된 코드를 쇼핑몰 페이지에 넣고 바로 미리봅니다.']
  ];
  const defaultWidgetType = widgetTypes[0]?.[0] ?? '';

  return (
    <>
      <section className='bg-neutral-50 px-4 py-20 md:px-6'>
        <SectionHeading
          eyebrow='위젯 성과'
          title='쇼핑몰 안에 자연스럽게 녹아드는 숏폼 위젯'
          description='신상품 · 기획전 · 리뷰 콘텐츠를 짧은 영상 위젯으로 배치하고 구매 흐름까지 연결하세요.'
        />
        <div className='mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3'>
          {[
            ['30%', '고객 구매전환율 증가'],
            ['113%', '좋아요·공유 클릭 증가'],
            ['115%', '평균 체류 시간 증가']
          ].map(([value, label]) => (
            <Card key={label} className='rounded-lg'>
              <CardHeader>
                <CardTitle className='text-5xl'>{value}</CardTitle>
                <CardDescription>{label}</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetImage
                  src={
                    value === '30%'
                      ? 'graph_04.png'
                      : value === '113%'
                        ? 'graph_05.png'
                        : 'graph_06.png'
                  }
                  alt={label}
                  className='h-auto w-full rounded-md'
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='px-4 py-20 md:px-6'>
        <SectionHeading
          title='우리 쇼핑몰에 딱 맞는 위젯 디자인을 선택하세요'
          description='플로팅, 슬라이드, 멀티 샵플레이어, 스포트라이트까지 다양한 템플릿을 제공합니다.'
        />
        <Tabs defaultValue={defaultWidgetType} className='mx-auto mt-12 max-w-6xl'>
          <TabsList className='grid h-auto w-full grid-cols-2 gap-1 p-1 lg:grid-cols-4'>
            {widgetTypes.map(([title]) => (
              <TabsTrigger key={title} value={title} className='h-auto min-h-10 whitespace-normal'>
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          {widgetTypes.map(([title, description, image]) => (
            <TabsContent key={title} value={title} className='mt-6'>
              <Card className='rounded-lg'>
                <CardContent className='grid gap-6 pt-0 lg:grid-cols-[1.08fr_0.92fr] lg:items-center'>
                  <div className='rounded-lg bg-[#f3f4f6] p-3'>
                    <AssetImage src={image} alt={title} className='h-auto w-full rounded-md' />
                  </div>
                  <div>
                    <Badge variant='secondary'>Widget preset</Badge>
                    <h3 className='mt-4 text-3xl font-bold text-[#13bdb3]'>{title}</h3>
                    <p className='mt-3 text-base leading-7 text-neutral-600'>{description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className='bg-neutral-50 px-4 py-20 md:px-6'>
        <SectionHeading
          title='상품 등록은 더 간편하게, 연결은 더 자유롭게'
          description='자주 하는 일일수록, 더 간단하고 정확해야 하니까요.'
        />
        <div className='mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-2'>
          <div className='overflow-hidden rounded-[32px] bg-[radial-gradient(432%_121%_at_70%_97%,#9dc1ff_0%,#778bff_51%,#7759ff_100%)] text-white lg:col-span-2 lg:grid lg:grid-cols-2'>
            <div className='p-6 lg:p-8'>
              <h3 className='text-2xl font-bold md:text-3xl'>상품으로 위젯 만들기</h3>
              <p className='mt-3 leading-7'>
                이제 영상뿐 아니라 상품도 위젯에 바로 연결할 수 있어요. 슬라이드로 함께 배치해
                자연스럽게 구매 전환을 유도해보세요.
              </p>
              <AssetImage src='img_productui.png' alt='product ui' className='mt-6 h-auto w-full' />
            </div>
            <AssetImage
              src='img_videoproduct.png'
              alt='video product'
              className='h-full w-full object-cover'
            />
          </div>
          {[
            ['한 번 등록하면, 위젯 어디든 연결', 'img_addproduct.png'],
            ['카페24 상품 정보 연동', 'img_checkproduct.png']
          ].map(([title, image]) => (
            <div key={title} className='overflow-hidden rounded-[32px] bg-[#f3f4f6]'>
              <div className='p-6 pb-0 lg:p-8 lg:pb-0'>
                <h3 className='text-2xl font-bold'>{title}</h3>
                <p className='mt-3 leading-7 text-neutral-600'>
                  상품 정보를 한 번 등록하거나 불러오면 위젯과 영상에 자유롭게 연결할 수 있어요.
                </p>
              </div>
              <AssetImage src={image} alt={title} className='h-auto w-full' />
            </div>
          ))}
        </div>
      </section>

      <section className='bg-[#f7f0df] px-4 py-20 md:px-6'>
        <SectionHeading
          title='위젯 설정, 클릭 몇 번이면 충분해요'
          description='처음이어도 헤매지 않도록 모든 흐름을 단순하게 만들었어요.'
        />
        <div className='mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3'>
          {setupSteps.map(([title, description], index) => (
            <Card key={title} className='rounded-lg'>
              <CardHeader>
                <div className='mb-6 flex size-10 items-center justify-center rounded-lg bg-neutral-950 text-white'>
                  {index + 1}
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

function SettingDetail() {
  const options = [
    [
      '재생 컨트롤 바 OFF',
      '불필요한 정보를 줄이고 콘텐츠에 집중시키세요. 상세페이지에 자연스럽게 녹아드는 동영상을 연출할 수 있어요.',
      'img-setting-control-02.png',
      'icon-setting-control-01.svg'
    ],
    [
      '자동, 반복 재생',
      '플레이 버튼을 클릭하지 않아도 돼요. 소비자가 상세 페이지에 접속하면 자동으로 동영상이 재생됩니다.',
      'img-setting-autoplay-01.png',
      'icon-setting-autoplay-01.svg'
    ],
    [
      '동영상 크기 조절',
      '최대 1080p 까지 동영상 크기를 조절해 보세요. 가로 숫자만 변경하면 원본 비율은 유지한 채 크기가 바뀌어요.',
      'img-setting-fit-02.png',
      'icon-setting-fit-01.svg'
    ]
  ];

  return (
    <section className='px-4 py-20 md:px-6'>
      <div className='mx-auto max-w-6xl space-y-16'>
        {options.map(([title, description, image, icon], index) => (
          <div
            key={title}
            className='grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center even:lg:grid-cols-[1.15fr_0.85fr]'
          >
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <div className='mb-4 flex size-12 items-center justify-center rounded-xl bg-[#f3eefc] p-2'>
                <AssetImage src={icon} alt='' className='size-8' />
              </div>
              <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>{title}</h2>
              <p className='mt-4 leading-7 text-neutral-700'>{description}</p>
            </div>
            <div className='rounded-[32px] bg-white p-4 shadow-sm ring-1 ring-black/5'>
              <AssetImage src={image} alt={title} className='h-auto w-full rounded-[24px]' />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PlayerDetail() {
  const displayerUseCases = [
    '의류 소재와 신축성 설명',
    '음식 조리법 설명 및 조리 과정 홍보',
    '메인 페이지 메인 모델 및 제품',
    '운동기구 사용법',
    '생활용품 사용 전후',
    '화장품 발림성과 지속력',
    '장난감, 피규어 놀이 예시 설명',
    '주얼리 색감 및 빛 반사 설명',
    '여행지 및 호텔 인테리어 설명',
    '전자기기 사용법 설명',
    '먹방 숏폼 영상',
    '뷰티 디바이스 효과 및 사용법'
  ];
  const shopUseCases = [
    '좋아요, 공유수를 참고한 신상품 소비자 반응 확인',
    '주력 상품 바이럴 마케팅 유도',
    '온라인 커뮤니티 신상품 홍보',
    '연관 상품 홍보',
    '플랫폼 가입없이 시청하는 숏폼 커머스 플레이어',
    '브랜드 전용 샵 플레이어 모아보기 피드 제작'
  ];

  return (
    <section className='px-4 py-20 md:px-6'>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-2'>
        {[
          [
            'Displayer',
            '상품 상세 페이지나 콘텐츠 페이지에 영상을 전시하기 위한 플레이어입니다.',
            displayerUseCases,
            'img-player-01.svg'
          ],
          [
            'Shop player',
            '영상 속 상품을 구매 링크와 연결하는 커머스 플레이어입니다.',
            shopUseCases,
            'img-player-02.svg'
          ]
        ].map(([title, description, items, image], index) => (
          <div key={title as string} className='rounded-lg border bg-white p-5 shadow-sm'>
            <div className='rounded-[28px] bg-[#f3f4f6] p-4 text-white'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-neutral-600'>{title as string}</span>
                <Badge className='bg-white text-neutral-950 hover:bg-white'>
                  {index === 0 ? 'Display' : 'Commerce'}
                </Badge>
              </div>
              <AssetImage
                src={image as string}
                alt={title as string}
                className='mt-5 h-auto w-full'
              />
            </div>
            <h2 className='mt-6 text-2xl font-bold tracking-tight'>{title as string}</h2>
            <p className='mt-3 leading-7 text-neutral-600'>{description as string}</p>
            <div className='mt-6 grid gap-2 sm:grid-cols-2'>
              {(items as string[]).map((item) => (
                <div key={item} className='flex items-center gap-2 rounded-md border p-3 text-sm'>
                  <Icons.check className='size-4 text-emerald-600' />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatisticDetail() {
  const dailyMetrics = [
    ['조회수', '24,810', 'bg-emerald-400', [46, 72, 58, 86, 78, 116, 102]],
    ['좋아요', '3,428', 'bg-amber-300', [28, 44, 36, 58, 52, 70, 66]],
    ['댓글', '812', 'bg-sky-300', [18, 24, 30, 42, 34, 50, 46]],
    ['참여율', '8.7%', 'bg-rose-300', [36, 48, 44, 60, 58, 74, 68]]
  ];
  const statBlocks = [
    [
      '플레이어 로드 수 통계',
      '동영상이 어떤 페이지에서 어떤 플레이어로 몇 번 로드 됐는지 확인하세요.',
      'img-statistic-02.png'
    ],
    [
      '상세페이지 전환율 통계',
      '상세페이지 전환율로 샵 플레이어를 통해 소비자가 얼마나 유입됐는지 확인하세요.',
      'img-statistic-03.png'
    ],
    [
      '시청자 참여수 통계',
      '좋아요, 공유 수로 시청자 반응도 확인 가능합니다.',
      'img-statistic-04.png'
    ],
    [
      '업로드 통계',
      '날짜별, 월 별로 몇 개의 동영상을 업로드했는지 살펴보세요.',
      'img-statistic-05.png'
    ]
  ];

  return (
    <section className='bg-neutral-50 px-4 py-20 md:px-6'>
      <SectionHeading
        title='동영상, 날짜별 통계와 통계별 TOP 10 동영상 순위까지 확인하세요!'
        description='커머스에 꼭 필요한 기능과 데이터를 제공하는 숏폼 플랫폼입니다.'
      />
      <div className='mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-4'>
        {dailyMetrics.map(([label, value, color, bars]) => (
          <Card key={label as string} className='rounded-lg'>
            <CardHeader>
              <CardDescription>날짜별 {label as string}</CardDescription>
              <CardTitle className='text-3xl'>{value as string}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex h-28 items-end gap-1 rounded-md bg-neutral-950 p-3'>
                {(bars as number[]).map((height, index) => (
                  <div
                    key={`${label}-${index}`}
                    className={`flex-1 rounded-t ${color as string}`}
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-2'>
        {statBlocks.map(([title, description, image], index) => (
          <div key={title} className='rounded-lg border bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-semibold'>{title}</h3>
                <p className='mt-2 text-sm leading-6 text-neutral-600'>{description}</p>
              </div>
              <span className='flex size-10 items-center justify-center rounded-lg bg-neutral-950 text-white'>
                {index + 1}
              </span>
            </div>
            <AssetImage src={image} alt={title} className='mt-6 h-auto w-full rounded-[20px]' />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureDetail({ slug }: { slug: keyof typeof marketingPages }) {
  if (slug === 'widget') {
    return <WidgetDetail />;
  }
  if (slug === 'setting') {
    return <SettingDetail />;
  }
  if (slug === 'player') {
    return <PlayerDetail />;
  }
  if (slug === 'statistic') {
    return <StatisticDetail />;
  }
  return null;
}

export function FeaturePage({ slug }: { slug: keyof typeof marketingPages }) {
  const page = marketingPages[slug];

  return (
    <MarketingShell>
      <FeatureHero page={page} />
      <section className='px-4 py-20 md:px-6'>
        <div className='mx-auto grid max-w-6xl gap-4 md:grid-cols-3'>
          {page.sections.map((section, index) => (
            <Card key={section.title} className='rounded-lg'>
              <CardHeader>
                <div className='mb-4 flex size-9 items-center justify-center rounded-lg bg-neutral-950 text-white'>
                  {index + 1}
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className='flex items-center gap-2 text-sm text-neutral-700'>
                      <Icons.check className='size-4 text-emerald-600' />
                      {bullet}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <FeatureDetail slug={slug} />
      <section className='bg-neutral-50 px-4 py-20 md:px-6'>
        <SectionHeading
          title='이런 기능도 함께 사용할 수 있어요'
          description='서비스 소개 페이지끼리 자연스럽게 이어지는 구조입니다.'
        />
        <div className='mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2'>
          {page.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='rounded-lg border bg-white p-5 shadow-sm'
            >
              <div className='flex items-center justify-between gap-3'>
                <div>
                  <div className='font-semibold'>{item.title}</div>
                  <div className='mt-2 text-sm leading-6 text-neutral-600'>{item.description}</div>
                </div>
                <Icons.arrowRight className='size-5' />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta />
    </MarketingShell>
  );
}

export function PricingPage() {
  return (
    <MarketingShell>
      <section className='bg-[#f6f7f1] px-4 py-20 text-center md:px-6'>
        <Badge className='mb-5 bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
          가격 안내
        </Badge>
        <h1 className='mx-auto max-w-4xl text-4xl leading-tight font-bold tracking-tight md:text-6xl'>
          재생 횟수가 아니라 방문수 기준으로 합리적인 플랜을 선택하세요
        </h1>
        <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-700'>
          숏폼이 100번 반복 재생 되어도 로드수는 단 1회, 재생 횟수 걱정 없이 웹사이트 방문수에 맞게
          플랜을 선택하세요.
        </p>
      </section>

      <section className='px-4 py-16 md:px-6'>
        <div className='mx-auto mb-8 max-w-5xl rounded-lg border bg-white p-4 text-center text-sm leading-6 text-neutral-600 shadow-sm'>
          플레이어 로드는 웹페이지가 열리며 영상 플레이어가 준비되는 횟수 기준입니다. 같은 영상이
          반복 재생되어도 로드 수는 추가되지 않습니다.
        </div>
        <div className='mx-auto grid max-w-7xl gap-4 lg:grid-cols-4'>
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative rounded-lg ${
                plan.name === 'Basic' ? 'border-neutral-950 shadow-xl' : ''
              }`}
            >
              {plan.name === 'Basic' && (
                <div className='absolute -top-4 right-4 left-4 rounded-full bg-neutral-950 px-3 py-2 text-center text-xs font-semibold text-white'>
                  가장 추천하는 플랜
                </div>
              )}
              <CardHeader>
                <div className='flex items-center justify-between gap-3'>
                  <CardTitle>{plan.name}</CardTitle>
                  <Badge variant='secondary'>{plan.tag}</Badge>
                </div>
                <div className='pt-4 text-3xl font-bold'>{plan.price}</div>
                <CardDescription>/월</CardDescription>
              </CardHeader>
              <CardContent className='space-y-5'>
                <div className='rounded-md bg-neutral-50 p-3 text-sm'>
                  <div className='font-semibold'>{plan.load}</div>
                  <div className='mt-1 text-neutral-600'>{plan.overage}</div>
                  <div className='mt-2 text-neutral-600'>{plan.uploads}</div>
                </div>
                <div className='space-y-2'>
                  {plan.features.map((feature) => (
                    <div key={feature} className='flex items-center gap-2 text-sm'>
                      <Icons.check className='size-4 text-emerald-600' />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className='w-full'
                  variant={plan.name === 'Enterprise' ? 'outline' : 'default'}
                >
                  <Link href={plan.name === 'Enterprise' ? LOCAL_SUPPORT_URL : LOCAL_SIGN_UP_URL}>
                    {plan.name === 'Enterprise' ? '영업팀 문의' : '무료로 시작하기'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id='plan' className='bg-neutral-50 px-4 py-20 md:px-6'>
        <SectionHeading
          title='플랜별 기능 상세'
          description='업로드 수, 로드 수, 플레이어 기능과 통계를 비교합니다.'
        />
        <Card className='mx-auto mt-10 max-w-6xl overflow-x-auto rounded-lg py-0'>
          <Table className='min-w-[760px]'>
            <TableHeader className='bg-neutral-950'>
              <TableRow className='hover:bg-neutral-950'>
                {['기능', 'Lite', 'Basic', 'Standard', 'Enterprise'].map((heading) => (
                  <TableHead key={heading} className='h-12 px-4 font-semibold text-white'>
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureMatrix.map((row) => (
                <TableRow key={row[0]}>
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={`${row[0]}-${cellIndex}`}
                      className={cn(
                        'px-4 py-4',
                        cellIndex === 0 ? 'font-semibold text-neutral-950' : 'text-neutral-700'
                      )}
                    >
                      {cell === '포함' ? (
                        <span className='inline-flex items-center gap-2 font-medium text-emerald-700'>
                          <Icons.check className='size-4' />
                          포함
                        </span>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      <section id='faq' className='px-4 py-20 md:px-6'>
        <div className='mx-auto max-w-3xl'>
          <SectionHeading title='자주 묻는 질문' />
          <Accordion type='single' collapsible className='mt-10'>
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FinalCta />
    </MarketingShell>
  );
}

function BlogHeader() {
  return (
    <header className='sticky top-0 z-50 border-b border-neutral-200 bg-white/95 text-neutral-950 backdrop-blur supports-[backdrop-filter]:bg-white/80'>
      <div className='mx-auto flex h-[54px] max-w-[1152px] items-center justify-between gap-4 px-4'>
        <div className='flex min-w-0 items-center gap-3'>
          <Link href='/' className='flex items-center gap-2 font-semibold tracking-tight'>
            <BrandLogo size='sm' />
          </Link>
          <Link href='/blog' className='flex items-center gap-2 text-sm font-semibold'>
            <Separator orientation='vertical' className='h-5' />
            <span>Blog</span>
          </Link>
        </div>

        <nav className='hidden items-center gap-2 text-sm text-neutral-700 lg:flex'>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={MARKETING_NAV_TRIGGER_CLASS}>
                  서비스 소개
                </NavigationMenuTrigger>
                <NavigationMenuContent className={cn('w-72', MARKETING_NAV_CONTENT_CLASS)}>
                  <div className='grid gap-1 p-1'>
                    {marketingNav.map((item) => (
                      <NavigationMenuLink
                        asChild
                        key={item.href}
                        className={MARKETING_NAV_LINK_CLASS}
                      >
                        <Link href={item.href} className='flex items-center justify-between gap-3'>
                          <span>{item.label}</span>
                          {item.badge && <Badge variant='secondary'>{item.badge}</Badge>}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild size='sm' className={MARKETING_PRIMARY_BUTTON_CLASS}>
            <Link href={LOCAL_SIGN_UP_URL}>1개월 무료 이용</Link>
          </Button>
        </nav>

        <div className='flex items-center gap-2 lg:hidden'>
          <Button asChild size='sm' variant='outline' className={MARKETING_OUTLINE_BUTTON_CLASS}>
            <Link href='/blog'>Blog</Link>
          </Button>
          <Button asChild size='sm' className={MARKETING_PRIMARY_BUTTON_CLASS}>
            <Link href={LOCAL_SIGN_UP_URL}>시작</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='marketing-light-scope min-h-screen bg-white text-neutral-950'>
      <BlogHeader />
      {children}
      <footer className='border-t px-4 py-10'>
        <div className='mx-auto flex max-w-[1152px] flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between'>
          <span>플러 Media</span>
          <div className='flex gap-3'>
            <Link href='/blog' className='hover:text-neutral-950'>
              RSS
            </Link>
            <span>Powered by local editorial shell</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogVisual({ featured = false, index }: { featured?: boolean; index: number }) {
  const palettes = [
    'from-emerald-500 via-teal-400 to-amber-300',
    'from-rose-500 via-orange-300 to-sky-300',
    'from-zinc-900 via-emerald-600 to-lime-300',
    'from-cyan-500 via-blue-400 to-amber-200',
    'from-fuchsia-500 via-rose-400 to-orange-200'
  ];
  const palette = palettes[index % palettes.length];

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${palette} ${
        featured ? 'min-h-[340px] md:min-h-[358px]' : 'min-h-[260px]'
      }`}
    >
      <div className='absolute inset-4 rounded-md border border-white/30 bg-white/15 p-4 backdrop-blur-sm'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-1.5'>
            <span className='size-2 rounded-full bg-white/90' />
            <span className='size-2 rounded-full bg-white/60' />
            <span className='size-2 rounded-full bg-white/40' />
          </div>
          <span className='rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-neutral-950'>
            video commerce
          </span>
        </div>
        <div className='absolute right-4 bottom-4 left-4'>
          <div className='grid grid-cols-[0.7fr_1fr] gap-3'>
            <div className='aspect-[9/14] rounded-md bg-neutral-950/80 p-2'>
              <div className='h-full rounded bg-white/20' />
            </div>
            <div className='space-y-3 self-end'>
              <div className='h-3 rounded-full bg-white/85' />
              <div className='h-3 w-4/5 rounded-full bg-white/60' />
              <div className='h-10 rounded-md bg-white/80' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({
  post,
  featured = false,
  index
}: {
  post: (typeof blogPosts)[number];
  featured?: boolean;
  index: number;
}) {
  const href = `/blog#post-${index}`;

  if (featured) {
    return (
      <Link
        id={`post-${index}`}
        href={href}
        className='group grid overflow-hidden rounded-lg border bg-white transition hover:border-neutral-400 md:grid-cols-[1.38fr_0.82fr]'
      >
        <BlogVisual featured index={index} />
        <div className='flex flex-col justify-center p-6 md:p-8'>
          <div className='text-sm font-semibold text-neutral-500'>{post.category}</div>
          <h2 className='mt-4 text-3xl leading-tight font-semibold tracking-tight md:text-[32px]'>
            {post.title}
          </h2>
          <p className='mt-4 text-base leading-7 text-neutral-600'>{post.excerpt}</p>
          <div className='mt-7 flex items-center gap-3 text-sm text-neutral-500'>
            <span>{post.date}</span>
            <span className='size-1 rounded-full bg-neutral-300' />
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      id={`post-${index}`}
      href={href}
      className='group block rounded-lg p-2 transition hover:bg-neutral-50'
    >
      <BlogVisual index={index} />
      <div className='px-2 pt-5'>
        <h2 className='text-2xl leading-snug font-semibold tracking-tight md:text-[26px]'>
          {post.title}
        </h2>
        <p className='mt-3 line-clamp-3 leading-7 text-neutral-600'>{post.excerpt}</p>
        <div className='mt-5 flex items-center gap-3 text-sm text-neutral-500'>
          <span>{post.date}</span>
          <span className='size-1 rounded-full bg-neutral-300' />
          <span>{post.category}</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const regularPosts = blogPosts.filter((post) => post !== featuredPost);
  const topPosts = regularPosts.slice(0, 4);
  const morePosts = regularPosts.slice(4);

  return (
    <BlogShell>
      <main>
        <h1 className='sr-only'>플러 Blog</h1>
        <section className='mx-auto max-w-[1152px] px-4 pt-24'>
          <div className='grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end'>
            <div className='min-w-0'>
              <div className='mb-7 flex gap-3 overflow-x-auto whitespace-nowrap'>
                {blogCategories.map((category) => (
                  <Link
                    key={category}
                    href={category === '전체' ? '/blog' : `/blog#${category}`}
                    className={`inline-flex min-h-9 items-center rounded-md px-3.5 py-1.5 text-sm font-medium ${
                      category === '전체'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {category === '전체' ? 'See All' : category}
                  </Link>
                ))}
              </div>
              <p className='max-w-xl text-sm leading-6 text-neutral-500'>
                쇼핑몰 영상 운영, 업종별 숏폼 전략, 고객 사례를 한 화면에서 훑어보는 운영
                노트입니다.
              </p>
            </div>
            <div className='rounded-lg border bg-white p-2 shadow-sm'>
              <div className='flex gap-2'>
                <Input className='min-w-0 flex-1' placeholder='Email' type='email' />
                <Button size='sm'>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-[1152px] px-4 pt-8 pb-20'>
          <BlogCard post={featuredPost} featured index={0} />

          <div className='mt-12 grid gap-8 lg:grid-cols-2'>
            {topPosts.map((post, index) => (
              <BlogCard key={post.title} post={post} index={index + 1} />
            ))}
          </div>

          <div className='mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
            {morePosts.map((post, index) => (
              <BlogCard key={post.title} post={post} index={index + topPosts.length + 1} />
            ))}
          </div>
        </section>
      </main>
    </BlogShell>
  );
}

function GuideHeader() {
  return (
    <header className='sticky top-0 z-50 flex h-16 items-center border-b border-neutral-200 bg-white px-4 text-neutral-950'>
      <div className='grid w-full grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[320px_1fr_320px]'>
        <Link href='/' className='flex min-w-0 items-center gap-2 font-semibold'>
          <BrandLogo size='sm' />
          <span className='truncate'>Guide</span>
        </Link>

        <nav className='hidden items-center justify-center gap-6 text-sm text-neutral-600 lg:flex'>
          <Link href={LOCAL_SIGN_IN_URL} className='hover:text-neutral-950'>
            Sign In
          </Link>
          <Link href={LOCAL_SIGN_UP_URL} className='hover:text-neutral-950'>
            Free Trial
          </Link>
          <button className='flex items-center gap-1 hover:text-neutral-950'>
            Support Center
            <Icons.chevronDown className='size-4' />
          </button>
        </nav>

        <div className='flex justify-end'>
          <div className='relative hidden w-full max-w-[220px] md:block'>
            <Icons.search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500' />
            <Input
              readOnly
              placeholder='Ask or search...'
              className='h-9 cursor-pointer border-neutral-200 bg-white pr-14 pl-9 text-sm text-neutral-950 placeholder:text-neutral-500 dark:border-neutral-200 dark:bg-white dark:text-neutral-950 dark:placeholder:text-neutral-500'
            />
            <kbd className='pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-500'>
              Ctrl K
            </kbd>
          </div>
          <Button asChild size='sm' className='md:hidden'>
            <Link href={LOCAL_SIGN_UP_URL}>시작</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function GuideShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='marketing-light-scope min-h-screen bg-white text-neutral-950'>{children}</div>
  );
}

function GuideSidebar() {
  return (
    <aside className='hidden border-r bg-white lg:block'>
      <div className='sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-5 py-7'>
        <Link href='/guide' className='flex items-center gap-2 font-semibold'>
          <BrandLogo size='xs' />
          <span>Guide</span>
        </Link>
        <div className='mt-8 space-y-8'>
          {guideNav.map((section) => (
            <div key={section.group}>
              <div className='mb-3 text-xs font-semibold tracking-wide text-neutral-500 uppercase'>
                {section.group}
              </div>
              <div className='space-y-1'>
                {section.items.map((item) => (
                  <Link
                    key={`${section.group}-${item.href}-${item.label}`}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm ${
                      item.href === '/faq'
                        ? 'bg-neutral-100 font-semibold text-neutral-950'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='mt-10 rounded-lg border p-3 text-xs leading-5 text-neutral-500'>
          플러 User Guide의 자주 묻는 질문을 문서형 레이아웃으로 정리했습니다.
        </div>
      </div>
    </aside>
  );
}

export function FaqPage() {
  return (
    <GuideShell>
      <GuideHeader />
      <div className='grid min-h-[calc(100vh-4rem)] lg:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr_256px]'>
        <GuideSidebar />
        <article className='px-5 py-10 md:px-10 lg:px-14'>
          <div className='mx-auto max-w-[720px]'>
            <div className='mb-8 flex items-center gap-2 text-sm text-neutral-500'>
              <Link href='/' className='hover:text-neutral-950'>
                제품 소개
              </Link>
              <Icons.chevronRight className='size-4' />
              <span>자주 묻는 질문</span>
            </div>
            <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>자주 묻는 질문</h1>
            <p className='mt-5 text-base leading-7 text-neutral-600'>
              쇼핑몰 숏폼 플레이어를 도입하기 전에 자주 확인하는 운영, 설정, 통계, 결제 질문을
              문서형으로 정리했습니다.
            </p>
            <div className='mt-12 space-y-9'>
              {guideFaqs.map((faq) => (
                <section key={faq.id} id={faq.id} className='scroll-mt-24 border-b pb-8'>
                  <h2 className='flex items-start gap-2 text-lg font-semibold tracking-tight md:text-xl'>
                    <Icons.chevronRight className='mt-1 size-5 shrink-0 text-neutral-400' />
                    <span>Q. {faq.question}</span>
                  </h2>
                  <p className='mt-4 leading-7 text-neutral-700'>{faq.answer}</p>
                  {faq.steps && (
                    <ol className='mt-4 list-decimal space-y-2 pl-6 text-sm leading-6 text-neutral-700'>
                      {faq.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                  {faq.bullets && (
                    <ul className='mt-4 space-y-2 pl-1 text-sm leading-6 text-neutral-700'>
                      {faq.bullets.map((bullet) => (
                        <li key={bullet} className='flex gap-2'>
                          <span className='mt-2 size-1.5 rounded-full bg-neutral-400' />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {faq.note && (
                    <p className='mt-4 rounded-lg border bg-neutral-50 p-3 text-sm leading-6 text-neutral-600'>
                      {faq.note}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
        <aside className='hidden border-l bg-white xl:block'>
          <div className='sticky top-16 px-6 py-8'>
            <button className='flex items-center gap-1 text-xs font-semibold tracking-wide text-neutral-500 uppercase'>
              On this page
              <Icons.chevronDown className='size-4' />
            </button>
            <div className='mt-4 space-y-3'>
              {guideFaqs.map((faq) => (
                <a
                  key={faq.id}
                  href={`#${faq.id}`}
                  className='block text-sm text-neutral-600 hover:text-neutral-950'
                >
                  {faq.question}
                </a>
              ))}
            </div>
            <Button asChild className='mt-8 w-full' variant='outline'>
              <Link href={LOCAL_SIGN_UP_URL}>Free Trial</Link>
            </Button>
          </div>
        </aside>
      </div>
    </GuideShell>
  );
}

const termDocuments = {
  privacy: {
    eyebrow: '개인정보 처리방침',
    title: '플러 서비스 개인정보처리방침',
    version: 'Version 3.6 · 통합 표준 개인정보처리방침',
    effective: '시행일: 2026년 6월 1일',
    summary:
      '플러 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고, 서비스 운영과 고객 지원 목적 안에서만 처리합니다.',
    sections: [
      {
        title: '제1조 수집하는 개인정보 항목 및 이용 목적',
        body: '회원 가입, 서비스 이용, 결제, 고객 지원, 보안 관리를 위해 이름, 이메일, 회사명, 접속 기록, 결제 상태, 문의 내용을 처리할 수 있습니다.'
      },
      {
        title: '제2조 보관 및 파기',
        body: '서비스 제공 기간 동안 정보를 보관하며, 관련 법령 또는 분쟁 대응에 필요한 기간이 지나면 지체 없이 파기합니다.'
      },
      {
        title: '제3조 제3자 제공 및 처리위탁',
        body: '결제, 인프라, 고객 상담 등 서비스 운영에 필요한 범위에서만 처리 업무를 위탁하며, 위탁사는 보안 의무를 준수합니다.'
      },
      {
        title: '제4조 이용자의 권리',
        body: '이용자는 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있으며, 고객센터를 통해 접수할 수 있습니다.'
      }
    ]
  },
  use: {
    eyebrow: '이용약관',
    title: '플러 서비스 표준이용약관',
    version: 'Version 5.5 · 표준이용약관',
    effective: '시행일: 2026년 6월 1일',
    summary:
      '플러 서비스 이용 조건, 계정 관리, 요금제, 제한 행위, 서비스 제공 범위와 책임 기준을 정의합니다.',
    sections: [
      {
        title: '제1조 목적',
        body: '본 약관은 플러 서비스 이용과 관련하여 회사와 이용자 사이의 권리, 의무, 책임사항을 정합니다.'
      },
      {
        title: '제2조 계정 및 조직',
        body: '이용자는 정확한 정보를 바탕으로 계정을 생성하고, 조직 구성원 권한을 책임 있게 관리해야 합니다.'
      },
      {
        title: '제3조 서비스 이용',
        body: '회사는 영상 업로드, 플레이어 설정, 위젯 배포, 통계 조회 기능을 제공하며, 안정적 운영을 위해 필요한 조치를 할 수 있습니다.'
      },
      {
        title: '제4조 요금 및 플랜',
        body: '유료 플랜은 선택한 사용량과 계약 조건에 따라 과금되며, 초과 사용 정책은 가격 안내에 따릅니다.'
      }
    ]
  },
  dpa: {
    eyebrow: 'DATA PROCESSING AGREEMENT',
    title: '데이터 처리 계약서 (DPA)',
    version: 'Version 1.2.3 · 한국어 참조 번역본',
    effective: '최종 업데이트: 2026년 4월 2일',
    summary:
      '고객사의 위탁 데이터 처리 범위, 보안 조치, 하위 처리자, 사고 대응, 국제 이전 기준을 정리합니다.',
    sections: [
      {
        title: '제1조 처리 범위',
        body: '플러는 고객이 서비스에 업로드하거나 연동한 데이터를 서비스 제공과 유지보수 목적 범위에서 처리합니다.'
      },
      {
        title: '제2조 보안 조치',
        body: '접근 통제, 전송 구간 보호, 로그 관리, 권한 분리 등 합리적인 기술적·관리적 보호조치를 유지합니다.'
      },
      {
        title: '제3조 하위 처리자',
        body: '서비스 인프라, 결제, 고객 상담에 필요한 하위 처리자를 이용할 수 있으며 주요 변경은 고객에게 고지합니다.'
      },
      {
        title: '제4조 종료 후 처리',
        body: '계약 종료 후 법령상 보관 의무가 없는 데이터는 삭제하거나 고객에게 반환할 수 있도록 지원합니다.'
      }
    ]
  },
  'japan-addendum': {
    eyebrow: 'JAPAN ADDENDUM',
    title: '플러 서비스 일본 고객 특약',
    version: 'Japan Addendum v1.0',
    effective: '시행일: 2026년 6월 1일',
    summary:
      '일본 고객에게 적용되는 계약 보충 조항과 현지 법령 대응 기준을 정리한 특약 문서입니다.',
    sections: [
      {
        title: '제1조 적용 범위',
        body: '본 특약은 일본 법인 또는 일본 소재 사업장이 플러 서비스를 이용하는 경우 표준약관과 함께 적용됩니다.'
      },
      {
        title: '제2조 데이터 보호',
        body: '개인정보 처리와 이전은 적용 가능한 일본 개인정보 보호 관련 법령과 고객 계약 조건을 고려하여 수행합니다.'
      },
      {
        title: '제3조 지원 언어 및 통지',
        body: '운영 통지와 지원은 기본적으로 한국어 또는 영어로 제공되며, 별도 계약에 따라 일본어 지원 범위를 정할 수 있습니다.'
      }
    ]
  }
};

export function TermsPage({ kind }: { kind: keyof typeof termDocuments }) {
  const doc = termDocuments[kind];

  return (
    <GuideShell>
      <GuideHeader />
      <main className='px-5 py-12 md:px-10'>
        <article className='mx-auto max-w-3xl'>
          <div className='text-xs font-semibold tracking-wide text-neutral-500 uppercase'>
            {doc.eyebrow}
          </div>
          <h1 className='mt-3 text-4xl leading-tight font-semibold tracking-tight md:text-5xl'>
            {doc.title}
          </h1>
          <div className='mt-5 space-y-1 text-sm text-blue-700'>
            <p>{doc.version}</p>
            <p>{doc.effective}</p>
            <div className='flex flex-wrap gap-2 pt-2'>
              <Link href='/kr/terms/use' className='underline underline-offset-4'>
                이용약관
              </Link>
              <span>·</span>
              <Link href='/kr/terms/privacy' className='underline underline-offset-4'>
                개인정보처리방침
              </Link>
              <span>·</span>
              <Link href='/kr/terms/dpa' className='underline underline-offset-4'>
                DPA
              </Link>
            </div>
          </div>
          <Separator className='my-8' />
          <p className='text-base leading-8 text-neutral-700'>{doc.summary}</p>
          <div className='mt-10 space-y-8'>
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2 className='text-xl font-semibold tracking-tight'>{section.title}</h2>
                <p className='mt-3 leading-8 text-neutral-700'>{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </GuideShell>
  );
}

export function GuideOverviewPage() {
  return (
    <GuideShell>
      <GuideHeader />
      <div className='grid min-h-[calc(100vh-4rem)] lg:grid-cols-[320px_1fr]'>
        <GuideSidebar />
        <main className='px-5 py-10 md:px-10 lg:px-14'>
          <div className='mx-auto max-w-5xl'>
            <Badge className='bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
              플러 Guide
            </Badge>
            <h1 className='mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl'>
              영상 업로드부터 위젯 배포와 통계 확인까지 한 번에 보는 이용 가이드
            </h1>
            <p className='mt-5 max-w-2xl text-base leading-8 text-neutral-600'>
              실제 서비스 연결 전에도 로컬 리플리카에서 회원가입, 무료체험, 플레이어 설정, 위젯
              적용, 통계 조회 흐름을 확인할 수 있습니다.
            </p>
            <div className='mt-10 grid gap-4 md:grid-cols-2'>
              {guideNav.flatMap((section) =>
                section.items.map((item) => (
                  <Link
                    key={`${section.group}-${item.href}-${item.label}`}
                    href={item.href}
                    className='rounded-lg border bg-white p-5 shadow-sm transition hover:border-neutral-400'
                  >
                    <div className='text-xs font-semibold text-neutral-500'>{section.group}</div>
                    <div className='mt-3 flex items-center justify-between gap-3'>
                      <div className='font-semibold'>{item.label}</div>
                      <Icons.arrowRight className='size-4 text-neutral-500' />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </GuideShell>
  );
}

const localNews = [
  {
    title: '영상 상세 통계 페이지가 추가되었습니다',
    date: '2026.07.03',
    tag: 'Dashboard',
    body: '조회수, 좋아요, 댓글, 참여율을 날짜별 그래프로 확인하고 YouTube 임베드 미리보기를 볼 수 있습니다.'
  },
  {
    title: '마케팅 랜딩 링크가 로컬 리플리카로 연결됩니다',
    date: '2026.07.03',
    tag: 'Marketing',
    body: '로그인, 무료 시작, 샘플, 약관, 지원 페이지가 외부 사이트 대신 현재 프론트엔드 라우트로 이동합니다.'
  },
  {
    title: '다크모드에서도 랜딩 페이지가 라이트 브랜드 화면을 유지합니다',
    date: '2026.07.03',
    tag: 'Theme',
    body: '대시보드 다크모드는 유지하면서 마케팅 페이지는 고정된 라이트 스코프로 분리했습니다.'
  }
];

export function NoticePage() {
  return (
    <BlogShell>
      <main className='mx-auto max-w-[960px] px-4 py-16'>
        <Badge className='bg-neutral-950 text-white hover:bg-neutral-950'>공지사항</Badge>
        <h1 className='mt-5 text-4xl font-semibold tracking-tight md:text-5xl'>
          플러 서비스 공지사항
        </h1>
        <div className='mt-10 space-y-4'>
          {localNews.map((item) => (
            <Card key={item.title} className='rounded-lg'>
              <CardHeader>
                <div className='flex flex-wrap items-center gap-2 text-sm text-neutral-500'>
                  <Badge variant='secondary'>{item.tag}</Badge>
                  <span>{item.date}</span>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </BlogShell>
  );
}

export function ReleaseNotesPage() {
  return (
    <BlogShell>
      <main className='mx-auto max-w-[960px] px-4 py-16'>
        <Badge className='bg-neutral-950 text-white hover:bg-neutral-950'>업데이트 소식</Badge>
        <h1 className='mt-5 text-4xl font-semibold tracking-tight md:text-5xl'>릴리즈 노트</h1>
        <div className='mt-10 space-y-6'>
          {localNews.map((item) => (
            <section key={item.title} className='rounded-lg border bg-white p-6'>
              <div className='text-sm font-semibold text-neutral-500'>{item.date}</div>
              <h2 className='mt-3 text-2xl font-semibold tracking-tight'>{item.title}</h2>
              <p className='mt-3 leading-7 text-neutral-600'>{item.body}</p>
            </section>
          ))}
        </div>
      </main>
    </BlogShell>
  );
}

export function SupportPage() {
  return (
    <MarketingShell>
      <section className='bg-[#f6f7f1] px-4 py-20 md:px-6'>
        <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start'>
          <div>
            <Badge className='bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>고객센터</Badge>
            <h1 className='mt-5 text-4xl leading-tight font-bold tracking-tight md:text-6xl'>
              문의와 지원 요청을 로컬 페이지에서 확인하세요
            </h1>
            <p className='mt-5 max-w-2xl text-lg leading-8 text-neutral-700'>
              실제 채팅 솔루션 연결 전까지 외부 지원센터 대신 현재 프론트엔드에서 문의 흐름을 미리
              볼 수 있습니다.
            </p>
          </div>
          <Card className='rounded-lg'>
            <CardHeader>
              <CardTitle>문의 접수</CardTitle>
              <CardDescription>support@flur.local로 전달될 문의 폼 미리보기입니다.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Input defaultValue='support@flur.local' readOnly />
              <Input placeholder='회사명 또는 쇼핑몰 URL' />
              <Input placeholder='문의 내용을 입력하세요' />
              <Button asChild className='w-full'>
                <Link href='/faq'>자주 묻는 질문 먼저 보기</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </MarketingShell>
  );
}

export function SamplePage() {
  return (
    <MarketingShell>
      <section className='bg-[#f6f7f1] px-4 py-16 md:px-6'>
        <div className='mx-auto max-w-6xl'>
          <Badge className='bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
            Sample Mall
          </Badge>
          <h1 className='mt-5 max-w-3xl text-4xl leading-tight font-bold tracking-tight md:text-6xl'>
            숏폼 위젯과 샵 플레이어가 들어간 샘플 페이지
          </h1>
          <p className='mt-5 max-w-2xl text-lg leading-8 text-neutral-700'>
            외부 샘플몰로 이동하지 않고도 현재 프론트엔드에서 상품 카드, 영상 플레이어, 구매 CTA
            배치를 확인할 수 있습니다.
          </p>
          <div className='mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]'>
            <Card className='rounded-lg'>
              <CardContent className='p-5'>
                <div className='rounded-xl bg-neutral-950 p-4 text-white'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-semibold'>Shop Player</span>
                    <Badge className='bg-white text-neutral-950 hover:bg-white'>1080p</Badge>
                  </div>
                  <div className='mt-5 aspect-video rounded-lg bg-[linear-gradient(135deg,#14b8a6,#fde68a)]' />
                  <div className='mt-5 grid gap-3 sm:grid-cols-3'>
                    {['제품 영상', '상품 링크', '통계 추적'].map((item) => (
                      <div key={item} className='rounded-md bg-white/10 p-3 text-sm'>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='rounded-lg'>
              <CardHeader>
                <CardTitle>Pure Balance Skin Serum</CardTitle>
                <CardDescription>샘플 상품 상세 페이지 구성</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='text-3xl font-bold'>₩28,000</div>
                <p className='leading-7 text-neutral-600'>
                  영상으로 사용감을 보여주고 바로 구매 CTA로 연결되는 상품 상세 화면입니다.
                </p>
                <Button className='w-full'>장바구니에 담기</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

export function MarketingAuthPage({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const isSignIn = mode === 'sign-in';

  return (
    <div className='marketing-light-scope min-h-screen bg-[#f6f7f1] text-neutral-950'>
      <header className='px-4 py-5 md:px-8'>
        <div className='mx-auto flex max-w-6xl items-center justify-between'>
          <Link href='/' className='flex items-center gap-2 font-semibold tracking-tight'>
            <BrandLogo />
          </Link>
          <Button asChild variant='ghost' className={MARKETING_GHOST_BUTTON_CLASS}>
            <Link href='/'>서비스 소개</Link>
          </Button>
        </div>
      </header>

      <main className='px-4 pb-12 md:px-8'>
        <div className='mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center'>
          <div className='hidden lg:block'>
            <Badge className='mb-5 bg-emerald-100 text-emerald-900 hover:bg-emerald-100'>
              {isSignIn ? '운영 콘솔' : '1개월 무료 이용'}
            </Badge>
            <h1 className='max-w-2xl text-5xl leading-tight font-bold tracking-tight'>
              {isSignIn
                ? '영상 라이브러리와 통계로 바로 돌아가기'
                : '플러의 모든 기능을 1개월 동안 무료로 테스트하세요'}
            </h1>
            <p className='mt-5 max-w-xl text-lg leading-8 text-neutral-700'>
              {isSignIn
                ? '플레이어 설정, 위젯 배포, 날짜별 비디오 통계, 플랜 상태를 하나의 콘솔에서 확인합니다.'
                : '신용카드 연동 전에도 영상 등록, 플레이어 설정, 위젯 구성, 통계 화면을 로컬 미리보기로 확인합니다.'}
            </p>
            <div className='mt-10 grid max-w-2xl gap-3 sm:grid-cols-3'>
              {['영상 업로드', '플레이어 설정', '통계 확인'].map((item, index) => (
                <div key={item} className='rounded-lg border bg-white p-4 shadow-sm'>
                  <div className='flex size-8 items-center justify-center rounded-md bg-neutral-950 text-sm text-white'>
                    {index + 1}
                  </div>
                  <div className='mt-5 text-sm font-semibold'>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <Card className='rounded-lg'>
            <CardHeader>
              <CardTitle>{isSignIn ? '로그인' : '무료로 시작하기'}</CardTitle>
              <CardDescription>
                현재는 로컬 미리보기 폼입니다. 실제 인증 공급자는 나중에 연결합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {!isSignIn && (
                <label htmlFor='marketing-auth-name' className='block text-sm font-medium'>
                  이름
                  <Input
                    id='marketing-auth-name'
                    className='mt-2 h-10'
                    defaultValue='플러 Operator'
                  />
                </label>
              )}
              <label htmlFor='marketing-auth-email' className='block text-sm font-medium'>
                이메일
                <Input
                  id='marketing-auth-email'
                  className='mt-2 h-10'
                  type='email'
                  defaultValue='support@flur.local'
                />
              </label>
              <label htmlFor='marketing-auth-password' className='block text-sm font-medium'>
                비밀번호
                <Input
                  id='marketing-auth-password'
                  className='mt-2 h-10'
                  type='password'
                  defaultValue='local-preview'
                />
              </label>
              <Button asChild className='w-full'>
                <Link href='/dashboard/overview'>
                  {isSignIn ? '대시보드로 이동' : '무료로 시작하기'}
                </Link>
              </Button>
              <div className='rounded-md bg-neutral-50 p-3 text-xs leading-5 text-neutral-600'>
                {isSignIn
                  ? '로그인 버튼은 현재 미리보기용이며, 클릭하면 관리자 대시보드 샘플로 이동합니다.'
                  : '체험 기간, 결제, 초과 사용량 정책은 실제 인증과 결제 공급자를 연결할 때 확정합니다.'}
              </div>
              <div className='text-center text-sm text-neutral-600'>
                {isSignIn ? (
                  <Link href='/auth/sign-up' className='underline underline-offset-4'>
                    아직 계정이 없나요?
                  </Link>
                ) : (
                  <Link href='/auth/sign-in' className='underline underline-offset-4'>
                    이미 계정이 있나요?
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
