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
				style: { fontSize: "40px", color: "#9FECB9", fontWeight: "bold" },
			},
			subtitle: {
				text: "Subtitle",
			},
			chart: {
				type: chartType,
				height: 1200,
				width: 1300,
				backgroundColor: "#ffffff",
			},
			xAxis: {
				type: "category",
				categories: [...categories],
				title: {
					text: null,
				},
				min: 0,
			},
			yAxis: {
				min: -10000,
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
						// eslint-disable-next-line no-template-curly-in-string
						format: "${y}",
					},
				},
			},
			legend: {
				layout: "vertical",
				align: "right",
				verticalAlign: "top",
				x: -40,
				y: 160,
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
		<div className="chart-container">
			<HighchartsReact highcharts={Highcharts} options={chartData} />
		</div>
	);
}

export default CashFlowChart;
