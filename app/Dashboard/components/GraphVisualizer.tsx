// components/GraphVisualizer.tsx
import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

export type DataPoint = {
  timestamp: number
  flexion: number
  deviation: number
  pronation: number
}

interface Props {
  data: DataPoint[]
}

const GraphVisualizer: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={ts => new Date(ts).toLocaleTimeString()}
      />
      <YAxis />
      <Tooltip 
        labelFormatter={ts => new Date(ts).toLocaleTimeString()} 
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="flexion"
        name="Flexion (°)"
        stroke="#8884d8"
        dot={true}
      />
      <Line
        type="monotone"
        dataKey="deviation"
        name="Deviation (°)"
        stroke="#82ca9d"
        dot={true}
      />
      <Line
        type="monotone"
        dataKey="pronation"
        name="Pronation (°)"
        stroke="#ffc658"
        dot={true}
      />
    </LineChart>
  </ResponsiveContainer>
)

export default GraphVisualizer
