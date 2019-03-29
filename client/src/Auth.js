import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'throbbing-morning-3404.auth0.com',
    clientID: 'ElO3l4IUWo7JURIy3Yptux9orLv4rQfD',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}