export const environment = {
  production: process.env['NODE_ENV'] === 'production',
  apiUrl: process.env['NODE_ENV'] === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
}
