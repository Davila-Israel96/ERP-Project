import { React, useState, useEffect } from "react";
import Highcharts from "highcharts";
import { CashFlow } from "../data/CashFlow";
import { BarColumnChart } from "../components/BarColumnChart";
import { PieChart } from "../components/PieChart";

function CashFlowChart({ chartType }) {
	const [barChartData, setBarChartData] = useState({});
	const [pieChartData, setPieChartData] = useState({});
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
		setBarChartData({
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
				itemStyle: {
					color: "#ffffff",
				},
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
		setPieChartData({
			title: {
				text: "Current Year",
			},
			chart: {
				type: "pie",
				height: 800,
				width: 1000,
			},
			tooltip: {
				pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: "pointer",
					dataLabels: {
						enabled: true,
						format: "<b>{point.name}</b>: {point.percentage:.1f}%",
					},
					showInLegend: true,
				},
			},
			series: [
				{
					name: "Current",
					data: [...seriesCurrent],
				},
			],
		});
	}, [chartType]);

	return (
		<div className="chart-container">
			<div>
				<BarColumnChart chartOptions={barChartData} />
			</div>
			<div>
				<PieChart chartOptions={pieChartData} />
			</div>
		</div>
	);
}

export default CashFlowChart;
