'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import type { AppArtifact } from '../../schemas/artifact.schema';

const chartConfig = {
  value: {
    label: '값',
    color: 'var(--chart-1)'
  },
  secondary: {
    label: '보조 값',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

const pieColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

export function InsightChart({ artifact }: { artifact: Extract<AppArtifact, { kind: 'chart' }> }) {
  if (artifact.chartType === 'pie') {
    return (
      <ChartContainer config={chartConfig} className='min-h-[320px]'>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={artifact.data}
            dataKey='value'
            nameKey='name'
            innerRadius={58}
            outerRadius={110}
          >
            {artifact.data.map((entry, index) => (
              <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  }

  if (artifact.chartType === 'line') {
    return (
      <ChartContainer config={chartConfig} className='min-h-[320px]'>
        <LineChart data={artifact.data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='name' tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={36} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type='monotone' dataKey='value' stroke='var(--color-value)' strokeWidth={2} />
          <Line
            type='monotone'
            dataKey='secondary'
            stroke='var(--color-secondary)'
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer config={chartConfig} className='min-h-[320px]'>
      <BarChart data={artifact.data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='name' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey='value' fill='var(--color-value)' radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
