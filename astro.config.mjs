import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import { presetUno, presetIcons, presetWebFonts } from 'unocss'
import AstroPWA from '@vite-pwa/astro'
import yaml from '@rollup/plugin-yaml'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [yaml()],
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    UnoCSS({
      presets: [
        presetUno({
          dark: 'media',
        }),
        // presetWebFonts({
        //   provider: 'none',
        //   fonts: {
        //     news: 'Newsreader',
        //   }
        // }),
        presetIcons(),
      ],
      shortcuts: [{
        'bg-base': 'bg-light-50 dark:bg-dark-800',
        'bg-base-100': 'bg-light-100 dark:bg-dark-500',
        'bg-base-200': 'bg-light-300 dark:bg-dark-200',
        'fg-base': 'text-neutral-700 dark:text-neutral-300',
        'fg-emphasis': 'text-dark-900 dark:text-light-900',
        'fg-highlight': 'text-sky-700 dark:text-sky-300',
        'hv-base': 'transition-colors duration-300 cursor-pointer hover:fg-emphasis',
        'border-base': 'border-light-700 dark:border-dark-200',
        'bg-blur': 'bg-light-50/85 dark:bg-dark-800/85 backdrop-blur-xl backdrop-saturate-150',
        'button': 'bg-base-100 hv-base hover:bg-base-200',
      }],
    }),
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
        short_name: '歌词本',
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
