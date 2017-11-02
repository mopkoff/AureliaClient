import {AuthService} from 'paulvanbladel/aureliauth';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {hashCode} from 'hashcode';
 
let httpClient = new HttpClient();
@inject(AuthService)
export class Signin {
  
  heading = 'Sign in';

  // User inputs will be bound to these view models
  // and when submitting the form for login  
  login = '';
  password = '';
  constructor(auth) {
	this.auth = auth;
  };
	hash ='';
	
   signin2() {
   this.hash = hashCode().value( this.password ); 
  	this.user = {
	  username: this.login,
	  passwordHash: this.hash
	};
      httpClient.fetch('http://localhost:8080/lab9/api/login/signin', {
         method: "POST",
         body: JSON.stringify(this.user),
		  headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })		
      .then(response => response.json())
      .then(data => {
		localStorage.setItem("token", data);
		localStorage.setItem("login", this.login);
		console.log("success loddeg " + data);
		this.auth.login(this.login, this.hash);
		window.location.replace('http://127.0.0.1:9000/#/points');
      }); 	
	}
	
   signin() {
   this.hash = hashCode().value( this.password ); 
		return this.auth.login(this.login, this.hash)
		.then(response=>{
			console.log("success logged" + response.response);			
			let parsedResponse = JSON.parse(response.response);
			
			localStorage.setItem("token", parsedResponse.auth_token);
			console.log("success logged " + localStorage.getItem("token"));			
		})
		.catch(err=>{
			{
            console.log("login failure : " + err);    
            };
			
		});
	};

	
	authenticate(name){
		let a =  this.auth.authenticate(name, false, null);
		return a
		.then((response)=>{
			
			console.log("success logged" + response.response);			
			let parsedResponse = JSON.parse(response.response);
			
			localStorage.setItem("token", parsedResponse.auth_token);
			console.log("success logged " + localStorage.getItem("token"));	
		});
   }
}