import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { COMPANY_INFO, FAQS, ASSET_SEO_METADATA } from '../data/mockData';

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
      canonical.setAttribute('href', `${COMPANY_INFO.siteUrl || 'https://skybluecalzado.com.ar'}${pageData.path}`);
    }

    // Inject JSON-LD Structured Data with Images & Videos
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
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://skybluecalzado.com.ar/images/banners/hero-xti.jpg",
          "name": "Campaña Oficial Xti María Becerra Calzado Mayorista",
          "description": "Calzado urbano europeo Xti con María Becerra para venta mayorista por curvas en Argentina."
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://skybluecalzado.com.ar/images/banners/hero-refresh.jpg",
          "name": "Campaña Refresh Mar Lucas Sneakers Mayoristas",
          "description": "Zapatillas y sandalias Refresh con margen de reventa x2.2 para zapaterías."
        },
        {
          "@type": "ImageObject",
          "contentUrl": "https://skybluecalzado.com.ar/images/banners/hero-petite-jolie.jpg",
          "name": "Petite Jolie Bolsos y Calzado J-Lastic Impermeable",
          "description": "Bolsos y carteras Petite Jolie en J-Lastic impermeable con fragancia dulce para reventa."
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

  }, [pageData]);

  if (!pageData || activeTab === 'inicio') {
    return null;
  }

  return (
    <div className="bg-card text-card-foreground border-b border-border py-6 2xl:py-8 px-4 sm:px-6 2xl:px-12 shadow-xs">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs 2xl:text-sm font-semibold text-muted-foreground">
          <span className="hover:text-foreground transition-colors">SkyBlue Mayorista</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
          <span className="text-primary font-bold uppercase tracking-wider">
            {pageData.topicCluster}
          </span>
        </nav>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black text-foreground tracking-tight leading-tight">
          {pageData.h1}
        </h1>
      </div>
    </div>
  );
}
