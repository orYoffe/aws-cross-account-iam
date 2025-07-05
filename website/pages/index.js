import React from 'react';
import { useState } from 'react';
import { generatePolicy } from '../../shared/generate';

export default function Home() {
  const [policy1, setPolicy1] = useState('');
  const [policy2, setPolicy2] = useState('');
  const [resource, setResource] = useState('');
  const [account1, setAccount1] = useState('');
  const [account2, setAccount2] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('validate');

  async function handleValidate() {
    setResult('Validation is not available in the browser. Please use the CLI for validation.');
  }
  function handleGenerate() {
    if (!account2) { setResult('Account 2 ID required'); return; }
    const params = { accountId: account2, actions: ['sts:AssumeRole'], resources: resource ? [resource] : ['*'] };
    const policy = generatePolicy(params);
    setResult(JSON.stringify(policy, null, 2));
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h1>aws-cross-account-iam</h1>
      <p>Validate and generate cross-account IAM policies</p>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setMode('validate')} disabled={mode==='validate'}>Validate</button>
        <button onClick={() => setMode('generate')} disabled={mode==='generate'}>Generate</button>
      </div>
      {mode === 'validate' ? (
        <div>
          <textarea placeholder="Policy 1 (JSON)" value={policy1} onChange={e => setPolicy1(e.target.value)} rows={6} style={{ width: '100%' }} />
          <textarea placeholder="Policy 2 (JSON)" value={policy2} onChange={e => setPolicy2(e.target.value)} rows={6} style={{ width: '100%', marginTop: 8 }} />
          <button onClick={handleValidate} style={{ marginTop: 8 }}>Validate</button>
        </div>
      ) : (
        <div>
          <input placeholder="Resource ARN or JSON" value={resource} onChange={e => setResource(e.target.value)} style={{ width: '100%' }} />
          <input placeholder="Account 1 ID" value={account1} onChange={e => setAccount1(e.target.value)} style={{ width: '100%', marginTop: 8 }} />
          <input placeholder="Account 2 ID" value={account2} onChange={e => setAccount2(e.target.value)} style={{ width: '100%', marginTop: 8 }} />
          <button onClick={handleGenerate} style={{ marginTop: 8 }}>Generate</button>
        </div>
      )}
      {result && <pre style={{ marginTop: 16, background: '#f5f5f5', padding: 16 }}>{result}</pre>}
    </div>
  );
}
