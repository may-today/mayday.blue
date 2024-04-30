import AstroPWA from '@vite-pwa/astro'

export const pwaConfig = AstroPWA({
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
    name: '凤凰传奇',
    short_name: '凤凰传奇',
    description: '凤凰传奇歌词本',
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
    navigateFallback: null,
    globPatterns: ['**/*.{css,html,md}', 'index.html'],
    globIgnores: ['api/**', 'stats/**', 'setlist/**'],
    navigateFallbackDenylist: [
      /\/api/,
      /\/stats/,
      /\/setlist/,
    ],
  },
})
