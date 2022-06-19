import './App.css';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { BarChart } from './components/BarChart.js';
import { CashFlow } from './data/CashFlow.js';

function App() {
	const [chartData, setChartData] = useState({ datasets: [] });

	useEffect(() => {
		setChartData({
			labels: CashFlow.map((label) => label.row),
			datasets: [
				{
					label: 'Price in USD',
					data: CashFlow.map((section) => section.current),
					backgroundColor: [
						'#ffbb11',
						'#ecf0f1',
						'#50AF95',
						'#f3ba2f',
						'#2a71d0',
					],
				},
			],
		});
	}, []);

	return (
		<div className='App'>
			<h1>DBIT Analytics</h1>
			<div>
				<BarChart chartData={chartData} />
			</div>
		</div>
	);
}

export default App;
