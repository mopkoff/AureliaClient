// Specific settings for our application's
// authentication context. These will override
// the default settings provided by aureliauth
/*
var baseConfig  = {
	endpoint: 'auth',             // use 'auth' endpoint for the auth server
    configureEndpoints: ['auth'], // add Authorization header to 'auth' endpoint

  // Our Node API is being served from localhost:3001
  baseUrl: 'http://localhost:8080',
  // The API specifies that new users register at the POST /users enpoint
  signupUrl: 'points',
  // Logins happen at the POST /sessions/create endpoint
  loginUrl: 'lab9/api/login/signin',
  // The API serves its tokens with a key of id_token which differs from
  // aureliauth's standard
  tokenName: 'id_token',
  // Once logged in, we want to redirect the user to the welcome view
  loginRedirect: '#/welcome',

}
*/
var config = {
	httpInterceptor: false,
	baseUrl: 'http://localhost:8080/lab9/api/',	
    endpoint: 'xd',
    loginRedirect: '/#welcome',
	logoutRedirect: '/#signin',
    configureEndpoints: ['xd', 'protected-api'],
    loginUrl: '/login/signin',  
    signupUrl: '/login/signup',
    tokenName: 'auth_token',
    tokenPrefix: 'aurelia',
    profileUrl: 'me',
    unlinkUrl: 'me/unlink',
    loginOnSignup: true,
    storageChangedReload: true,    // ensure secondary tab reloading after auth status changes
    expiredRedirect: 1,            // redirect to logoutRedirect after token expiration
    providers: {
        google: {
          url: '/login/google',
          clientId: '823382342152-4c3nv16fba34akfulcjpl04rj3anki3j.apps.googleusercontent.com'
        },
        facebook:{
          url: 'facebook',
          clientId: '1465278217541708498'
        }
    }
};
/*
var configForDevelopment = {
	
    providers: {
        google: {
            clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
        }
        ,
        linkedin:{
            clientId:'778mif8zyqbei7'
        },
        facebook:{
            clientId:'1452782111708498'
        }
    }
};

var configForProduction = {
	
    providers: {
        google: {
            clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
        }
        ,
        linkedin:{
            clientId:'7561959vdub4x1'
        },
        facebook:{
            clientId:'1653908914832509'
        }

    }
};
var config ;
if (window.location.hostname==='localhost') {
	config = configForDevelopment;
}
else{
	
	config = configForProduction;
}
*/

export default config;