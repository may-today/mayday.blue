import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { presetUno, presetIcons } from 'unocss'

import prefetch from '@astrojs/prefetch'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    UnoCSS({
      presets: [presetIcons(), presetUno()],
    }),
    prefetch(),
    AstroPWA({
      mode: 'development',
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
        name: '五迷歌词本',
        short_name: '五迷歌词本',
        description: '收录五月天的歌曲歌词',
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
        workbox: {
          navigateFallback: '/404',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        },
        devOptions: {
          enabled: true,
          navigateFallbackAllowlist: [/^\/404$/],
        },
      },
    }),
  ],
})
