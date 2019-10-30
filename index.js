const core = require('@actions/core');
const Diawi = require('./diawi.js');

async function run() {
  try {
    const opts = {
      token: core.getInput('token'),
      path: core.getInput('file'),
      password: core.getInput('password'),
      callback_emails: core.getInput('recipients'),
      wall_of_apps: core.getInput('wall_of_apps') === true ? 1 : 0,
      installation_notifications: core.getInput('installation_notifications') === true ? 1 : 0,
      find_by_udid: core.getInput('find_by_udid') === true ? 1 : 0,
      comment: core.getInput('comment'),
    };
    console.log(`Parameters: ${opts}`)

    const diawiCommand = new Diawi(opts)
    .on('complete', function (url) {
      console.log(url);
      core.setOutput('url', url);
    })
    .on('error', function (error) {
      console.error('Failed: ', error);
      process.exit(1);
      core.setFailed(error.message);
    });

    if (!core.getInput('dry-run')) {
      diawiCommand.execute();
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()