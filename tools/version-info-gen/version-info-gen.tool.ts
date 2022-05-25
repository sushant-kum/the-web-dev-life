const { resolve, relative } = require('path');
const chalk = require('chalk');
const { Command } = require('commander');
const { writeFileSync } = require('fs-extra');

const { version } = require('../../package.json');

const cli = new Command();

const options = cli
  .option('-t, --tag <version-tag>', 'version tag for generation of version-info files', version)
  .option('-d, --dev', "dev mode adds '.dev' at end of the tag", false)
  .parse(process.argv)
  .opts();

const versionInfo = {
  version: `${options.tag}${options.dev ? '.dev' : ''}`,
  buildTimestamp: new Date().toString(),
};

// Write version info to `src\environments\version-info.ts`
const envFile = resolve(__dirname, '..', '..', 'src', 'environments', 'version-info.ts');
writeFileSync(
  envFile,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* eslint-disable prettier/prettier */
export const VERSION = ${JSON.stringify(versionInfo, null, 2)};
`,
  { encoding: 'utf-8' }
);

console.log(
  `${chalk.gray('[VIG]')} Wrote${options.dev ? chalk.cyanBright(' dev') : ''} version info ${chalk.blueBright(
    versionInfo.version
  )} to ${chalk.blueBright(relative(resolve(__dirname, '..', '..'), envFile))}`
);

// Write version info to `src\assets\version-info.json`
const assetJsonFile = resolve(__dirname, '..', '..', 'src', 'assets', 'version-info.json');
writeFileSync(assetJsonFile, `${JSON.stringify(versionInfo, null, 2)}`, { encoding: 'utf-8' });

console.log(
  `${chalk.gray('[VIG]')} Wrote${options.dev ? chalk.cyanBright(' dev') : ''} version info ${chalk.blueBright(
    versionInfo.version
  )} to ${chalk.blueBright(relative(resolve(__dirname, '..', '..'), assetJsonFile))}`
);
