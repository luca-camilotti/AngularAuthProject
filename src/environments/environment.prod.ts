// Production enviroment
// ng serve --prod
// ng build --prod

export const environment = {
  production: true,
  debug: false,
  // URL of production API:
  baseUrl: 'http://localhost:8080',
  apiPath: '/api/',
  // Authentication resources:
  loginPath: 'login',
  registerPath: 'signup',
  refreshtokenPath: 'token/refresh',

  // Response code:
  tokenExpired: 401,  // auth token is expired
  sessionExpired: 403  // also the refresh token is expired

};
