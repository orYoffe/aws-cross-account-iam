// shared/generate.js
// Browser-safe shared logic for generating IAM policies

export function generatePolicy(params) {
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
