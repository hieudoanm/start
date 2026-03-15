import Head from 'next/head';
import { FC } from 'react';

export type HeadTemplateProps = {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  siteName?: string;
  themeColor?: string;
  type?: 'website' | 'article';

  author?: string;
  lang?: string;

  noIndex?: boolean;
  noFollow?: boolean;

  twitterSite?: string;

  publishedTime?: string;
  modifiedTime?: string;

  manifest?: string;

  /* Favicons */
  favicon?: string;
  favicon16?: string;
  favicon32?: string;
  appleTouchIcon?: string;
};

export const HeadTemplate: FC<HeadTemplateProps> = ({
  title = '',
  description = '',
  keywords = '',
  url = '',
  image = '',
  siteName = '',
  themeColor = '#000000',
  type = 'website',

  author = '',
  lang = 'en',

  noIndex = false,
  noFollow = false,

  twitterSite = '',

  publishedTime = '',
  modifiedTime = '',

  manifest = '/manifest.json',

  favicon = '/favicon.ico',
  favicon16 = '/favicon-16x16.png',
  favicon32 = '/favicon-32x32.png',
  appleTouchIcon = '/apple-touch-icon.png',
}) => {
  const robots = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

  return (
    <Head>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <meta httpEquiv="content-language" content={lang} />

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Article metadata */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {/* Favicons */}
      {favicon && <link rel="icon" href={favicon} />}
      {favicon32 && (
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      )}
      {favicon16 && (
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      )}
      {appleTouchIcon && <link rel="apple-touch-icon" href={appleTouchIcon} />}

      {/* PWA */}
      {manifest && <link rel="manifest" href={manifest} />}

      {/* Theme */}
      <meta name="theme-color" content={themeColor} />

      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </Head>
  );
};
