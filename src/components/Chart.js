import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Chart = ({ chartData }) => {
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={chartData} />
		</div>
	);
};
