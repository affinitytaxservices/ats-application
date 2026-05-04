// SEO Configuration for Affinity Tax Services
// This file contains all SEO-related settings and configurations

export const seoConfig = {
  // Site-wide configuration
  siteName: 'Affinity Tax Services',
  siteUrl: 'https://www.affinitytaxservices.com',
  siteDescription: 'Expert tax preparation, planning, and consultation services for individuals and businesses. Trusted tax professionals since 2010.',
  siteKeywords: 'tax preparation, tax planning, tax consultation, tax services, tax advisor, tax professional, IRS help, tax filing',
  
  // Google Analytics and Search Console
  googleAnalytics: {
    measurementId: 'G-CNWW81F5YM', // Replace with actual GA4 ID
    gtmId: 'GTM-XXXXXXX' // Replace with actual GTM ID
  },
  
  // Social Media
  socialMedia: {
    facebook: 'https://facebook.com/affinitytaxservices',
    twitter: 'https://twitter.com/affinitytax',
    linkedin: 'https://linkedin.com/company/affinity-tax-services',
    instagram: 'https://instagram.com/affinitytaxservices'
  },
  
  // Business Information
  businessInfo: {
    name: 'Affinity Tax Services',
    telephone: '+91-834-115-4481',
    email: 'info@affinitytaxservices.com',
    businessHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '10:00-14:00',
      sunday: 'Closed'
    }
  },
  
  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'Affinity Tax Services | Expert Tax Preparation & Strategic Planning',
      description: 'Maximize your refund with Affinity Tax Services. Certified CPAs providing expert personal and business tax preparation, strategic planning, and IRS audit support.',
      keywords: 'AffinityTaxServices, Affinity Tax, tax preparation, tax planning, CPA, IRS audit support, business tax services, individual tax return, tax consultant, maximize refund, electronic filing',
      canonical: '/',
      image: '/images/tax-hero.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Affinity Tax Services',
        'alternateName': 'AffinityTaxServices',
        'description': 'Maximize your refund with Affinity Tax Services. Certified CPAs providing expert personal and business tax preparation, strategic planning, and IRS audit support.',
        'url': 'https://www.affinitytaxservices.com',
        'logo': 'https://www.affinitytaxservices.com/logo.svg',
        'sameAs': [
          'https://facebook.com/affinitytaxservices',
          'https://twitter.com/affinitytax',
          'https://linkedin.com/company/affinity-tax-services',
          'https://instagram.com/affinitytaxservices'
        ],
        'areaServed': 'United States',
        'serviceType': ['Tax Preparation', 'Tax Planning', 'Tax Consultation', 'IRS Audit Support'],
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'contactType': 'customer service',
            'email': 'info@affinitytaxservices.com'
          }
        ]
      }
    },
    
    about: {
      title: 'About Affinity Tax Services | Trusted CPAs & Tax Advisors',
      description: 'Meet our team of certified tax professionals dedicated to your financial success. Over 10 years of experience in tax preparation and strategic planning.',
      keywords: 'about affinity tax services, certified public accountants, tax advisors, tax company history, experienced tax professionals, financial success',
      canonical: '/about',
      image: '/logo-square.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'About Affinity Tax Services',
        'description': 'Trusted tax professionals providing expert services since 2010',
        'url': 'https://www.affinitytaxservices.com/about'
      }
    },

    services: {
      title: 'Our Services | Affinity Tax Services',
      description: 'Explore our comprehensive tax services including individual tax preparation, business tax solutions, and strategic tax planning.',
      keywords: 'tax services, individual tax, business tax, tax planning, accounting services, tax preparation',
      canonical: '/services',
      image: '/images/tax-features.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Tax Services',
        'description': 'Comprehensive tax services for individuals and businesses',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services'
        }
      }
    },
    
    individualTax: {
      title: 'Individual Tax Preparation Services - Expert Personal Tax Filing | Affinity Tax',
      description: 'Professional individual tax preparation services with maximum refund guarantee. IRS-compliant personal tax filing by certified CPAs and tax advisors.',
      keywords: 'individual tax preparation, personal tax filing, IRS tax preparation, individual tax services, personal tax help, tax refund guarantee',
      canonical: '/individual-tax',
      image: '/images/tax-preparation.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Individual Tax Preparation',
        'description': 'Professional individual tax preparation with maximum refund guarantee',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services'
        },
        'areaServed': 'United States',
        'serviceType': 'Individual Tax Preparation'
      }
    },
    
    businessTax: {
      title: 'Business Tax Services - Expert Corporate Tax Preparation | Affinity Tax',
      description: 'Professional business tax preparation services for corporations, partnerships, LLCs, and small businesses. IRS-compliant corporate tax filing with certified CPAs.',
      keywords: 'business tax services, corporate tax preparation, business tax filing, LLC tax services, partnership tax, corporate tax returns',
      canonical: '/business-tax',
      image: '/images/tax-planning.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Business Tax Services',
        'description': 'Professional business tax preparation for corporations, partnerships, and LLCs',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services'
        },
        'areaServed': 'United States',
        'serviceType': 'Business Tax Preparation'
      }
    },
    
    taxPlanning: {
      title: 'Tax Planning Services - Strategic Tax Strategy & Financial Planning | Affinity Tax',
      description: 'Expert tax planning services to minimize liability and maximize savings. Strategic tax strategies for individuals and businesses including retirement and estate planning.',
      keywords: 'tax planning services, strategic tax planning, tax strategy, tax minimization, tax savings, retirement tax planning, estate tax planning',
      canonical: '/tax-planning',
      image: '/images/tax-planning.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Tax Planning Services',
        'description': 'Strategic tax planning to minimize liability and maximize savings',
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services'
        },
        'areaServed': 'United States',
        'serviceType': 'Tax Planning and Strategy'
      }
    },
    
    taxInformation: {
      title: 'Tax Information & Resources | Affinity Tax Services',
      description: 'Access essential tax guides, important dates, and educational resources. Stay informed about individual and business tax requirements.',
      keywords: 'tax information, tax resources, tax guides, tax deadlines, tax education, IRS forms, tax help center',
      canonical: '/tax-information',
      image: '/images/digital-filing.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Tax Information & Resources',
        'description': 'Comprehensive tax information and resources center'
      }
    },
    
    contact: {
      title: 'Contact Affinity Tax Services - Expert Tax Help & Consultation',
      description: 'Contact Affinity Tax Services for professional tax preparation, planning, and consultation. Multiple ways to reach us - phone, email, or visit our office.',
      keywords: 'contact tax services, tax consultation, tax help, contact tax preparer, tax office, tax services contact',
      canonical: '/contact',
      image: '/logo-horizontal.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact Affinity Tax Services',
        'description': 'Contact information for Affinity Tax Services',
        'url': 'https://www.affinitytaxservices.com/contact',
        'mainEntity': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services',
          'email': 'info@affinitytaxservices.com'
        }
      }
    },

    privacyPolicy: {
      title: 'Privacy Policy | Affinity Tax Services',
      description: 'Read our Privacy Policy to understand how Affinity Tax Services collects, uses, and protects your personal information.',
      keywords: 'privacy policy, data protection, personal information, tax data security, client confidentiality',
      canonical: '/privacy-policy',
      image: '/logo.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Privacy Policy',
        'description': 'Privacy Policy of Affinity Tax Services'
      }
    },

    terms: {
      title: 'Terms & Conditions | Affinity Tax Services',
      description: 'Review the Terms and Conditions for using Affinity Tax Services website and services.',
      keywords: 'terms and conditions, terms of service, user agreement, legal disclaimer',
      canonical: '/terms-and-conditions',
      image: '/logo.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Terms & Conditions',
        'description': 'Terms and Conditions of Affinity Tax Services'
      }
    },

    faqs: {
      title: 'Frequently Asked Questions | Affinity Tax Services',
      description: 'Find answers to common questions about tax preparation, filing deadlines, documents needed, and our services.',
      keywords: 'tax faqs, tax questions, tax preparation help, filing questions, refund status help, tax documents needed',
      canonical: '/faqs',
      image: '/images/tax-features.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What documents do I need for my tax return?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Generally, you will need W-2s from all employers, 1099 forms (for interest, dividends, retirement, or contract work), proof of identification, and Social Security numbers for you and your dependents. If you own a business or have other income sources, additional documentation will be required.'
            }
          },
          {
            '@type': 'Question',
            'name': 'When is the tax filing deadline?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For most individuals, the federal tax filing deadline is April 15th. If April 15th falls on a weekend or holiday, the deadline is moved to the next business day. Extensions can be filed to push the deadline to October 15th, though any taxes owed are still due by the April deadline.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How long does it take to get my refund?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For e-filed returns with direct deposit, most refunds are issued within 21 days. Paper returns can take 6-8 weeks or longer. You can track your refund status using our Refund Status tool or the IRS Where\'s My Refund? tool.'
            }
          }
        ]
      }
    },

    refundStatus: {
      title: 'Check Tax Refund Status | Affinity Tax Services',
      description: 'Track your federal and state tax refund status. Direct links to IRS and state revenue department refund tools.',
      keywords: 'tax refund status, where is my refund, IRS refund, state tax refund, check refund status, tax return status',
      canonical: '/refund-status',
      image: '/images/digital-filing.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Tax Refund Status Tools',
        'description': 'Links to federal and state tax refund tracking tools'
      }
    },

    login: {
      title: 'Client Login | Affinity Tax Services',
      description: 'Secure client portal login for Affinity Tax Services. Access your tax documents and status updates.',
      keywords: 'client login, tax portal, affinity tax login, secure tax documents',
      canonical: '/login',
      image: '/logo.svg',
      robots: 'noindex, nofollow',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Client Login',
        'description': 'Secure client portal login'
      }
    },

    register: {
      title: 'Create Account | Affinity Tax Services',
      description: 'Register for an Affinity Tax Services account to manage your tax documents and appointments.',
      keywords: 'register, create account, tax portal registration',
      canonical: '/register',
      image: '/logo.svg',
      robots: 'noindex, nofollow',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Create Account',
        'description': 'Register for an account'
      }
    },

    forgotPassword: {
      title: 'Reset Password | Affinity Tax Services',
      description: 'Reset your Affinity Tax Services account password.',
      keywords: 'reset password, forgot password, tax portal help',
      canonical: '/forgot-password',
      image: '/logo.svg',
      robots: 'noindex, nofollow',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Reset Password',
        'description': 'Reset your account password'
      }
    },

    team: {
      title: 'Our Team | Affinity Tax Services',
      description: 'Meet the Affinity Tax Services team of tax professionals dedicated to accurate filing, strategic planning, and responsive support.',
      keywords: 'tax professionals, CPA team, tax advisors, affinity tax team, tax experts',
      canonical: '/team',
      image: '/logo-square.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Our Team',
        'description': 'Meet the Affinity Tax Services team'
      }
    },

    careers: {
      title: 'Careers | Affinity Tax Services',
      description: 'Explore careers at Affinity Tax Services. Join a team focused on client success, professional growth, and modern tax workflows.',
      keywords: 'tax careers, accounting jobs, cpa jobs, tax preparer jobs, affinity tax careers',
      canonical: '/careers',
      image: '/logo-square.svg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Careers',
        'description': 'Career opportunities at Affinity Tax Services'
      }
    },

  },

  // Performance and technical SEO settings
  performance: {
    // Core Web Vitals targets
    coreWebVitals: {
      largestContentfulPaint: 2500, // Target: < 2.5s
      firstInputDelay: 100, // Target: < 100ms
      cumulativeLayoutShift: 0.1, // Target: < 0.1
    },
    
    // Mobile optimization
    mobileFirst: true,
    responsiveDesign: true,
    
    // Page speed optimization
    optimizeImages: true,
    minifyResources: true,
    enableCompression: true,
    leverageBrowserCaching: true,
    
    // Security
    enableHTTPS: true,
    securityHeaders: true
  },
  
  // Local SEO settings
  localSEO: {
    googleMyBusiness: {
      businessName: 'Affinity Tax Services',
      category: 'Tax Preparation Service',
      address: 'need to add address',
      phone: '8341154481',
      website: 'https://www.affinitytaxservices.com',
      hours: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM',
      services: ['Tax Preparation', 'Tax Planning', 'Tax Consultation', 'IRS Representation']
    },
    
    // Local citations and directories
    citations: [
      'Google My Business',
      'Yelp',
      'Yellow Pages',
      'Better Business Bureau',
      "Angie's List",
      'Thumbtack'
    ]
  },
  
  // Content strategy
  contentStrategy: {
    // Blog topics for tax-related content
    blogTopics: [
      'Tax Preparation Tips',
      'Tax Planning Strategies',
      'IRS Updates and News',
      'Business Tax Deductions',
      'Individual Tax Credits',
      'Tax Season Preparation',
      'Audit Prevention Tips',
      'Tax Software Reviews',
      'State Tax Information',
      'Tax Law Changes'
    ],
    
    // Content calendar frequency
    contentFrequency: {
      blogPosts: 'weekly',
      taxTips: 'daily',
      seasonalContent: 'monthly',
      videoContent: 'bi-weekly'
    }
  },
  
  // Analytics and tracking
  analytics: {
    // Google Analytics events to track
    events: [
      'form_submissions',
      'phone_clicks',
      'email_clicks',
      'service_page_views',
      'contact_page_views',
      'consultation_requests',
      'download_clicks'
    ],
    
    // Conversion goals
    goals: [
      'Contact form submission',
      'Phone call initiated',
      'Consultation scheduled',
      'Service inquiry submitted'
    ],
    
    // KPIs to monitor
    kpis: [
      'Organic traffic growth',
      'Keyword rankings',
      'Conversion rate',
      'Bounce rate',
      'Page load speed',
      'Mobile usability score',
      'Local search visibility'
    ]
  }
};

export default seoConfig;
