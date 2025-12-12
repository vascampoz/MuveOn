import { WeightEntry } from '@/types/fitness';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

interface WeightChartProps {
  data: WeightEntry[];
}

export function WeightChart({ data }: WeightChartProps) {
  const chartData = data.slice(-10).map(entry => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
  }));

  const minWeight = Math.min(...chartData.map(d => d.weight)) - 1;
  const maxWeight = Math.max(...chartData.map(d => d.weight)) + 1;

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(82, 85%, 55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(82, 85%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
          />
          <YAxis 
            domain={[minWeight, maxWeight]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 18%, 12%)',
              border: '1px solid hsl(220, 15%, 20%)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
            labelStyle={{ color: 'hsl(0, 0%, 98%)' }}
            itemStyle={{ color: 'hsl(82, 85%, 55%)' }}
            formatter={(value: number) => [`${value} kg`, 'Peso']}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="hsl(82, 85%, 55%)"
            strokeWidth={3}
            fill="url(#weightGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
