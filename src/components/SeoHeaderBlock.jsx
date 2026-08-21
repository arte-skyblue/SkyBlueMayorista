import React, { useEffect } from 'react';
import { ChevronRight, Target, Compass, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, FAQS } from '../data/mockData';

export default function SeoHeaderBlock({ pageData, activeTab }) {
  useEffect(() => {
    if (!pageData) return;
    
    // Dynamically update document title & meta tags for SEO
    document.title = pageData.metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageData.metaDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageData.metaTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageData.metaDescription);
    }

    // Dynamic Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${COMPANY_INFO.siteUrl}${pageData.path}`);
    }

    // Inject JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://skybluecalzado.com.ar/#organization",
          "name": "SkyBlue Calzado Mayorista",
          "url": "https://skybluecalzado.com.ar",
          "logo": "https://skybluecalzado.com.ar/logos/SkyBlue.svg",
          "description": "Distribuidor Oficial B2B de Calzado y Marroquinería en Argentina. Representante de Xti, Refresh, Petite Jolie y Giulia Domna.",
          "telephone": "+54 9 11 3891-6779",
          "taxID": COMPANY_INFO.cuit,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Curapaligüe 1428 - 1er Piso",
            "addressLocality": "Tapiales",
            "addressRegion": "Buenos Aires",
            "addressCountry": "AR"
          }
        },
        {
          "@type": "WholesaleStore",
          "@id": "https://skybluecalzado.com.ar/#showroom",
          "name": "Showroom Mayorista SkyBlue Calzado",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Curapaligüe 1428 - 1er Piso",
            "addressLocality": "Tapiales",
            "addressRegion": "Buenos Aires",
            "addressCountry": "AR"
          },
          "openingHours": "Mo-Fr 08:00-17:00",
          "priceRange": "$$$$"
        },
        {
          "@type": "FAQPage",
          "@id": "https://skybluecalzado.com.ar/#faq",
          "mainEntity": FAQS.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

  }, [pageData]);

  // If on "inicio", do NOT render visible meta title/description box over the hero (keep clean hero while preserving all SEO in head)
  if (!pageData || activeTab === 'inicio') {
    return null;
  }

  return (
    <div className="bg-card text-card-foreground border-b border-border py-6 2xl:py-8 px-4 sm:px-6 2xl:px-12 shadow-xs">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto space-y-4">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs 2xl:text-sm font-semibold text-muted-foreground">
          <span className="hover:text-foreground transition-colors">SkyBlue Mayorista</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
          <span className="text-primary font-bold uppercase tracking-wider">
            {pageData.topicCluster}
          </span>
        </nav>

        {/* Semantic H1 */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black text-foreground tracking-tight leading-tight">
          {pageData.h1}
        </h1>

      </div>
    </div>
  );
}
