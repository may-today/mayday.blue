import AstroPWA from '@vite-pwa/astro'

export const pwaConfig = AstroPWA({
  mode: 'production',
  base: '/',
  scope: '/',
  includeAssets: [
    'favicon.ico',
    'apple-touch-icon.png',
    'mask-icon.svg',
    'pwa-192x192.png',
    'pwa-512x512.png',
  ],
  registerType: 'autoUpdate',
  manifest: {
    name: 'Mayday.blue',
    short_name: 'MayBlue',
    description: 'Mayday lyrics collection',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    navigateFallback: '/404',
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
    navigateFallbackDenylist: [
      /^\/api/,
      /^\/setlist/,
      /^\/stats/,
    ],
  },
  devOptions: {
    enabled: false,
    navigateFallbackAllowlist: [/^\/404$/],
  },
})
