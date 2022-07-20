import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

export function PieChart({ chartOptions }) {
	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
