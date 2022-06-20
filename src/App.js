import "./App.css";
import { useState, useEffect } from "react";
import { Chart } from "./components/Chart.js";
import Highcharts from "highcharts";
import { CashFlow } from "./data/CashFlow.js";

function App() {
	const [chartData, setChartData] = useState({});
	const data = CashFlow;
	let series = [];
	let categories = [];

	for (let item of data) {
		categories.push(item.row);
		series.push({
			name: item.row,
			y: item.current,
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
				categories: [...categories],
				title: {
					text: null,
				},
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
			series: [
				{
					name: "Value",
					data: [...series],
				},
			],
		});
	}, []);
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
