import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {TaskQueue} from 'aurelia-framework';
import Chart from 'chart.js';

// Using Aurelia's dependency injection, we inject HttpClient
// with the @inject decorator to make HTTP requests
@inject(HttpClient)

export class Points {

	token ;
	heading = 'Points';	
	
	// View model that will be populated with the 
	// the random quote retrieved from the API and
	// displayed in the view

	constructor(http ) {		
		this.http = http;
		this.token = localStorage.getItem("token");		
		this.points = [];
	};
	
	addPoints(point){
		this.points.push(point);
	}
  activate() {
    return this.http.get('http://localhost:8080/lab9/api/points/' + this.token)
    .then(response => {		      
		this.points = JSON.parse(response.response);	  
		this.points.forEach(function(item, i, points) {
			if (item.isInside == 1)
				item.isInside = "Да";
			else
				item.isInside = "Нет";
		});
    })	
	.catch(error => {
      console.log('Error getting point' + error);
    });
  };
  
}