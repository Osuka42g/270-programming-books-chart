import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  YAxis,
  ComposedChart,
  Bar,
  Cell,
} from "recharts";

export default (props) => {

  const { data = [], yKey, onMouseEnter } = props;
  const displayData = orderByRating(data);

  return (
    <ComposedChart width={1000} height={475} data={displayData}>
      <XAxis dataKey="Book_title" type="category" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar
        dataKey={yKey}
        barSize={15}
        fill="#413ea0"
        onMouseEnter={onMouseEnter}
      >
        {data.map((entry, i) => (
          <Cell fill={entry.Color} key={entry.Color + entry.Title} />
        ))}
      </Bar>
    </ComposedChart>
  );
};

const orderByRating = data => data.sort((a, b) => b.Rating - a.Rating);