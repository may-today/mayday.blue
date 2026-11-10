import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { SiteHeader } from '../components/site-header.tsx'
import { getViewer } from '../lib/session.functions.ts'
import type { Viewer } from '../lib/types.ts'
import appCss from '../styles.css?url'

export interface RouterContext {
  viewer: Viewer | null
}

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="zh-CN">
    <head>
      <HeadContent />
    </head>
    <body className="font-sans">
      <SiteHeader />
      {children}
      <Scripts />
    </body>
  </html>
)

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => ({ viewer: await getViewer() }),
  head: () => ({
    links: [
      { href: appCss, rel: 'stylesheet' },
      { href: '/favicon.ico', rel: 'icon' },
    ],
    meta: [
      { charSet: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      { title: 'Mayday Blue' },
    ],
  }),
  shellComponent: RootDocument,
})
