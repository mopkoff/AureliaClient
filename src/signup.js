import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {hashCode} from 'hashcode';
import {AuthService} from 'paulvanbladel/aureliauth';

let httpClient = new HttpClient();

@inject(AuthService)
export class Signup {
  
  heading = 'Sign Up';

  // These view models will be given values
  // from the signup form user input
  login = '';
  password = '';
  constructor(auth) {
    this.auth = auth;
  };

	hash ='';

signup() {
   this.hash = hashCode().value( this.password ); 
	return this.auth.signup("name", this.login, this.hash)
	.then(response=>{
		console.log("success singed up");				
	})
	.catch(err=>{
		//err.json().then(function(e)
		{
		console.log("sign up failure : " + err);    
		};
		
	});
	//console.log(a);
};
	
   signup2() {
   this.hash = hashCode().value( this.password ); 
  	this.user = {
	  username: this.login,
	  passwordHash: this.hash
	};
      httpClient.fetch('http://localhost:8080/lab9/api/login/signup', {
         method: "POST",
         body: JSON.stringify(this.user),
		  headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })		
      .then(response => response.json())
      .then(data => {
         console.log(data);
      });
   }
}