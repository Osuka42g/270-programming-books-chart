import { useState } from "react";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ScatterChart,
  Legend,
  Scatter,
  YAxis,
  ZAxis,
  ComposedChart,
  Bar,
} from "recharts";

export default (props) => {

  const { data = [] } = props;
  const displayData = data.sort(function (a, b) {
    return b.Rating - a.Rating;
  });

  return (
    <ComposedChart width={1000} height={475} data={displayData}>
      <XAxis dataKey="Book_title" />
      <YAxis label={"Rating"} />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar
        dataKey="Rating"
        barSize={15}
        fill="#413ea0"
        onMouseEnter={props.onMouseEnter}
      />
    </ComposedChart>
  );
};
