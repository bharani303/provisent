import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOWrapper = ({
    title = 'Provisent | Professional Education Platform',
    description = 'Ranked #1 for professional technical education. Master demanding skills with our interactive and industry-leading global curriculum.',
    keywords = 'online courses, full stack development, ui/ux design, data science, professional certification, tech careers',
    type = 'website',
    url = 'https://provisent.com',
    image = 'https://provisent.com/default-share-image.jpg',
    schema = null,
    children
}) => {
    return (
        <>
            <Helmet>
                {/* Standard Meta Tags */}
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                {/* Canonical URL for avoiding duplicate content issues */}
                <link rel="canonical" href={url} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content={type} />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />

                {/* Advanced: Hreflang for international SEO */}
                <link rel="alternate" hreflang="x-default" href="https://provisent.com" />
                <link rel="alternate" hreflang="en-IN" href="https://provisent.com" />
                <link rel="alternate" hreflang="en-US" href="https://provisent.com/us" />

                {/* JSON-LD Schema Markup */}
                {schema && (
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                )}
            </Helmet>
            {children}
        </>
    );
};

export default SEOWrapper;
