# Log for webapp progress

- 06/16/22 - Created 'CashFlow.js' and 'BarChart.js'.
- 06/20/22 - Changes made: {
  - Changed 'BarChart.js' to 'Chart.js'
  - Installed 'Highcharts' and 'highcharts-react-official'
  - Got initial Cashflow chart to render, not perfect but data is showing
    }
- 06/22/22 - Changes made: {
  - Got "Current" and "Previous" showing for each value in CashFlow array
  - Added values to CashFlow array
  - set categories to as many values as we have in the CashFlow array
    }
- Forms to visualize: Cash Flow, Liabilities, Assets, and Statement of Income

- 07/06/22 - Changes made: {
- CashFlow.js data was updated earlier this week
- 'CashFlowChart.js' now shows all categories on file provided
- CSS styling added for basically entire webapp
  }

- 07/11/22 - Changes made: {
- 'PieChart.js' and 'BarColumnChart.js' added in order to separate functionality
- Piechart added to CashFlowChart page
- Added functionality for switching between current and previous years
- Pie chart series data is now state based
- }

- 07/12/22 - Changes made: {
- Added more styling, changed up color values of bar chart, and positions Pie chart on page
-
- }

- 07/13/22 - Changes made {
- Changed navbar functionality to allow for dropdown of links to charts
- 'AssetChart.js' now renders succesfully
-
- }

- 07/18/22 - Changes made {
- Finished adding values to Assets chart page
- Added 'useOutletContext' to pages to control chartType state value
-
- }

- 07/20/22 - Changes made {
- Added SplitPie.js to components
- Added Pie Chart with percent change in values from forms
- Added descriptions to pie charts at bottom of AccountsChart.js
- Styled added charts and descriptions
- }

- 07/25/2022 - Changes Made {
- Added Liabilites chart and Cash Flow chart
- Made some minor styling changes
- Included responsive totals in charts
- }

# Instructions for launching application

-> download and unzip the project folder
-> if you have an IDE such as Visual Studio Code, open the folder up from there. IF NOT
-> launch the command prompt / terminal
-> CD into the 'ERP-Project' folder
-> ensure that you have NPM installed before the next step
-> type 'npm install'
-> after dependencies are installed, type 'npm start'
-> this should launch the application in a separate Chrome or Edge window
-> if you have GIT downloaded, you can just CD into the ERP-Project folder
and type 'git fetch'
-> that should update the application to the newest version
-> make sure to run 'npm install' after doing this before trying to run
the app again, in case new dependencies are being used.
