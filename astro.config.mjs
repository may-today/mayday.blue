import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import { presetUno, presetIcons } from 'unocss'
import yaml from '@rollup/plugin-yaml'
import react from '@astrojs/react'
import transformerDirectives from '@unocss/transformer-directives'
import { pwaConfig } from './pwa'

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
        'fg-primary': 'text-orange-800 dark:text-orange-300',
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
    pwaConfig,
  ],
})
