import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { presetUno, presetIcons } from 'unocss'

import prefetch from '@astrojs/prefetch'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      presets: [presetIcons(), presetUno()],
    }),
    prefetch(),
    AstroPWA({
      base: '/',
      scope: '/',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
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
      },
    }),
  ],
})
