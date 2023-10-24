import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { allSongStatList } from '@/content/_parse/setlist'
import type { SongStat } from '@/types'

interface Props {
  data: SongStat
}

export default ({ data }: Props) => {
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">出现场次</h3>
          <span className="badge px-1.5 py-0.5">{data.allList.length}</span>
        </div>
      </div>
      {data.allList.map(meta => (
        <a
          href={`/setlist/${meta.setId}`}
          className={clsx([
            'flex items-center gap-2 h-12',
            'border-b border-base last:border-0',
          ])}
        >
          <span className="w-60px text-sm fg-lighter text-right">{meta.setId}</span>
          <span className="w-70px text-xs fg-lighter text-right">{meta.place}</span>
          <p className="flex-1 text-sm truncate">{meta.tour}</p>
          { meta.requested && <span className="badge px-1">点歌</span> }
        </a>
      ))}
    </div>
  )
}