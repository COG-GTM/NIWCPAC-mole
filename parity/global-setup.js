// Creates a fresh, timestamped Mole user with a random password for this run.
// The password only lives in parity/.auth/user.json (git-ignored).
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const username = `parity_${Date.now()}`;
  const password = crypto.randomBytes(18).toString('base64url');
  const py = [
    'from data_collection.factories import factories',
    'from data_collection import models',
    `u = factories.UserFactory(username="${username}", password="${password}")`,
    'role = models.Role.objects.get(name="Other")',
    'factories.UserProfileFactory(user=u, current_role=role)',
    'factories.TesterFactory(user=u, role=role)',
  ].join('; ');
  execFileSync('docker', ['compose', 'exec', '-T', 'django', 'python', 'manage.py', 'shell', '-c', py], {
    cwd: path.resolve(__dirname, '..'),
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  fs.mkdirSync(path.join(__dirname, '.auth'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, '.auth', 'user.json'), JSON.stringify({ username, password }));
};
