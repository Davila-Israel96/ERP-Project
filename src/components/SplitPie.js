import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie";

VariablePie(Highcharts);
function SplitPie({ values }) {
	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={{
				chart: {
					type: "variablepie",
					height: 600,
					width: 850,
				},
				plotOptions: {
					variablepie: {
						size: 800,
					},
				},
				title: {
					text: "Percent Changes in values",
				},
				tooltip: {
					headerFormat: "",
					pointFormat:
						'<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
						"% Change: <b>{point.y}</b><br/>" +
						"Change: <b>{point.z}</b>",
				},
				series: [
					{
						minPointSize: 5,
						maxPointSize: 200,
						zMax: 15000,
						innerSize: "10%",
						name: "Percent Changes",
						data: values,
					},
				],
			}}
		/>
	);
}

export default SplitPie;
