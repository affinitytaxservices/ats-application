// SEO Performance Tracking Configuration
// This file contains tracking events and metrics for SEO performance monitoring

export const seoTrackingEvents = {
  // User interaction events
  interactions: {
    PHONE_CLICK: 'phone_click',
    EMAIL_CLICK: 'email_click',
    FORM_SUBMISSION: 'form_submission',
    SERVICE_CLICK: 'service_click',
    CONTACT_CLICK: 'contact_click',
    CONSULTATION_REQUEST: 'consultation_request',
    DOWNLOAD_CLICK: 'download_click',
    SOCIAL_SHARE: 'social_share'
  },

  // Page view events
  pageViews: {
    HOME_VIEW: 'home_page_view',
    ABOUT_VIEW: 'about_page_view',
    INDIVIDUAL_TAX_VIEW: 'individual_tax_view',
    BUSINESS_TAX_VIEW: 'business_tax_view',
    TAX_PLANNING_VIEW: 'tax_planning_view',
    CONTACT_VIEW: 'contact_page_view',
    PRIVACY_VIEW: 'privacy_policy_view',
    TERMS_VIEW: 'terms_of_service_view'
  },

  // Conversion events
  conversions: {
    CONTACT_FORM_SUBMIT: 'contact_form_submit',
    CONSULTATION_SCHEDULE: 'consultation_schedule',
    SERVICE_INQUIRY: 'service_inquiry',
    PHONE_CALL_INITIATED: 'phone_call_initiated',
    EMAIL_SENT: 'email_sent'
  },

  // Engagement events
  engagement: {
    TIME_ON_PAGE: 'time_on_page',
    SCROLL_DEPTH: 'scroll_depth',
    VIDEO_PLAY: 'video_play',
    PDF_DOWNLOAD: 'pdf_download',
    NEWSLETTER_SIGNUP: 'newsletter_signup'
  }
};

export const seoMetrics = {
  // Traffic metrics
  traffic: {
    ORGANIC_SESSIONS: 'organic_sessions',
    DIRECT_SESSIONS: 'direct_sessions',
    REFERRAL_SESSIONS: 'referral_sessions',
    SOCIAL_SESSIONS: 'social_sessions',
    PAID_SESSIONS: 'paid_sessions'
  },

  // Ranking metrics
  rankings: {
    PRIMARY_KEYWORDS: [
      'tax preparation services',
      'tax planning services',
      'tax consultation',
      'individual tax preparation',
      'business tax preparation',
      'tax filing services',
      'IRS tax help',
      'tax advisor',
      'tax professional',
      'tax services near me'
    ],
    
    LONG_TAIL_KEYWORDS: [
      'best tax preparation services',
      'affordable tax planning',
      'certified tax preparer',
      'tax preparation for small business',
      'individual tax filing help',
      'business tax consultation',
      'tax planning strategies',
      'IRS tax resolution services',
      'tax preparation with refund advance',
      'local tax preparation services'
    ]
  },

  // Technical SEO metrics
  technical: {
    PAGE_LOAD_SPEED: 'page_load_speed',
    MOBILE_USABILITY: 'mobile_usability',
    CORE_WEB_VITALS: 'core_web_vitals',
    CRAWL_ERRORS: 'crawl_errors',
    INDEXED_PAGES: 'indexed_pages',
    SITEMAP_ERRORS: 'sitemap_errors',
    ROBOTS_TXT_ISSUES: 'robots_txt_issues'
  },

  // Content metrics
  content: {
    CONTENT_SCORE: 'content_score',
    KEYWORD_DENSITY: 'keyword_density',
    READABILITY_SCORE: 'readability_score',
    CONTENT_LENGTH: 'content_length',
    INTERNAL_LINKS: 'internal_links',
    EXTERNAL_LINKS: 'external_links',
    IMAGE_ALT_TEXT: 'image_alt_text'
  },

  // Local SEO metrics
  local: {
    GOOGLE_MY_BUSINESS_VIEWS: 'gmb_views',
    GOOGLE_MY_BUSINESS_CLICKS: 'gmb_clicks',
    GOOGLE_MY_BUSINESS_CALLS: 'gmb_calls',
    LOCAL_KEYWORD_RANKINGS: 'local_keyword_rankings',
    CITATION_CONSISTENCY: 'citation_consistency',
    REVIEW_COUNT: 'review_count',
    AVERAGE_RATING: 'average_rating'
  },

  // Backlink metrics
  backlinks: {
    TOTAL_BACKLINKS: 'total_backlinks',
    REFERRING_DOMAINS: 'referring_domains',
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    SPAM_SCORE: 'spam_score',
    ANCHOR_TEXT_DISTRIBUTION: 'anchor_text_distribution',
    TOXIC_LINKS: 'toxic_links'
  }
};

export const seoGoals = {
  // 3-month goals
  threeMonths: {
    ORGANIC_TRAFFIC_INCREASE: 25, // 25% increase
    KEYWORDS_TOP_10: 5, // 5 keywords in top 10
    PAGE_SPEED_IMPROVEMENT: 15, // 15% improvement
    BACKLINKS_ACQUIRED: 50, // 50 high-quality backlinks
    LOCAL_CITATIONS: 25, // 25 local citations
    GOOGLE_MY_BUSINESS_REVIEWS: 10 // 10 new reviews
  },

  // 6-month goals
  sixMonths: {
    ORGANIC_TRAFFIC_INCREASE: 50, // 50% increase
    KEYWORDS_TOP_5: 3, // 3 keywords in top 5
    KEYWORDS_TOP_10: 8, // 8 keywords in top 10
    PAGE_SPEED_IMPROVEMENT: 25, // 25% improvement
    BACKLINKS_ACQUIRED: 100, // 100 high-quality backlinks
    LOCAL_CITATIONS: 40, // 40 local citations
    GOOGLE_MY_BUSINESS_REVIEWS: 20, // 20 new reviews
    CONVERSION_RATE_IMPROVEMENT: 20 // 20% improvement
  },

  // 12-month goals
 twelveMonths: {
    ORGANIC_TRAFFIC_INCREASE: 100, // 100% increase
    KEYWORDS_TOP_3: 2, // 2 keywords in top 3
    KEYWORDS_TOP_5: 5, // 5 keywords in top 5
    KEYWORDS_TOP_10: 15, // 15 keywords in top 10
    DOMAIN_AUTHORITY: 30, // DA of 30+
    BACKLINKS_ACQUIRED: 200, // 200 high-quality backlinks
    LOCAL_CITATIONS: 60, // 60 local citations
    GOOGLE_MY_BUSINESS_REVIEWS: 50, // 50 new reviews
    CONVERSION_RATE_IMPROVEMENT: 35 // 35% improvement
  }
};

export const seoReportingSchedule = {
  // Daily monitoring
  daily: [
    'Website uptime',
    'Critical errors',
    'Form submissions',
    'Phone calls'
  ],

  // Weekly reporting
  weekly: [
    'Organic traffic trends',
    'Keyword ranking changes',
    'Page speed performance',
    'Google My Business insights',
    'Backlink profile changes'
  ],

  // Monthly reporting
  monthly: [
    'Comprehensive traffic analysis',
    'Keyword performance review',
    'Competitor analysis',
    'Content performance review',
    'Technical SEO audit',
    'Local SEO performance',
    'Conversion rate analysis',
    'ROI calculation'
  ],

  // Quarterly reporting
  quarterly: [
    'Goal achievement assessment',
    'Strategy review and adjustment',
    'Competitive landscape analysis',
    'Budget allocation review',
    'Team performance review',
    'Client satisfaction survey'
  ]
};

export const seoTools = {
  // Free tools
  free: {
    GOOGLE_SEARCH_CONSOLE: 'https://search.google.com/search-console',
    GOOGLE_ANALYTICS: 'https://analytics.google.com',
    GOOGLE_MY_BUSINESS: 'https://www.google.com/business/',
    GOOGLE_PAGE_SPEED: 'https://developers.google.com/speed/pagespeed/insights/',
    GOOGLE_MOBILE_FRIENDLY: 'https://search.google.com/test/mobile-friendly',
    GOOGLE_STRUCTURED_DATA: 'https://search.google.com/test/rich-results',
    BING_WEBMASTER_TOOLS: 'https://www.bing.com/webmasters',
    GT_METRIX: 'https://gtmetrix.com/',
    SCREAMING_FROG: 'https://www.screamingfrog.co.uk/seo-spider/'
  },

  // Paid tools
  paid: {
    SEMRUSH: 'https://www.semrush.com/',
    AHREFS: 'https://ahrefs.com/',
    MOZ_PRO: 'https://moz.com/products/pro',
    MAJESTIC: 'https://majestic.com/',
    SPYFU: 'https://www.spyfu.com/',
    BRIGHT_LOCAL: 'https://brightlocal.com/'
  }
};

export const seoAlerts = {
  // Critical alerts (immediate action required)
  critical: [
    'Website down',
    'Major traffic drop (>30%)',
    'Manual penalty from Google',
    'Security issues',
    'Critical crawl errors'
  ],

  // Warning alerts (action required within 24-48 hours)
  warning: [
    'Traffic drop (>15%)',
    'Ranking drop for primary keywords',
    'Increase in crawl errors',
    'Page speed degradation',
    'Mobile usability issues'
  ],

  // Informational alerts (monitor and review)
  informational: [
    'New backlinks acquired',
    'Competitor ranking changes',
    'Content performance updates',
    'Local search visibility changes',
    'Google algorithm updates'
  ]
};

export default {
  seoTrackingEvents,
  seoMetrics,
  seoGoals,
  seoReportingSchedule,
  seoTools,
  seoAlerts
};