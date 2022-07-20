import { React, useState, useEffect } from "react";
import Highcharts from "highcharts";
import Polygon from "highcharts/highcharts-more";
import { useOutletContext } from "react-router-dom";
import { AccountsData } from "../data/AccountsData";
import { BarColumnChart } from "../components/BarColumnChart";
import { PieChart } from "../components/PieChart";

Polygon(Highcharts);
function AccountsChart() {
	// needs optimization
	const [barChartData, setBarChartData] = useState({});
	const [pieChartData, setPieChartData] = useState({});
	const [totalsData, setTotalsData] = useState([]);
	const [year, setYear] = useState(true);
	const chartType = useOutletContext();
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
				y: 45,
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
							color: "#9FECB9",
						},
					],
					color: `${chartType === "polygon" ? "#9FECB9" : ""}`,
				},
				{
					name: "Previous",
					type: `${chartType === "polygon" ? "scatter" : ""}`,
					data: [...seriesPrevious],
					zones: [
						{
							value: 0,
							color: "#FF2800",
						},
						{
							color: "rgba(28, 190, 131, 1)",
						},
					],
				},
			],
		});
		// lazy way of dealing with year change
		if (year) {
			setTotalsData(currentTotals);
		} else if (!year) {
			setTotalsData(previousTotals);
		}
		// setting format of pie chart
		setPieChartData({
			title: {
				text: `${year === true ? "Current Year" : "Previous Year"}`,
				style: { fontSize: "30px", color: "#9FECB9", fontWeight: "bold" },
			},
			chart: {
				type: "pie",
				height: 600,
				width: 850,
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

	// change from current to previous
	const handleChartChange = (e) => {
		e.preventDefault();
		setYear(!year);
	};

	return (
		<div className="chart-container">
			<div className="bar-container">
				<BarColumnChart chartOptions={barChartData} />
			</div>
			<div className="total-title">Yearly Totals</div>
			<div className="pie-container">
				<PieChart chartOptions={pieChartData} />
				<div className="pie-btns">
					<button type="button" onClick={handleChartChange}>
						Change Year
					</button>
				</div>
			</div>
		</div>
	);
}

export default AccountsChart;
