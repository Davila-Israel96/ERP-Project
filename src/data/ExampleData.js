// Every form is a list[] of objects{}
// I used Liabilities, Surplus, and Other Funds form for this example
export const ExampleData = [
	// objects {} are defined by key : value pairs
	{
		// Row is what I use for the "short name" of the section
		row: "Losses",
		name: "Losses",
		current: 629,
		previous: 812,
		// current and previous don't need quotes, can just be Integers
	},
	// comma used to separate each object
	{
		row: "Reinsurance Payable",
		name: "Reinsurance payable on paid losses",
		current: 900,
		previous: 650,
	},
];
