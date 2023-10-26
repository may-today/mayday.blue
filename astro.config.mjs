import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import { presetUno, presetIcons, presetWebFonts } from 'unocss'
import AstroPWA from '@vite-pwa/astro'
import yaml from '@rollup/plugin-yaml'
import react from '@astrojs/react'
import transformerDirectives from '@unocss/transformer-directives'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [yaml()],
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [
    react(),
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
      transformers: [
        transformerDirectives(),
      ],
      shortcuts: [{
        'bg-base': 'bg-light-50 dark:bg-dark-800',
        'bg-base-100': 'bg-light-100 dark:bg-dark-500',
        'bg-base-200': 'bg-light-600 dark:bg-dark-200',
        'bg-dialog': 'bg-white dark:bg-dark-500',
        'bg-hover': 'bg-dark/10 dark:bg-light/10',
        'fg-base': 'text-neutral-700 dark:text-neutral-300',
        'fg-lighter': 'text-neutral-400 dark:text-neutral-500',
        'fg-emphasis': 'text-dark-900 dark:text-light-900',
        'fg-primary': 'text-sky-700 dark:text-sky-300',
        'bg-primary': 'bg-sky-500/10 dark:bg-sky-300/10',
        'hv-base': 'transition-colors duration-300 cursor-pointer hover:fg-emphasis',
        'border-base': 'border-light-700 dark:border-dark-200',
        'bg-blur': 'bg-light-50/85 dark:bg-dark-800/85 backdrop-blur-xl backdrop-saturate-150',
        'fcc': 'flex items-center justify-center',
        'button': 'bg-base-100 hv-base hover:bg-base-200',
        'button-highlight': 'fg-primary bg-primary hover:bg-primary! hover:fg-primary!',
        'disabled': 'op-50 cursor-disabled',
        'badge': 'fcc text-xs rounded bg-base-200 text-dark/40 dark:text-light/50',
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
      navigateFallbackDenylist: [
        /^\/api/,
        /^\/setlist/,
        /^\/stats/,
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
