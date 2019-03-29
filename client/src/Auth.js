import auth0 from 'auth0-js';

export default class Auth {
  constructor(env) {
    this.env = env
  };

  auth0 = new auth0.WebAuth({
    domain: 'throbbing-morning-3404.auth0.com',
    clientID: 'ElO3l4IUWo7JURIy3Yptux9orLv4rQfD',
    redirectUri: this.env === 'production' ? 'https://youth-forum-registration.herokuapp.com/admin' : 'http://localhost:3000/admin',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}