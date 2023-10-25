import { useState, useMemo } from 'react'
import clsx from 'clsx'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import type { SongStat } from '@/types'

interface Props {
  data: SongStat
}

export default ({ data }: Props) => {
  const [filter, setFilter] = useState<'all' | 'requested'>('all')
  const filterList = useMemo(() => {
    if (filter === 'all') {
      return data.allList
    } else {
      return data.requestedList
    }
  }, [filter])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">出现场次</h3>
          <span className="badge px-1.5 py-0.5">{filterList.length}</span>
        </div>
        <ToggleGroup.Root
          className="fcc rounded-lg border border-base p-1"
          type="single"
          aria-label="select filter"
          value={filter}
          onValueChange={(value: 'all' | 'requested') => setFilter(value)}
        >
          <ToggleGroup.Item value="requested" aria-label="filter requested">
            点歌
          </ToggleGroup.Item>
          <ToggleGroup.Item value="all" aria-label="filter all">
            全部
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      {filterList.map(meta => (
        <a
          key={`${meta.setId}_${meta.setIndex}`}
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