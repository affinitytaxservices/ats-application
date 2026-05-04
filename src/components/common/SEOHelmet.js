import { useEffect } from 'react';

function setTag(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attributes.tagName || 'meta');
    Object.keys(attributes).forEach((k) => {
      if (k !== 'tagName') el.setAttribute(k, attributes[k]);
    });
    el.setAttribute('data-seo-helmet', 'true');
    document.head.appendChild(el);
  } else {
    Object.keys(attributes).forEach((k) => {
      if (k !== 'tagName') el.setAttribute(k, attributes[k]);
    });
  }
  return el;
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('data-seo-helmet', 'true');
  link.setAttribute('href', href);
  return link;
}

function setStructuredData(json) {
  let script = document.head.querySelector('script[type="application/ld+json"][data-seo-helmet="true"]');
  if (!script) {
    script = document.head.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.setAttribute('data-seo-helmet', 'true');
  }
  script.textContent = JSON.stringify(json);
  return script;
}

export default function SEOHelmet({
  title,
  description,
  keywords,
  canonical,
  image,
  structuredData,
  robots,
}) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalHref = canonical
      ? (canonical.startsWith('http') ? canonical : `${origin}${canonical}`)
      : window.location.href;
    const imageHref = image
      ? (image.startsWith('http') ? image : `${origin}${image.startsWith('/') ? image : `/${image}`}`)
      : null;
    const robotsValue = robots || 'index, follow';

    if (title) {
      document.title = title;
      setTag('meta[name="title"]', { tagName: 'meta', name: 'title', content: title });
      setTag('meta[property="og:title"]', { tagName: 'meta', property: 'og:title', content: title });
      setTag('meta[name="twitter:title"]', { tagName: 'meta', name: 'twitter:title', content: title });
    }

    if (description) {
      setTag('meta[name="description"]', { tagName: 'meta', name: 'description', content: description });
      setTag('meta[property="og:description"]', { tagName: 'meta', property: 'og:description', content: description });
      setTag('meta[name="twitter:description"]', { tagName: 'meta', name: 'twitter:description', content: description });
    }

    if (keywords) {
      setTag('meta[name="keywords"]', { tagName: 'meta', name: 'keywords', content: keywords });
    }

    if (imageHref) {
      setTag('meta[property="og:image"]', { tagName: 'meta', property: 'og:image', content: imageHref });
      setTag('meta[name="twitter:image"]', { tagName: 'meta', name: 'twitter:image', content: imageHref });
      setTag('meta[name="twitter:card"]', { tagName: 'meta', name: 'twitter:card', content: 'summary_large_image' });
    }

    setCanonical(canonicalHref);
    setTag('meta[property="og:url"]', { tagName: 'meta', property: 'og:url', content: canonicalHref });

    if (structuredData) {
      setStructuredData(structuredData);
    }

    setTag('meta[name="robots"]', { tagName: 'meta', name: 'robots', content: robotsValue });
    setTag('meta[name="googlebot"]', { tagName: 'meta', name: 'googlebot', content: robotsValue });

    return undefined;
  }, [title, description, keywords, canonical, image, structuredData, robots]);

  return null;
}
