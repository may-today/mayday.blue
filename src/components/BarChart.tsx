import { ResponsiveBar } from '@nivo/bar'

interface Props {

}

export default () => {
  const data = [
    {
      "country": "AD",
      "hot dog": 123,
      "hot dogColor": "hsl(68, 70%, 50%)",
      "burger": 99,
      "burgerColor": "hsl(135, 70%, 50%)",
      "sandwich": 127,
      "sandwichColor": "hsl(136, 70%, 50%)",
      "kebab": 185,
      "kebabColor": "hsl(35, 70%, 50%)",
      "fries": 160,
      "friesColor": "hsl(112, 70%, 50%)",
      "donut": 130,
      "donutColor": "hsl(124, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 184,
      "hot dogColor": "hsl(39, 70%, 50%)",
      "burger": 190,
      "burgerColor": "hsl(313, 70%, 50%)",
      "sandwich": 104,
      "sandwichColor": "hsl(323, 70%, 50%)",
      "kebab": 48,
      "kebabColor": "hsl(175, 70%, 50%)",
      "fries": 152,
      "friesColor": "hsl(86, 70%, 50%)",
      "donut": 43,
      "donutColor": "hsl(106, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 200,
      "hot dogColor": "hsl(6, 70%, 50%)",
      "burger": 10,
      "burgerColor": "hsl(294, 70%, 50%)",
      "sandwich": 82,
      "sandwichColor": "hsl(35, 70%, 50%)",
      "kebab": 168,
      "kebabColor": "hsl(142, 70%, 50%)",
      "fries": 117,
      "friesColor": "hsl(80, 70%, 50%)",
      "donut": 170,
      "donutColor": "hsl(109, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 41,
      "hot dogColor": "hsl(324, 70%, 50%)",
      "burger": 57,
      "burgerColor": "hsl(61, 70%, 50%)",
      "sandwich": 135,
      "sandwichColor": "hsl(42, 70%, 50%)",
      "kebab": 139,
      "kebabColor": "hsl(161, 70%, 50%)",
      "fries": 5,
      "friesColor": "hsl(95, 70%, 50%)",
      "donut": 17,
      "donutColor": "hsl(258, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 157,
      "hot dogColor": "hsl(9, 70%, 50%)",
      "burger": 133,
      "burgerColor": "hsl(56, 70%, 50%)",
      "sandwich": 55,
      "sandwichColor": "hsl(293, 70%, 50%)",
      "kebab": 46,
      "kebabColor": "hsl(102, 70%, 50%)",
      "fries": 154,
      "friesColor": "hsl(76, 70%, 50%)",
      "donut": 146,
      "donutColor": "hsl(250, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 84,
      "hot dogColor": "hsl(142, 70%, 50%)",
      "burger": 76,
      "burgerColor": "hsl(150, 70%, 50%)",
      "sandwich": 83,
      "sandwichColor": "hsl(209, 70%, 50%)",
      "kebab": 78,
      "kebabColor": "hsl(300, 70%, 50%)",
      "fries": 60,
      "friesColor": "hsl(33, 70%, 50%)",
      "donut": 120,
      "donutColor": "hsl(296, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 158,
      "hot dogColor": "hsl(282, 70%, 50%)",
      "burger": 113,
      "burgerColor": "hsl(1, 70%, 50%)",
      "sandwich": 94,
      "sandwichColor": "hsl(335, 70%, 50%)",
      "kebab": 124,
      "kebabColor": "hsl(342, 70%, 50%)",
      "fries": 82,
      "friesColor": "hsl(83, 70%, 50%)",
      "donut": 197,
      "donutColor": "hsl(282, 70%, 50%)"
    }
  ]
  return (
    <div className="h-300px">
      <ResponsiveBar
        data={data}
        keys={[
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blues' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={false}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
    </div>
  );
}