#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const { validatePolicy, generatePolicy } = require('../shared/iam');

program
  .name('aws-cross-account-iam')
  .description('Validate and generate cross-account IAM policies')
  .version('1.0.0');

program
  .command('validate')
  .description('Validate an IAM policy using pbac')
  .requiredOption('--policy <policy>', 'IAM policy (file path or JSON string)')
  .action(async (opts) => {
    let policy = opts.policy;
    try { policy = fs.readFileSync(policy, 'utf8'); } catch {}
    let policyObj;
    try { policyObj = JSON.parse(policy); } catch (e) {
      console.error('Invalid policy JSON:', e.message);
      process.exit(1);
    }
    const result = await validatePolicy(policyObj);
    if (result.isValid) {
      console.log('Policy is valid.');
    } else {
      console.error('Policy is invalid:', result.errors);
    }
    if (process.env.DEBUG) {
      console.error('[DEBUG]', result.debug);
    }
  });

program
  .command('generate')
  .alias('g')
  .description('Generate a cross-account IAM policy')
  .requiredOption('--accountId <accountId>', 'AWS account ID for Principal')
  .option('--actions <actions>', 'Comma-separated list of actions', 'sts:AssumeRole')
  .option('--resources <resources>', 'Comma-separated list of resources', '*')
  .action((opts) => {
    const params = {
      accountId: opts.accountId,
      actions: opts.actions.split(','),
      resources: opts.resources.split(',')
    };
    const policy = generatePolicy(params);
    console.log(JSON.stringify(policy, null, 2));
  });

program.parse(process.argv);
