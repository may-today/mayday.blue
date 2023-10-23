import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { allSongStatList } from '@/content/_parse/setlist'

export default () => {
  const [sortBy, setSortBy] = useState<'all' | 'requested'>('all')
  const sortedList = useMemo(() => {
    return allSongStatList.sort((a, b) => {
      if (sortBy === 'all') {
        return b.allList.length - a.allList.length
      } else {
        return b.requestedList.length - a.requestedList.length
      }
    })
  }, [sortBy])

  return (
    <>
      <div
        className={clsx([
          'flex items-center gap-2 h-12',
          'border-b border-base last:border-0',
        ])}
      >
        <p className="flex-1 text-sm"></p>
        <div className="w-40px text-xs fg-lighter text-center">
          <span
            className={clsx([
              'p-1 cursor-pointer',
              sortBy === 'requested' ? 'font-semibold fg-base' : 'fg-lighter',
            ])}
            onClick={() => setSortBy('requested')}
          >
            点歌
          </span>
        </div>
        <div className="w-40px text-xs fg-lighter text-center">
        <span
            className={clsx([
              'p-1 cursor-pointer',
              sortBy === 'all' ? 'font-semibold fg-base' : 'fg-lighter',
            ])}
            onClick={() => setSortBy('all')}
          >
            全部
          </span>
        </div>
      </div>
      {sortedList.map(item => (
        <a
          key={item.slug}
          href={`/stats/${item.slug}`}
          className={clsx([
            'flex items-center gap-2 h-12',
            'border-b border-base last:border-0',
          ])}
        >
          <p className="flex-1 text-sm">{item.title}</p>
          <span className="w-40px text-sm fg-lighter text-center">{item.requestedList.length}</span>
          <span className="w-40px text-sm fg-lighter text-center">{item.allList.length}</span>
        </a>
      ))}
    </>
  )
}