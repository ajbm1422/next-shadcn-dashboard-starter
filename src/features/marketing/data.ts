import { Icons } from '@/components/icons';

export type MarketingFeature = {
  title: string;
  description: string;
  eyebrow?: string;
  icon: keyof typeof Icons;
};

export type MarketingPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroMetric: string;
  heroMetricLabel: string;
  sections: Array<{
    title: string;
    description: string;
    bullets: string[];
  }>;
  related: Array<{
    title: string;
    description: string;
    href: string;
  }>;
};

export const marketingNav = [
  { label: '숏폼 위젯', href: '/widget', badge: 'New' },
  { label: '플레이어 설정', href: '/setting' },
  { label: '다용도 플레이어', href: '/player' },
  { label: '비디오 · 커머스 통계', href: '/statistic' }
];

export const footerGroups = [
  {
    label: '서비스 소개',
    links: [
      { label: '숏폼 위젯', href: '/widget' },
      { label: '숏폼 모아보기', href: '/about/playlist' },
      { label: '플레이어 설정', href: '/setting' },
      { label: '다용도 플레이어', href: '/player' },
      { label: '비디오 · 커머스 통계', href: '/statistic' }
    ]
  },
  {
    label: '가격 안내',
    links: [
      { label: '플랜 정보', href: '/price' },
      { label: '플랜별 기능 상세', href: '/price#plan' },
      { label: '자주 묻는 질문', href: '/price#faq' }
    ]
  },
  {
    label: '이용 가이드',
    links: [
      { label: '플러 이용 가이드', href: '/guide' },
      { label: '공지사항', href: '/notice' },
      { label: '업데이트 소식', href: '/release-notes' },
      { label: '자주 묻는 질문', href: '/faq' },
      { label: '블로그', href: '/blog' }
    ]
  },
  {
    label: '고객센터',
    links: [
      { label: '문의하기', href: '/support' },
      { label: '자주 묻는 질문', href: '/faq' }
    ]
  }
];

export const landingMetrics = [
  { value: '228년', label: '누적 시청 시간', description: '짧은 영상이 만들어낸 긴 체류 시간' },
  { value: '4.7억', label: '플레이어 로드 수', description: '상품 페이지에서 확인된 노출 규모' },
  { value: '2만+', label: '업로드 영상 수', description: '라이브러리에 쌓이는 쇼핑 콘텐츠' }
];

export const landingComparison = [
  { label: '형식', shorts: '스트리밍 숏폼 플레이어', gif: '반복 GIF 이미지' },
  { label: '용량', shorts: '2MB대 경량 재생', gif: '16MB 이상으로 무거움' },
  { label: '해상도', shorts: '최대 1080p 선명도', gif: '낮은 해상도와 색 손실' },
  { label: '로딩', shorts: '페이지 진입 후 빠른 준비', gif: '상세페이지 전체 로딩 지연' },
  { label: '운영', shorts: '플레이어 설정과 통계 연결', gif: '파일 교체 중심 수동 운영' }
];

export const storeShowcases = [
  '패션 룩북',
  '뷰티 사용감',
  '푸드 조리 과정',
  '리빙 설치 전후',
  '스포츠 착용 리뷰',
  '가전 사용법',
  '반려용품 후기',
  '브랜드 캠페인'
];

export const landingTouchpoints = [
  {
    title: '메인 배너',
    description: '신상품과 캠페인을 첫 화면에서 짧은 영상으로 보여줍니다.'
  },
  {
    title: '미니 플레이어',
    description: '스크롤 흐름을 방해하지 않고 상품 설명 옆에 영상을 배치합니다.'
  },
  {
    title: '상세페이지',
    description: '소재감, 조리 과정, 착용감처럼 사진만으로 부족한 정보를 보완합니다.'
  }
];

export const landingFeatures: MarketingFeature[] = [
  {
    title: '디스플레이어',
    description: '상품 디테일을 선명한 숏폼으로 보여주는 상세페이지용 플레이어입니다.',
    eyebrow: 'GIF 대체',
    icon: 'video'
  },
  {
    title: '샵 플레이어',
    description: '영상 안에 구매 링크를 연결해 콘텐츠에서 상품 페이지까지 이어줍니다.',
    eyebrow: '전환 연결',
    icon: 'product'
  },
  {
    title: '위젯',
    description: '여러 영상을 쇼핑몰 분위기에 맞춰 플로팅, 슬라이드, 쇼케이스 형태로 배치합니다.',
    eyebrow: 'New',
    icon: 'workspace'
  }
];

export const pricingPlans = [
  {
    name: 'Lite',
    tag: '인기',
    price: '₩30,000',
    load: '월 100,000건',
    uploads: '동영상 200개 업로드 무료',
    overage: '초과 1회당 ₩2 과금',
    features: ['디스플레이어', '재생바 숨김', '자동/반복 재생', '비디오 통계']
  },
  {
    name: 'Basic',
    tag: '추천',
    price: '₩70,000',
    load: '월 250,000건',
    uploads: '동영상 300개 업로드 무료',
    overage: '초과 1회당 ₩2 과금',
    features: ['위젯 New', '디스플레이어', '샵 플레이어', '비디오 · 커머스 통계']
  },
  {
    name: 'Standard',
    tag: '전체 기능',
    price: '₩150,000',
    load: '월 800,000건',
    uploads: '동영상 600개 업로드 무료',
    overage: '초과 1회당 ₩1 과금',
    features: ['플러의 모든 기능', '위젯', '샵 플레이어', '비디오 · 커머스 통계']
  },
  {
    name: 'Enterprise',
    tag: '맞춤',
    price: '가격 문의',
    load: '별도 협의',
    uploads: '별도 협의',
    overage: '계약 조건',
    features: [
      '플러의 모든 기능 +',
      '데이터 이관',
      '플레이어 로드수 별도 문의',
      '업로드 수 별도 문의'
    ]
  }
];

export const featureMatrix = [
  ['동영상 업로드 수', '200개', '300개', '600개', '협의'],
  ['플레이어 로드 수', '100,000회', '250,000회', '800,000회', '협의'],
  ['초과 로드 단가', '2원', '2원', '1원', '계약 조건'],
  ['썸네일 플레이어 (카페24 연동 시)', '포함', '포함', '포함', '포함'],
  ['상품 이미지 영상 교체', '포함', '포함', '포함', '포함'],
  ['디스플레이어 재생바 숨김', '포함', '포함', '포함', '포함'],
  ['자동 재생', '포함', '포함', '포함', '포함'],
  ['반복 재생', '포함', '포함', '포함', '포함'],
  ['동영상 채우기', '포함', '포함', '포함', '포함'],
  ['샵 플레이어 구매 링크', '-', '포함', '포함', '포함'],
  ['샵 플레이어 공유', '-', '포함', '포함', '포함'],
  ['좋아요 버튼', '-', '포함', '포함', '포함'],
  ['위젯 디자인 템플릿', '-', '포함', '포함', '포함'],
  ['위젯 세부 UI 설정', '-', '포함', '포함', '포함'],
  ['PC / 모바일 반응형', '-', '포함', '포함', '포함'],
  ['상품 등록 / 불러오기', '-', '포함', '포함', '포함'],
  ['비디오 통계', '포함', '포함', '포함', '포함'],
  ['커머스 통계', '-', '포함', '포함', '포함'],
  ['데이터 이관', '-', '-', '-', '포함']
];

export const faqs = [
  {
    question: '플레이어 로드 수는 무엇인가요?',
    answer:
      '웹페이지가 열릴 때 영상 플레이어가 준비되는 횟수입니다. 한 번 로드된 영상이 반복 재생돼도 로드 수는 추가되지 않습니다.'
  },
  {
    question: '무료 체험이 가능한가요?',
    answer:
      '도입 전 30일 동안 핵심 기능을 충분히 테스트할 수 있는 체험 플로우를 준비할 수 있습니다.'
  },
  {
    question: '무료 체험 중 제공량을 모두 쓰면 초과금이 발생하나요?',
    answer:
      '테스트 환경에서는 결제를 연결하지 않기 때문에 초과금이 발생하지 않습니다. 운영 환경에서는 알림과 초과 사용 정책을 별도로 연결합니다.'
  },
  {
    question: '초과 사용량이 발생하면 어떻게 되나요?',
    answer:
      '선택한 플랜의 제공량을 넘어선 사용량은 플랜별 단가에 맞춰 계산되며, 엔터프라이즈는 별도 조건으로 협의합니다.'
  },
  {
    question: '결제와 플랜 변경은 어떻게 처리하나요?',
    answer:
      '운영 환경에서는 결제 수단을 연결하고, 플랜 변경은 다음 결제 주기 또는 즉시 적용 정책 중 하나로 설정할 수 있습니다.'
  }
];

export const blogCategories = ['전체', '인사이트', '고객사례', '업종별 전략', '가이드북'];

export const blogPosts = [
  {
    category: '가이드북',
    title: '2026 쇼핑몰 숏폼 전략 리포트 | 7가지 업종별 레퍼런스 공개',
    excerpt:
      '패션 · 뷰티 · 푸드 · 리빙 · 스포츠 · 소형가전 · 반려동물까지 7가지 업종별 숏폼 인사이트를 공유합니다.',
    date: 'Jun 08, 2026',
    readTime: '8분',
    featured: true
  },
  {
    category: '인사이트',
    title: '이탈은 줄이고 구매는 늘리는 모바일 상세페이지 필수 점검 리스트 4가지',
    excerpt:
      '모바일 커머스 전환율을 높이는 상세페이지 영상 최적화 핵심 4가지와 개발자 없이 적용하는 방법을 소개합니다.',
    date: 'Jun 19, 2026',
    readTime: '6분'
  },
  {
    category: '인사이트',
    title: '디자이너 브랜드의 자사몰 영상 활용 사례 2가지',
    excerpt:
      '프리미엄 패션 브랜드가 고화질 영상으로 고객 경험과 매출을 동시에 잡은 전략과 방법을 소개합니다.',
    date: 'May 28, 2026',
    readTime: '5분'
  },
  {
    category: '인사이트',
    title: '터지는 인스타 쇼핑몰 릴스, 자사몰 매출까지 연결하는 3가지 전략',
    excerpt:
      '인기 인스타 패션쇼핑몰의 숏폼 마케팅 비밀과 자사몰 매출로 연결하는 실전 전략을 소개합니다.',
    date: 'May 12, 2026',
    readTime: '7분'
  },
  {
    category: '인사이트',
    title: '개발자 없이 클릭 몇 번에 영상형 쇼핑몰 제작하는 비결',
    excerpt: '코드 복사만으로 플로팅, 슬라이드, 멀티 샵플레이어 위젯을 설치해 전환율을 높이세요.',
    date: 'Apr 20, 2026',
    readTime: '4분'
  },
  {
    category: '업종별 전략',
    title: 'K-푸드 브랜드가 숏폼으로 제품 경험을 전달하는 방법',
    excerpt: '완성 컷만으로 부족한 식감, 조리법, 패키지 구성을 숏폼으로 설명하는 전략입니다.',
    date: 'Apr 08, 2026',
    readTime: '6분'
  },
  {
    category: '업종별 전략',
    title: '리빙 브랜드의 사용 전후 숏폼 전략',
    excerpt:
      '공간 변화, 설치 과정, 사이즈감을 짧은 영상으로 보여주기 위한 페이지 구성 아이디어입니다.',
    date: 'Mar 27, 2026',
    readTime: '5분'
  },
  {
    category: '고객사례',
    title: '영상 위젯으로 신상품 탐색 흐름을 만든 고객 사례',
    excerpt:
      '메인 배너와 상세페이지 사이에 숏폼 위젯을 배치해 상품 발견 흐름을 만든 운영 사례입니다.',
    date: 'Mar 18, 2026',
    readTime: '5분'
  }
];

export const guideNav = [
  {
    group: '제품 소개',
    items: [
      { label: '서비스 개요', href: '/' },
      { label: '자주 묻는 질문', href: '/faq' },
      { label: '공지사항', href: '/blog' }
    ]
  },
  {
    group: '사용 가이드',
    items: [
      { label: '회원가입', href: '/auth/sign-up' },
      { label: '무료체험', href: '/auth/sign-up' },
      { label: '동영상 업로드', href: '/player' },
      { label: '플레이어 설정', href: '/setting' },
      { label: '위젯', href: '/widget' },
      { label: '통계', href: '/statistic' },
      { label: '플랜 구독 및 결제', href: '/price' }
    ]
  }
];

export type GuideFaq = {
  id: string;
  question: string;
  answer: string;
  steps?: string[];
  bullets?: string[];
  note?: string;
};

export const guideFaqs: GuideFaq[] = [
  {
    id: 'smartstore',
    question: '네이버 스마트 스토어에서 플러를 사용할 수 있나요?',
    answer:
      '네, 가능합니다. HTML5 Video Tag를 사용하여 플러의 숏폼 영상을 네이버 스마트 스토어에서 활용할 수 있습니다.',
    steps: [
      '플러의 코드 복사 탭에서 Video Tag 체크 박스를 선택합니다.',
      'HTML5 Video Tag 코드를 복사합니다.',
      '네이버 스마트 스토어의 HTML 직접 입력 영역에 복사한 코드를 붙여 넣습니다.'
    ],
    note: '따라하기 어려우면 플러 사이트 좌측 하단 채팅으로 문의할 수 있습니다.'
  },
  {
    id: 'upload',
    question: '플러의 동영상 업로드 가능 숫자는 누적인가요? 월별인가요?',
    answer: '동영상 업로드 가능 숫자는 누적입니다.'
  },
  {
    id: 'examples',
    question: '플러를 활용한 사이트 적용 사례들에는 뭐가 있을까요?',
    answer:
      '플러를 활용한 대표적인 사례는 동영상 배너, 랜딩페이지 대문, 상품 썸네일, 샵플레이어 재생목록입니다.',
    bullets: [
      '동영상 배너: 젝시믹스',
      '랜딩페이지 대문: 화미사',
      '상품 썸네일: 라이다',
      '샵플레이어 재생목록: JMW'
    ]
  },
  {
    id: 'payment-fail',
    question: '결제가 실패했을 때 어떻게 해야 하나요?',
    answer: '결제가 실패했을 경우 기간별 정책에 따라 재생 상태와 계정 상태가 달라집니다.',
    steps: [
      '결제 실패 후 첫 3일 동안 영상은 정상적으로 재생됩니다.',
      '결제 실패 후 4일째부터 17일째까지 영상 재생이 중지됩니다.',
      '결제 실패 후 18일이 지나면 계정이 삭제 및 탈퇴 처리됩니다.'
    ]
  },
  {
    id: 'price-policy',
    question: '플러의 가격 정책은 어떻게 되나요?',
    answer:
      '플러의 가격 정책은 고객사의 필요와 사용량에 따라 다르게 책정됩니다. 상세한 가격 정보는 가격 안내 페이지에서 확인하거나 고객 지원팀에 문의하면 맞춤형 견적을 받을 수 있습니다.'
  },
  {
    id: 'production',
    question: '플러는 숏폼 제작업체인가요?',
    answer:
      '플러는 숏폼 콘텐츠를 직접 제작하는 업체는 아니지만, 여러 숏폼 제작 업체와 제휴 협력이 되어 있어 필요한 경우 추가 지원을 제공할 수 있습니다.'
  },
  {
    id: 'multi-store',
    question: '플러는 1개의 아이디로 여러 개의 사이트를 동시에 운영할 수 있나요?',
    answer: '네, 가능합니다. 1개의 아이디로 여러 개의 사이트에서 제한 없이 사용할 수 있습니다.',
    note: '예를 들어 카페24에서 활용 중인 동일한 영상을 NHN커머스나 자체 홈페이지에서도 같은 아이디로 운영할 수 있습니다.'
  },
  {
    id: 'autoplay',
    question: '영상 자동재생 시, 오디오도 자동으로 켜지게 기본 셋팅할 수 없나요?',
    answer:
      '구글, 사파리 등의 브라우저에서는 사용자가 페이지와 상호작용하기 전까지 오디오나 비디오의 자동 재생을 허용하지 않는 경우가 많습니다. 이러한 정책 때문에 기본 설정으로 오디오 자동 켜짐 기능을 제공하지 않습니다.'
  },
  {
    id: 'load',
    question: '플레이어 로드 수가 뭔가요?',
    answer:
      '플레이어 로드 수는 웹페이지가 로딩 될 때마다 동영상 플레이어가 load, 즉 재생 준비되는 수입니다.',
    bullets: [
      '소비자가 쇼핑몰 페이지에 접속하면 플레이어가 로드되며 1로 계산됩니다.',
      '플레이어 로드 이후 동영상이 반복 재생 되는 경우는 로드 수가 올라가지 않습니다.',
      'PV가 높을수록 플레이어 로드 수도 대체적으로 높을 가능성이 있습니다.'
    ]
  },
  {
    id: 'trial',
    question: '플러를 무료로 체험해 볼 수 있나요?',
    answer: '네! 플러는 한 달 동안 스탠다드 플랜으로 무료체험을 제공합니다.',
    bullets: [
      '카페24 사용 고객은 앱 스토어에서 플러를 설치합니다.',
      '다른 플랫폼 고객은 플러 소개페이지에서 무료로 시작하기 버튼을 누릅니다.'
    ]
  },
  {
    id: 'overage',
    question: '무료체험 기간에 스탠다드 로드 수를 모두 써서 초과금액이 발생하면 어떻게 하나요?',
    answer:
      '무료 체험 기간에는 스탠다드 플랜 로드 수를 초과하여 사용하더라도 초과금액이 발생하지 않습니다.',
    note: '마음껏 써보고 결정하세요!'
  },
  {
    id: 'billing',
    question: '플러 플랜은 어떻게 결제 되나요?',
    answer:
      '끊기지 않고 플러를 사용할 수 있도록 회원가입 시 자동 결제 정보를 요청합니다. 무료체험 종료 후 Standard 플랜으로 구독이 자동 연장되며, 등록한 자동 결제 정보로 결제가 진행됩니다.',
    note: '플랜 구독 변경은 무료체험 종료 전 언제든지 가능합니다.'
  }
];

export const marketingPages: Record<string, MarketingPage> = {
  widget: {
    slug: 'widget',
    eyebrow: '숏폼 위젯 New',
    title: '쇼핑몰 매출 상승을 위한 숏폼 위젯',
    description:
      '개발자 없이 1분 만에 설치하는 숏폼 위젯! 우리 쇼핑몰에 딱 맞는 디자인 템플릿을 선택하고 숏폼 영상을 다양하게 배치해 보세요.',
    primaryCta: '위젯 사용해보기',
    secondaryCta: '적용 예시 보기',
    heroMetric: '113%',
    heroMetricLabel: '좋아요·공유 클릭 증가',
    sections: [
      {
        title: '우리 쇼핑몰에 맞는 위젯 디자인',
        description:
          '브랜드 무드에 맞춰 플로팅, 슬라이드, 멀티 상품형 레이아웃을 고를 수 있습니다.',
        bullets: [
          '화면 고정 플로팅 위젯',
          '여러 영상을 넘겨 보는 슬라이드 위젯',
          '영상과 상품 목록을 함께 보여주는 멀티 위젯'
        ]
      },
      {
        title: '모바일에서도 매끄러운 쇼핑 경험',
        description: 'PC와 모바일 화면에 맞춰 영상 크기와 상품 카드 구성이 자연스럽게 바뀝니다.',
        bullets: ['반응형 레이아웃', '상품 배너 스타일 조정', '모서리와 색상 세부 설정']
      },
      {
        title: '설정은 세 단계면 충분',
        description: '디자인을 고르고, 영상과 상품을 연결한 뒤, 생성된 코드를 붙여 넣으면 됩니다.',
        bullets: ['디자인 선택', '영상과 상품 선택', '코드 복사 후 적용']
      }
    ],
    related: [
      {
        title: '플레이어 설정',
        description: '자동 재생과 크기 설정을 빠르게 조정합니다.',
        href: '/setting'
      },
      {
        title: '가격 안내',
        description: '로드 수와 업로드량에 맞는 플랜을 확인합니다.',
        href: '/price'
      }
    ]
  },
  setting: {
    slug: 'setting',
    eyebrow: '플레이어 설정',
    title: '플레이어 설정',
    description: '쉽고 간편한 숏폼 솔루션으로 클릭 한 번에 필요한 기능을 설정하세요',
    primaryCta: '설정 시작하기',
    secondaryCta: '샘플 보기',
    heroMetric: '0.8초',
    heroMetricLabel: '가벼운 플레이어 로딩',
    sections: [
      {
        title: '재생 컨트롤 바 표시 제어',
        description:
          '불필요한 정보를 줄이고 콘텐츠 자체에 집중시키는 상세페이지를 만들 수 있습니다.',
        bullets: ['재생바 표시/숨김', '미니멀 플레이어', '상세페이지 친화 UI']
      },
      {
        title: '자동·반복 재생',
        description: '방문자가 페이지에 들어오면 영상이 자연스럽게 재생되고 끊김 없이 반복됩니다.',
        bullets: ['자동 재생', '반복 재생', '무음 시작 옵션']
      },
      {
        title: '영상 크기 조절',
        description: '가로 크기만 입력해도 원본 비율을 유지한 채 상세페이지에 맞게 적용됩니다.',
        bullets: ['최대 1080p', '비율 유지', '페이지별 크기 설정']
      }
    ],
    related: [
      {
        title: '다용도 플레이어',
        description: '하나의 영상을 여러 페이지에서 활용합니다.',
        href: '/player'
      },
      { title: '통계', description: '노출과 전환 데이터를 확인합니다.', href: '/statistic' }
    ]
  },
  player: {
    slug: 'player',
    eyebrow: '다용도 플레이어',
    title: '다용도 플레이어',
    description: '동영상 하나를 두 가지 플레이어로, 다양한 페이지에서 활용 가능한 숏폼 솔루션',
    primaryCta: '플레이어 보기',
    secondaryCta: '활용 사례 보기',
    heroMetric: '2-in-1',
    heroMetricLabel: '전시와 구매 연결',
    sections: [
      {
        title: 'Displayer',
        description:
          '상품의 소재, 사용감, 조리 과정, 전후 효과처럼 사진으로 부족한 장면을 보여줍니다.',
        bullets: ['상품 디테일', '사용법 설명', '브랜드 무드 영상']
      },
      {
        title: 'Shop player',
        description:
          '영상 위에 상품 구매 배너를 연결해 시청 흐름에서 상품 페이지로 자연스럽게 이동시킵니다.',
        bullets: ['구매 링크 연결', '공유 흐름 지원', '상품 반응 확인']
      },
      {
        title: '플레이어 링크 복사',
        description:
          '생성된 플레이어 링크와 삽입 코드를 복사해 원하는 페이지에 빠르게 붙여 넣습니다.',
        bullets: ['링크 복사', '코드 삽입', '여러 페이지 재사용']
      }
    ],
    related: [
      { title: '플레이어 설정', description: '재생 옵션을 상세하게 조정합니다.', href: '/setting' },
      { title: '숏폼 위젯', description: '여러 영상을 한 번에 배치합니다.', href: '/widget' }
    ]
  },
  statistic: {
    slug: 'statistic',
    eyebrow: '비디오 · 커머스 통계',
    title: '비디오 · 커머스 통계',
    description:
      '커머스에 꼭 필요한 기능과 데이터를 제공하는 숏폼 플랫폼. 동영상, 날짜별 통계와 통계별 TOP 10 동영상 순위까지 확인하세요!',
    primaryCta: '통계 살펴보기',
    secondaryCta: '샘플 리포트 보기',
    heroMetric: 'TOP 10',
    heroMetricLabel: '성과 영상 자동 정렬',
    sections: [
      {
        title: '플레이어 로드 수 통계',
        description: '어떤 페이지에서 어떤 영상이 얼마나 자주 준비됐는지 확인합니다.',
        bullets: ['페이지별 로드', '플레이어별 비교', '기간별 추이']
      },
      {
        title: '상세페이지 전환율 통계',
        description: '샵 플레이어 구매 배너 클릭과 상세페이지 이동 흐름을 추적합니다.',
        bullets: ['배너 클릭', '전환율', '상품별 성과']
      },
      {
        title: '시청자 참여와 업로드 통계',
        description: '좋아요와 공유 반응, 날짜별 업로드 수와 잔여 업로드량까지 관리합니다.',
        bullets: ['좋아요·공유', '날짜별 업로드', '잔여량 확인']
      }
    ],
    related: [
      {
        title: '다용도 플레이어',
        description: '성과가 좋은 영상을 더 많은 페이지에 활용합니다.',
        href: '/player'
      },
      { title: '가격 안내', description: '통계 기능을 포함한 플랜을 비교합니다.', href: '/price' }
    ]
  }
};
