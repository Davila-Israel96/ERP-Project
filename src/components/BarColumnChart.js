import React from "react";
import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";

export function BarColumnChart({ chartOptions }) {
	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
