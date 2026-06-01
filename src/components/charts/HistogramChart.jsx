import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const range = payload[0].payload.range;
    return (
      <div style={{
        backgroundColor: 'rgba(22, 26, 35, 0.95)',
        border: '1px solid #2c3142',
        padding: '12px',
        borderRadius: '4px'
      }}>
        <p style={{ margin: 0, color: '#ffffff', fontSize: '13px', fontFamily: 'Inter', fontWeight: '600', marginBottom: '4px' }}>
          Range: {range}
        </p>
        <p style={{ margin: 0, color: '#5c7aff', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700' }}>
          {payload[0].value} days
        </p>
      </div>
    );
  }
  return null;
};

const HistogramChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: -20, bottom: 45 }}
        barCategoryGap="10%"
      >
        <CartesianGrid vertical={false} stroke="#232735" />
        <XAxis
          dataKey="label"
          tick={{ fill: '#8a92a5', fontSize: 11, fontFamily: 'Inter' }}
          tickMargin={15}
          angle={-45}
          textAnchor="end"
          axisLine={{ stroke: '#2c3142' }}
          tickLine={false}
          label={{
            value: 'VALUE CHANGE',
            position: 'insideBottom',
            offset: -35,
            fill: '#59637a',
            fontSize: 10,
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: 1
          }}
        />
        <YAxis
          tick={{ fill: '#59637a', fontSize: 11, fontFamily: 'monospace' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
          label={{
            value: 'SESSIONS COUNT',
            angle: -90,
            position: 'insideLeft',
            fill: '#59637a',
            fontSize: 10,
            fontFamily: 'Inter',
            fontWeight: 700,
            letterSpacing: 1,
            offset: 15
          }}
        />
        <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[4, 4, 4, 4]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.mid ? '#7c94ff' : '#5c7aff'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramChart;
