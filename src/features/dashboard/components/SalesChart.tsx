import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';
import type { getBookingsAfterDate } from '@/features/bookings/services';
import type { Theme } from '@/types/theme';
import Heading from '@/ui/Heading';
import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
  bookings: Awaited<ReturnType<typeof getBookingsAfterDate>>;
  numDays: number;
}

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { theme } = useTheme();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => ({
    label: format(date, 'MMM dd'),
    totalSales: bookings
      .filter((booking) => isSameDay(new Date(booking.createdAt), date))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: bookings
      .filter((booking) => isSameDay(new Date(booking.createdAt), date))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));
  console.log(data);

  const colors = {
    dark: {
      totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
      extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
      text: '#e5e7eb',
      background: '#18212f',
    },
    light: {
      totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
      extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
      text: '#374151',
      background: '#fff',
    },
  } satisfies Record<Theme, unknown>;

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1)!, 'MMM dd yyyy')}
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors[theme].text }}
            tickLine={{ stroke: colors[theme].text }}
            angle={numDays === 7 ? 0 : 60}
            tickMargin={40}
            height={72}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors[theme].text }}
            tickLine={{ stroke: colors[theme].text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ background: colors[theme].background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors[theme].totalSales.stroke}
            fill={colors[theme].totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors[theme].extrasSales.stroke}
            fill={colors[theme].extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
