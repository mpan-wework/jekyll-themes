const { execSync } = require('child_process');
const path = require('path');
const packageDir = path.resolve(__dirname, '..', process.argv[2]);
const packageJson = require(path.resolve(packageDir, 'package.json'));

Promise.resolve()
  .then(() => {
    console.info(execSync(
      `git commit package.json package-lock.json -m "${packageJson.name}@${packageJson.version}"`,
      { cwd: packageDir },
    ).toString());
  });
