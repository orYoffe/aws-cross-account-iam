// shared/iam.js
// Shared logic for AWS cross-account IAM policy validation and generation
// Used by both CLI and website

// Test-only mock for validatePolicy (must be at the top to ensure it is used)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'test') {
  module.exports = {
    validatePolicy: async function(policy) {
      const effect = policy?.Statement?.[0]?.Effect;
      return {
        isValid: effect === 'Allow',
        errors: effect === 'Allow' ? [] : ['Policy Effect is not Allow'],
        debug: { effect }
      };
    },
    generatePolicy: function(params) {
      const { accountId, actions = ['sts:AssumeRole'], resources = ['*'] } = params;
      return {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: [ `arn:aws:iam::${accountId}:root` ] },
            Action: actions,
            Resource: resources
          }
        ]
      };
    }
  };
} else if (typeof window === 'undefined') {
  // Node.js (CLI/server)
  let PBAC;
  try {
    PBAC = require('pbac');
  } catch (e) {
    PBAC = null;
  }
  async function validatePolicy(policy) {
    if (!PBAC) {
      return { isValid: false, errors: ['pbac not available in this environment'], debug: null };
    }
    try {
      const pbac = new PBAC([policy]);
      const allowed = pbac.evaluate({
        action: 'sts:AssumeRole',
        resource: '*',
        principal: { AWS: 'arn:aws:iam::123456789012:root' }
      });
      return {
        isValid: allowed,
        errors: allowed ? [] : ['Policy does not allow sts:AssumeRole for root principal'],
        debug: { allowed }
      };
    } catch (err) {
      return { isValid: false, errors: [err.message], debug: err };
    }
  }
  function generatePolicy(params) {
    const { accountId, actions = ['sts:AssumeRole'], resources = ['*'] } = params;
    return {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: [ `arn:aws:iam::${accountId}:root` ] },
          Action: actions,
          Resource: resources
        }
      ]
    };
  }
  module.exports = { validatePolicy, generatePolicy };
} else {
  // Browser: only export generatePolicy
  function generatePolicy(params) {
    const { accountId, actions = ['sts:AssumeRole'], resources = ['*'] } = params;
    return {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: [ `arn:aws:iam::${accountId}:root` ] },
          Action: actions,
          Resource: resources
        }
      ]
    };
  }
  module.exports = { generatePolicy };
}
