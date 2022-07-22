import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie";

VariablePie(Highcharts);
function SplitPie({ values, minPoint, maxPoint, zMax }) {
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
					style: {
						fontSize: "30px",
						color: "#9FECB9",
						fontWeight: "bold",
					},
				},
				tooltip: {
					headerFormat: "",
					pointFormat:
						'<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
						"% Change: <b>{point.z}</b><br/>" +
						"Change: <b>{point.y}</b>",
				},
				series: [
					{
						minPointSize: minPoint,
						maxPointSize: maxPoint,
						zMax: zMax,
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
