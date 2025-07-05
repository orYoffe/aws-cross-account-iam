const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('CLI', () => {
  const cliPath = path.resolve(__dirname, '../index.js');
  const validPolicy = JSON.stringify({
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: { AWS: ['arn:aws:iam::222222222222:root'] },
      Action: ['sts:AssumeRole'],
      Resource: ['*']
    }]
  });
  // Invalid for simulation, but valid schema
  const invalidPolicy = JSON.stringify({
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Deny',
      Principal: { AWS: ['arn:aws:iam::222222222222:root'] },
      Action: ['sts:AssumeRole'],
      Resource: ['*']
    }]
  });
  const accountId = '222222222222';

  function writeTemp(content, filename) {
    const filePath = path.resolve(__dirname, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  it('should validate a valid policy', () => {
    const policyPath = writeTemp(validPolicy, 'policy.json');
    const result = spawnSync('node', [cliPath, 'validate', '--policy', policyPath], { encoding: 'utf8', env: { ...process.env, NODE_ENV: 'test' } });
    expect(result.stdout + result.stderr).toMatch(/Policy is valid/);
    fs.unlinkSync(policyPath);
  });

  it('should detect invalid policy', () => {
    const policyPath = writeTemp(invalidPolicy, 'invalid.json');
    const result = spawnSync('node', [cliPath, 'validate', '--policy', policyPath], { encoding: 'utf8', env: { ...process.env, NODE_ENV: 'test' } });
    expect(result.stdout + result.stderr).toMatch(/invalid/);
    fs.unlinkSync(policyPath);
  });

  it('should generate a policy as JSON with generate', () => {
    const result = spawnSync('node', [cliPath, 'generate', '--accountId', accountId], { encoding: 'utf8', env: { ...process.env, NODE_ENV: 'test' } });
    const obj = JSON.parse(result.stdout);
    expect(obj.Version).toBe('2012-10-17');
    expect(Array.isArray(obj.Statement)).toBe(true);
  });

  it('should generate a policy as JSON with shorthand g', () => {
    const result = spawnSync('node', [cliPath, 'g', '--accountId', accountId], { encoding: 'utf8', env: { ...process.env, NODE_ENV: 'test' } });
    const obj = JSON.parse(result.stdout);
    expect(obj.Version).toBe('2012-10-17');
    expect(Array.isArray(obj.Statement)).toBe(true);
  });

  it('should allow output redirection to a file', () => {
    const outFile = path.resolve(__dirname, 'policy.json');
    spawnSync('node', [cliPath, 'g', '--accountId', accountId], { encoding: 'utf8', stdio: ['ignore', fs.openSync(outFile, 'w'), 'ignore'], env: { ...process.env, NODE_ENV: 'test' } });
    const fileContent = fs.readFileSync(outFile, 'utf8');
    const obj = JSON.parse(fileContent);
    expect(obj.Version).toBe('2012-10-17');
    fs.unlinkSync(outFile);
  });
});
