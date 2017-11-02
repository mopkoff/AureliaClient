var table = document.getElementById("pointTable");
var img = document.getElementById("graphimg");
var ctx = document.getElementById("myChart").getContext("2d");
var r = 1;
ctx.height = 400;
ctx.width = 400;
ctx.drawImage(img, 0, 0, 400, 400);
var startingData = {
	type: 'scatter',
	data: {
		datasets: [
			{
				pointRadius: 5,
				label: 'Red Dots',
				pointBackgroundColor: '#ff6384',
				data: []
			},
			{
				pointRadius: 5,
				label: 'Green Dots',
				pointBackgroundColor: '#008000',
				data: []
			}]
	},
	options: {
		//scaling
		responsive: false,
		animation: false,
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		scales: {
			
			lineArc: true,
			xAxes: [{
				display: false,
				gridLines: {
					display: false
				},
				ticks: {
					min: -6,
					max: 6
				}
			}],
			scaleOverride: true,
			scaleStepWidth: 5,
			yAxes: [{
				display: false,
				gridLines: {
					display: false
				},
				ticks: {
					min: -6,
					max: 6
				}
			}]
		}

	}
};
var myChart = new Chart(ctx, startingData);
//parseTable();
updatePoints(r);
document.getElementById("myChart").onclick = function (evt) {
	console.log("Mouse at: " + evt.offsetX + "; " + evt.offsetY);
	var correctedX = (r *(evt.offsetX - 197) / 34).toFixed(2);
	var correctedY = (-r*(evt.offsetY - 202) / 34).toFixed(2);
	
	console.log("creating at: " + correctedX + "; " + correctedY);
	sendPoint(correctedX, correctedY, r, drawPoint);
};

function parseTable() {
	const cells = table.querySelectorAll("td");
	let x, y, isInside;
	if (cells.length > 3) {
		for (let i = 3; i < cells.length; i += 3) {
			x = cells[i].firstChild.data;
			y = cells[i + 1].firstChild.data;
			isInside = cells[i + 2].firstChild.data;
			if (isInside === "Нет")
				startingData.data.datasets[0].data.push({ x: x, y: y });
			else
				startingData.data.datasets[1].data.push({ x: x, y: y });
		}
		myChart.update();
	}
}
function sendForm() {
	var inputX = document.getElementById('inputX').value;
	var inputY = document.getElementById('inputY').value;
	var inputR = document.getElementById('inputR').value;
	if (inputX === "") {
		alert("X не задано!");
		return;
	}
	if (inputR === "") {
		alert("R не задано!")
		return;
	}

	if (Number.isFinite(inputY) && inputY > -3 && inputY < 5)
		sendPoint(inputX, inputY, inputR, drawPoint);
	else
		alert("Y должно быть в промежутке (-3;5)!")
}
function sendPoint(x, y, r, drawPoint) {
	$.ajax({
		url: 'http://localhost:8080/lab9/api/points/' + localStorage.getItem('token') + "/" + x + "/" + y + "/" + r,
		type: 'POST',
		data: {
			x: x,
			y: y,
			r: r
		},      //Data as js object
		success: function (response) {
			drawPoint(x, y, response.isInside);
		}
	});
};
function updatePoints(r) {
	$.ajax({
		url: 'http://localhost:8080/lab9/api/points/' + localStorage.getItem('token') + "/refresh/" + r,
		type: 'PUT',
		data: {
			r: r
		},      //Data as js object
		success: function (response) {
			console.log(response);
			refreshTable(response);
			//document.getElementById("canvasContainer").reload();
		}
	});

};
function refreshTable(points) {
	while (table.rows.length > 1) {
		table.deleteRow(0);
	}
	startingData.data.datasets[0].data = [];
	startingData.data.datasets[1].data = [];
	
	let x, y, isInside, row;
	for (let i = 0; i < points.length; i ++) {
		x = points[i].x;
		y = points[i].y;
		isInside = points[i].isInside;
		isInside = isInside == 0 ? "Нет" : "Да";
		row = table.insertRow(1);
		row.insertCell(0).innerHTML = x;
		row.insertCell(1).innerHTML = y;
		row.insertCell(2).innerHTML = isInside;		

		if (isInside === "Нет")
			startingData.data.datasets[0].data.push({ x: x/r, y: y/r });
		else
			startingData.data.datasets[1].data.push({ x: x/r, y: y/r });
	}
	
	myChart.update();
}
function drawPoint(x, y, isInside) {
	startingData.data.datasets[isInside].data.push({ x: x/r, y: y/r });
	myChart.update();
	console.log("New point: " + x/r + "; " + y/r + "; " + isInside);
	var row = table.insertRow();
	row.insertCell(0).innerHTML = x;
	row.insertCell(1).innerHTML = y;
	row.insertCell(2).innerHTML = isInside;
};

function selectX(arg, value) {
	document.getElementById("inputX").value = value;
};

function selectR(arg, value) {
	if (value <= 0) {
		alert("Incorrect R choice");
		arg.checked = false;
	}
	else {
		r = value;
		document.getElementById("inputR").value = value;
		updatePoints(value);
	}
};