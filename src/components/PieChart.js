import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

export const PieChart = ({ chartOptions }) => {
	<HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};
