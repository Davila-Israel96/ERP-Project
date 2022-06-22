import "./App.css";
import { useState, useEffect } from "react";
import { Chart } from "./components/Chart.js";
import Highcharts from "highcharts";
import { CashFlow } from "./data/CashFlow.js";
/**
 *
 * @description: Main page for application, App will act as the foundation
 * for each type of chart, as well as the Home page for the application.
 */
function App() {
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
	useEffect(() => {
		setChartData({
			title: {
				text: "Chart Title",
			},
			subtitle: {
				text: "Subtitle here",
			},
			chart: {
				type: "bar",
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
				min: -300,
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
					data: [...seriesCurrent],
				},
				{
					data: [...seriesPrevious],
				},
			],
		});
	}, [data]);
	return (
		<div className="App">
			<h1>DBIT Analytics</h1>
			<div>
				<Chart chartData={chartData} />
			</div>
		</div>
	);
}

export default App;
