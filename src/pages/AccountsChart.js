import { React, useState, useEffect } from "react";
import Highcharts from "highcharts";
import Polygon from "highcharts/highcharts-more";
import { AccountsData } from "../data/AccountsData";
import { BarColumnChart } from "../components/BarColumnChart";
import { PieChart } from "../components/PieChart";

Polygon(Highcharts);
function AccountsChart({ chartType }) {
	const [barChartData, setBarChartData] = useState({});
	const [pieChartData, setPieChartData] = useState({});
	const [totalsData, setTotalsData] = useState([]);
	const [year, setYear] = useState(true);
	const data = AccountsData;
	let seriesCurrent = [];
	let currentTotals = [];
	let seriesPrevious = [];
	let previousTotals = [];
	let categories = [];

	// get all objects from array and format them for use in w/ highcharts
	for (let item of data) {
		if (item.name.includes("Total") || item.name.includes("Net Income")) {
			currentTotals.push({
				name: item.row,
				y: item.current,
			});
			previousTotals.push({
				name: item.row,
				y: item.previous,
			});
		} else {
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
	}
	//TODO: CREATE FUNCTION TO CHOOSE CATEGORIES SHOWN
	useEffect(() => {
		if (year === true) {
			setTotalsData(currentTotals);
		} else if (year === false) {
			setTotalsData(previousTotals);
		}
		// setting up format for both bar and column charts
		// layout similiar so only one statement needed for both
		setBarChartData({
			title: {
				text: "Accounts",
				style: { fontSize: "40px", color: "#9FECB9", fontWeight: "bold" },
			},
			subtitle: {
				text: "Subtitle",
			},
			chart: {
				// nullify type at chart level for 'polygon' chart type
				type: `${chartType === "polygon" ? null : chartType}`,
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
				min: -8000,
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
					type: `${chartType === "polygon" ? chartType : ""}`,
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
					type: `${chartType === "polygon" ? "scatter" : ""}`,
					data: [...seriesPrevious],
				},
			],
		});
		// setting format of pie chart
		setPieChartData({
			title: {
				text: `${year === true ? "Current Year" : "Previous Year"}`,
			},
			chart: {
				type: "pie",
				height: 400,
				width: 600,
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
					data: totalsData,
				},
			],
		});
	}, [chartType, year]);

	const handleChartChange = () => {
		setYear(!year);
	};

	return (
		<div className="chart-container">
			<div>
				<BarColumnChart chartOptions={barChartData} />
			</div>
			<div>
				<PieChart chartOptions={pieChartData} />
				<button type="button" onClick={handleChartChange}>
					Change Year
				</button>
			</div>
		</div>
	);
}

export default AccountsChart;
