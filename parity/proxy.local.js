// Dev-server proxy for running the Angular app outside docker compose:
// API, auth, media and static requests go straight to Django on localhost:8000.
const target = process.env.MOLE_BACKEND || 'http://localhost:8000';

module.exports = ['/api', '/api-auth-token', '/media', '/static'].map((path) => ({
  context: [path],
  target,
  secure: false,
  changeOrigin: true,
}));
