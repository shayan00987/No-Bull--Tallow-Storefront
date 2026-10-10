NO BULL TALLOW — STOREFRONT CONCEPT
===================================

Files
- index.html: responsive storefront structure
- styles.css: white, cream and warm-brown visual theme
- script.js: product catalogue, search, category filter, shopping bag interactions
- assets/product-placeholder.svg: local fallback if a remote image cannot load
- assets/IMAGE_SOURCES.txt: image source and licensing notes

PREVIEW
Open index.html in a modern browser with internet access. Product images are linked to the original
public No Bull Tallow Shopify CDN and therefore require internet access. The catalog is a curated
starter selection, not a full scrape of every SKU.

PAYMENTS — IMPORTANT
This package does NOT process payments and does NOT pretend to. The checkout button opens the official
store product page so customers can use the merchant's existing secure Shopify checkout. The bag is a
front-end convenience cart; items must be rebuilt on the official store before payment.

To enable native live checkout, the store owner must authorize integration with their Shopify store or
provide an approved payment-provider setup. This needs merchant permissions, product/variant IDs, shipping
and tax configuration, and secure server-side implementation. Never put secret API keys in browser JavaScript.

BEFORE LAUNCH
1. Obtain written permission to use the brand, product text, photos and logo.
2. Confirm every SKU, price, currency, stock status, product variant, shipping policy and product claim.
3. Choose a host (e.g. Netlify, Cloudflare Pages or a Shopify storefront). Static hosting alone cannot
   securely create payment sessions.
4. Connect an authorized checkout provider through a server-side integration or use the official Shopify
   checkout. Test orders in the provider's sandbox before enabling live payments.
5. Add the business's actual privacy, terms, returns, shipping and contact information.

The product prices shown are based on public listings checked during preparation and can change. The
official store remains the source of truth for live price, stock, shipping and checkout.


LATEST REVIEW
- Linktree screenshot shows 7 items; see CATALOG_REVIEW.txt.
- assets/ai-products contains 18 cropped AI-generated image concepts (3 angles for each of 3 product families).
- The AI images are concept imagery only, not exact product/packaging replicas. Do not present them as authentic product photos.
- The current storefront remains a prototype. It does not process payments or create real orders.

REAL PAYMENT SETUP REQUIRED
A live payment API cannot be safely enabled without the merchant's authorization, a payment-provider account, API credentials,
and a server-side integration. Do not put secret keys in client-side JavaScript. The safest option is an authorized Shopify
Storefront/Checkout integration so orders, inventory, taxes, shipping, refunds and payment status are handled by the merchant's
actual platform. A static ZIP alone cannot provide production-grade payments.
