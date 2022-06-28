import { React, useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CashFlow } from "../data/CashFlow";
function CashFlowChart({ chartType }) {
	const [chartData, setChartData] = useState({});
	const data = CashFlow;
	let seriesCurrent = [];
	let seriesPrevious = [];
	let categories = [];

	// get all objects from array and format them for use in w/ highcharts
	for (let item of data) {
		categories.push(item.row);
		seriesCurrent.push({
			name: item.row,
			y: item.current,
		});
		seriesPrevious.push({
			name: item.row,
			y: item.previous,
		});
	}

	//TODO: CREATE FUNCTION TO CHOOSE CATEGORIES SHOWN
	useEffect(() => {
		setChartData({
			title: {
				text: "Cash Flow",
			},
			subtitle: {
				text: "Subtitle",
			},
			chart: {
				type: chartType,
			},
			xAxis: {
				type: "category",
				categories: [...categories],
				title: {
					text: null,
				},
				min: 0,
				max: 3,
			},
			yAxis: {
				min: -1000,
				title: {
					text: "Value",
				},
				labels: {
					overflow: "justify",
				},
			},
			credits: { enabled: false },
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true,
						format: "${y}",
					},
				},
			},
			legend: {
				layout: "vertical",
				align: "right",
				verticalAlign: "top",
				x: -40,
				y: 80,
				borderWidth: 1,
				floating: true,
				backgroundColor:
					Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFFF",
			},
			// series is an array of objects set above useEffect
			series: [
				{
					name: "Current",
					data: [...seriesCurrent],
					zones: [
						{
							value: 0,
							color: "#FF2800",
						},
						{
							color: "#05878A",
						},
					],
				},
				{
					name: "Previous",
					data: [...seriesPrevious],
				},
			],
		});
	}, [chartType]);
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={chartData} />
		</div>
	);
}

export default CashFlowChart;
