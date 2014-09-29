function drawChart() {
			//first load the other charts that come up with this one
			drawSession();
			drawTotals();
			drawDevice();

				var header = ['Date', 'Apple','Google', 'Amazon'];
				var row = "";            
   				var rows = new Array();
				
					$.getJSON('http://127.0.0.1:8080/hello', function(n) {
						$.each(n, function( i, d ) {
							if (!d) {
								console.log('No Data Response, Check Again...');
							}
							else {
							//var lines = d.Date.split('\n');
							//row = [d.Date, d.Apple, d.Google, d.Amazon];
							row = [d.Date, parseInt(d.Apple), parseInt(d.Google), parseInt(d.Amazon)];
							rows.push(row);
							}
						});
						rows.splice(0, 0, header);
						//console.log(rows);
						var d = google.visualization.arrayToDataTable(rows);
						var chart = new google.visualization.ColumnChart(document.getElementById('chart_downloads'));
			  			chart.draw(d, options); //draw chart 1	
					});

			  //chart options
			  var options = {
				title: '',
				hAxis: {title: 'Date', titleTextStyle: {color: '#666'}},
				vAxis: {title: 'Downloads', titleTextStyle: {color: '#666'}},
				backgroundColor: {fillOpacity: '0'},
				legend: {position: 'top', textStyle: {color: '#666', fontSize: 13}},
				colors: ['#6a7e7d', '#a0cc3d', '#3c4b4b']
			  };
		  
}

function drawSession() {
				var header = ['Date', 'Android','Ipad'];
				var row = "";            
   				var rows = new Array();
				
					$.getJSON('http://127.0.0.1:8080/sessions', function(n) {
						$.each(n, function( i, d ) {
							if (!d) {
								console.log('No Data Response, Check Again...');
							}
							else {
							row = [d.Date, parseInt(d.Android), parseInt(d.Ipad)];
							rows.push(row);
							}
						});
						rows.splice(0, 0, header);
						//console.log(rows);
						var d = google.visualization.arrayToDataTable(rows);
						var chart = new google.visualization.AreaChart(document.getElementById('chart_div3'));
			  			chart.draw(d, options); //draw chart 1	
					});

			  //chart options
			  var options = {
				title: '',
				hAxis: {title: 'Date', titleTextStyle: {color: '#666'}},
				vAxis: {title: 'Sessions', titleTextStyle: {color: '#666'}},
				backgroundColor: {fillOpacity: '0'},
				legend: {position: 'top', textStyle: {color: '#666', fontSize: 13}},
				colors: ['#6a7e7d', '#a0cc3d']
			  };
		  
}

function drawTotals() {
				var header = ['Date','Combined Totals'];
				var row = "";            
   				var rows = new Array();
				
					$.getJSON('http://127.0.0.1:8080/hello', function(n) {
						$.each(n, function( i, d ) {
							if (!d) {
								console.log('No Data Response, Check Again...');
							}
							else {
							row = [d.Date, parseInt(d.Daily_Total)];
							rows.push(row);
							}
						});
						rows.splice(0, 0, header);
						console.log(rows);
						var d = google.visualization.arrayToDataTable(rows);
						var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
			  			chart.draw(d, options); //draw chart 1	
					});

			  //chart options
			  var options = {
				title: '',
				hAxis: {title: 'Date', titleTextStyle: {color: '#666'}},
				vAxis: {title: 'Downloads', titleTextStyle: {color: '#666'}},
				backgroundColor: {fillOpacity: '0'},
				legend: {position: 'top', textStyle: {color: '#666', fontSize: 13}},
				colors: ['#a0cc3d', '#6a7e7d']
			  };
		  
}

function drawDevice() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div4'));
        chart.draw(data, options);
}