import {
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  ComposedChart,
  Bar,
  Cell,
} from "recharts";

export default (props) => {
  const { data = [], yKey, onMouseEnter } = props;
  const displayData = orderByRating(data);

  const CustomTooltip = ({ active, payload, label }) => {
    return (
      (active && (
        <div
          className="recharts-tooltip-wrapper recharts-tooltip-wrapper-right recharts-tooltip-wrapper-bottom"
          style={{ backgroundColor: "white", opacity: 0.85 }}
        >
          <div className="recharts-default-tooltip">
            <p className="recharts-tooltip-label">{label}</p>
            <ul className="recharts-tooltip-item-list">
              <li className="recharts-tooltip-item">
                <span className="recharts-tooltip-item-name">Rating</span>
                <span className="recharts-tooltip-item-separator"> : </span>
                <span className="recharts-tooltip-item-value">
                  {payload[0].payload.Rating}
                </span>
                <span className="recharts-tooltip-item-unit"></span>
              </li>
              <li className="recharts-tooltip-item">
                <span className="recharts-tooltip-item-name">Reviews</span>
                <span className="recharts-tooltip-item-separator"> : </span>
                <span className="recharts-tooltip-item-value">
                  {payload[0].payload.Reviews}
                </span>
                <span className="recharts-tooltip-item-unit"></span>
              </li>
              <li className="recharts-tooltip-item">
                <span className="recharts-tooltip-item-name">
                  Number of pages
                </span>
                <span className="recharts-tooltip-item-separator"> : </span>
                <span className="recharts-tooltip-item-value">
                  {payload[0].payload.Number_Of_Pages}
                </span>
                <span className="recharts-tooltip-item-unit"></span>
              </li>
              <li className="recharts-tooltip-item">
                <span className="recharts-tooltip-item-name">Price</span>
                <span className="recharts-tooltip-item-separator"> : </span>
                <span className="recharts-tooltip-item-value">
                  {payload[0].payload.Price.toFixed(2)}
                </span>
                <span className="recharts-tooltip-item-unit">usd</span>
              </li>
            </ul>
          </div>
        </div>
      )) ||
      null
    );
  };

  return (
    <ComposedChart width={1000} height={475} data={displayData}>
      <XAxis dataKey="Book_title" type="category" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />

      {/* <Tooltip /> */}
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

const orderByRating = (data) => data.sort((a, b) => b.Rating - a.Rating);
