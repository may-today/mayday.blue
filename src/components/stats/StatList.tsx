import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { allSongStatList } from '@/content/_parse/setlist'

export default () => {
  const [sortBy, setSortBy] = useState<'all' | 'requested' | 'ending' | 'name'>('all')
  const sortedList = useMemo(() => {
    return allSongStatList.sort((a, b) => {
      if (sortBy === 'all') {
        return b.allCount - a.allCount
      } else if (sortBy === 'requested') {
        return b.requestedCount - a.requestedCount
      } else if (sortBy === 'ending') {
        return b.endingCount - a.endingCount
      } else {
        return a.slug.localeCompare(b.slug)
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
        <p className="flex-1 text-sm">
          <span
            className={clsx([
              'p-1 cursor-pointer',
              sortBy === 'name' ? 'font-semibold fg-base' : 'fg-lighter',
            ])}
            onClick={() => setSortBy('name')}
          >
            歌曲
          </span>
        </p>
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
              sortBy === 'ending' ? 'font-semibold fg-base' : 'fg-lighter',
            ])}
            onClick={() => setSortBy('ending')}
          >
            Ending
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
          <span className="w-40px text-sm fg-lighter text-center">{item.requestedCount}</span>
          <span className="w-40px text-sm fg-lighter text-center">{item.endingCount}</span>
          <span className="w-40px text-sm fg-lighter text-center">{item.allCount}</span>
        </a>
      ))}
    </>
  )
}