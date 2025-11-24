// SEO Configuration for Affinity Tax Services
// This file contains all SEO-related settings and configurations

export const seoConfig = {
  // Site-wide configuration
  siteName: 'Affinity Tax Services',
  siteUrl: 'https://affinitytaxservices.com',
  siteDescription: 'Expert tax preparation, planning, and consultation services for individuals and businesses. Trusted tax professionals since 2010.',
  siteKeywords: 'tax preparation, tax planning, tax consultation, tax services, tax advisor, tax professional, IRS help, tax filing',
  
  // Google Analytics and Search Console
  googleAnalytics: {
    measurementId: 'GA_MEASUREMENT_ID', // Replace with actual GA4 ID
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
    telephone: '+1-555-TAX-HELP',
    email: 'info@affinitytaxservices.com',
    address: {
      street: '123 Tax Street, Suite 456',
      city: 'Financial District',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    },
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
      title: 'Affinity Tax Services - Expert Tax Preparation & Planning in the US',
      description: 'Professional tax preparation, planning, and consultation services. IRS-compliant tax filing with certified CPAs and tax advisors. Maximum refund guarantee.',
      keywords: 'tax preparation services, tax planning, tax consultation, IRS tax help, certified tax preparer, tax filing services, professional tax services',
      canonical: '/',
      ogImage: '/og-home.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Affinity Tax Services',
        'description': 'Expert tax preparation and planning services for individuals and businesses',
        'url': 'https://affinitytaxservices.com',
        'telephone': '+1-555-TAX-HELP',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '123 Tax Street, Suite 456',
          'addressLocality': 'Financial District',
          'addressRegion': 'NY',
          'postalCode': '10001',
          'addressCountry': 'US'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '127'
        },
        'areaServed': 'United States',
        'serviceType': ['Tax Preparation', 'Tax Planning', 'Tax Consultation']
      }
    },
    
    about: {
      title: 'About Affinity Tax Services - Trusted Tax Professionals Since 2010',
      description: 'Learn about Affinity Tax Services, our team of certified tax professionals, and our commitment to providing expert tax preparation and planning services since 2010.',
      keywords: 'about tax services, tax professionals, certified tax preparers, tax company history, experienced tax advisors',
      canonical: '/about',
      ogImage: '/og-about.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'About Affinity Tax Services',
        'description': 'Trusted tax professionals providing expert services since 2010',
        'url': 'https://affinitytaxservices.com/about'
      }
    },
    
    individualTax: {
      title: 'Individual Tax Preparation Services - Expert Personal Tax Filing | Affinity Tax',
      description: 'Professional individual tax preparation services with maximum refund guarantee. IRS-compliant personal tax filing by certified CPAs and tax advisors.',
      keywords: 'individual tax preparation, personal tax filing, IRS tax preparation, individual tax services, personal tax help, tax refund guarantee',
      canonical: '/individual-tax',
      ogImage: '/og-individual-tax.jpg',
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
        'serviceType': 'Individual Tax Preparation',
        'offers': {
          '@type': 'Offer',
          'price': '150',
          'priceCurrency': 'USD',
          'priceRange': '$150-$500'
        }
      }
    },
    
    businessTax: {
      title: 'Business Tax Services - Expert Corporate Tax Preparation | Affinity Tax',
      description: 'Professional business tax preparation services for corporations, partnerships, LLCs, and small businesses. IRS-compliant corporate tax filing with certified CPAs.',
      keywords: 'business tax services, corporate tax preparation, business tax filing, LLC tax services, partnership tax, corporate tax returns',
      canonical: '/business-tax',
      ogImage: '/og-business-tax.jpg',
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
        'serviceType': 'Business Tax Preparation',
        'offers': {
          '@type': 'Offer',
          'price': '500',
          'priceCurrency': 'USD',
          'priceRange': '$500-$2000'
        }
      }
    },
    
    taxPlanning: {
      title: 'Tax Planning Services - Strategic Tax Strategy & Financial Planning | Affinity Tax',
      description: 'Expert tax planning services to minimize liability and maximize savings. Strategic tax strategies for individuals and businesses including retirement and estate planning.',
      keywords: 'tax planning services, strategic tax planning, tax strategy, tax minimization, tax savings, retirement tax planning, estate tax planning',
      canonical: '/tax-planning',
      ogImage: '/og-tax-planning.jpg',
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
        'serviceType': 'Tax Planning and Strategy',
        'offers': {
          '@type': 'Offer',
          'price': '500',
          'priceCurrency': 'USD',
          'priceRange': '$500-$2000'
        }
      }
    },
    
    contact: {
      title: 'Contact Affinity Tax Services - Expert Tax Help & Consultation',
      description: 'Contact Affinity Tax Services for professional tax preparation, planning, and consultation. Multiple ways to reach us - phone, email, or visit our office.',
      keywords: 'contact tax services, tax consultation, tax help, contact tax preparer, tax office, tax services contact',
      canonical: '/contact',
      ogImage: '/og-contact.jpg',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact Affinity Tax Services',
        'description': 'Contact information for Affinity Tax Services',
        'url': 'https://affinitytaxservices.com/contact',
        'mainEntity': {
          '@type': 'ProfessionalService',
          'name': 'Affinity Tax Services',
          'telephone': '+1-123-456-7890',
          'email': 'info@affinitytaxservices.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Tax Street, Suite 456',
            'addressLocality': 'Financial District',
            'addressRegion': 'NY',
            'postalCode': '10001',
            'addressCountry': 'US'
          }
        }
      }
    }
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
      address: '123 Tax Street, Suite 456, Financial District, NY 10001',
      phone: '+1-555-TAX-HELP',
      website: 'https://affinitytaxservices.com',
      hours: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM',
      services: ['Tax Preparation', 'Tax Planning', 'Tax Consultation', 'IRS Representation']
    },
    
    // Local citations and directories
    citations: [
      'Google My Business',
      'Yelp',
      'Yellow Pages',
      'Better Business Bureau',
      'Angie's List',
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