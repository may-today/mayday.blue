import { ResponsiveLine } from '@nivo/line'
import { format, eachMonthOfInterval, addMonths, subMonths, isWithinInterval } from 'date-fns'
import { allTourDateList } from '@/content/_parse/setlist'
import type { SongStat } from '@/types'

interface Props {
  data: SongStat
}

const theme = {
  background: 'transparent',
  axis: {
    domain: {
      line: {
        stroke: '#999999',
      },
    },
    legend: {
      text: {
        fill: '#999999',
      },
    },
    ticks: {
      text: {
        fontSize: 11,
        fill: '#999999',
        outlineWidth: 0,
        outlineColor: 'transparent',
      },
    },
  },
  grid: {
    line: {
      stroke: '#99999930',
      strokeWidth: 1,
    },
  },
  tooltip: {
    container: {
      background: 'var(--bg-dialog)',
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
}

const generateData = (data: SongStat) => {
  type Data = {
    x: string // date
    y: number
  }
  const currentDate = new Date()
  const dateRange = {
    start: subMonths(currentDate, 24),
    end: addMonths(currentDate, 0),
  }
  const dateArray = eachMonthOfInterval(dateRange).map((date) => format(date, 'yyyy-MM'))
  const dateDict: Record<string, { requested: number; all: number; allTour: number }> = {}
  dateArray.forEach((date) => {
    dateDict[date] = { requested: 0, all: 0, allTour: 0 }
  })
  data.allList.forEach((meta) => {
    if (!isWithinInterval(meta.date, dateRange)) return
    const date = format(meta.date, 'yyyy-MM')
    dateDict[date].all += 1
    if (meta.requested) {
      dateDict[date].requested += 1
    }
  })
  allTourDateList.forEach((date) => {
    if (!isWithinInterval(date, dateRange)) return
    const dateStr = format(date, 'yyyy-MM')
    dateDict[dateStr].allTour += 1
  })
  const requestedData: Data[] = []
  const allData: Data[] = []
  const allTourTimesData: Data[] = []
  Object.entries(dateDict).forEach(([date, item]) => {
    requestedData.push({ x: date, y: item.requested })
    allData.push({ x: date, y: item.all })
    allTourTimesData.push({ x: date, y: item.allTour })
  })
  return [
    { id: '点歌场次', data: requestedData, color: 'var(--bg-chart-3)' },
    { id: '出现场次', data: allData, color: 'var(--bg-chart-2)' },
    { id: '总场次', data: allTourTimesData, color: 'var(--bg-chart-1)' },
  ]
}

export default ({ data }: Props) => {
  const parsedData = generateData(data)
  return (
    <div className="h-300px">
      <ResponsiveLine
        data={parsedData}
        margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
        xScale={{
          type: 'time',
          format: '%Y-%m',
          useUTC: false,
          precision: 'month',
          nice: true,
        }}
        axisBottom={{
          format: '%Y-%m',
          tickValues: 'every 6 months',
        }}
        xFormat="time:%Y-%m"
        yScale={{ type: 'linear' }}
        curve="step"
        enablePoints={false}
        enableGridX={false}
        enableSlices="x"
        enableArea={true}
        crosshairType="bottom"
        animate={false}
        legends={[]}
        theme={theme}
        colors={{ datum: 'color' }}
      />
    </div>
  )
}
