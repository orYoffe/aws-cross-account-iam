# aws-cross-account-iam
aws-cross-account-iam validator

a simple website and npm cli package to validate cross-account IAM policies,
given terraform code of 2 aws iam policies from different accounts it can validate the policies
and check if the policies allow cross-account access properly
of given 2 aws iam policies from different accounts it can validate the policies
and check if the policies allow cross-account access properly
given a resource in one account it can generate the required policy for both accounts in order to enable access from one account to another

## Usage
### npm package

```bash
npm install -g aws-cross-account-iam
```
### cli

```bash
aws-cross-account-iam --help
```
### website
visit [aws-cross-account-iam](https://aws-cross-account-iam.vercel.app)
## Development
### Prerequisites
- Node.js
- npm
### Setup
```bash
git clone
cd aws-cross-account-iam
npm install
```
### Running the app
```bash
npm run dev
```
### Running tests
```bash
npm run test
```
### Building the app
```bash
npm run build
```
### Linting
```bash
npm run lint
```
### Formatting
```bash
npm run format
```
### Publishing the package
```bash
npm run build
npm publish
```
### Contributing
Feel free to open issues or pull requests. Contributions are welcome!
### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
### Contact
For any questions or feedback, please open an issue on the GitHub repository or contact the maintainer.

## Features
- Validate cross-account IAM policies
- Generate required policies for cross-account access
- Simple CLI and web interface
- Open source and community-driven

## Examples
### Validate Cross-Account Access
```bash
aws-cross-account-iam validate --policy1 <path_to_policy1> --policy2 <path_to_policy2>
```

With policies in string format:
```bash
aws-cross-account-iam validate --policy1 '{"Version": "2012-10-17", "Statement": [{"Effect": "Allow","Action": ["s3:GetObject"],"Resource": "arn:aws:s3:::mybucket/*"}]}' --policy2 '{"Version": "2012-10-17", "Statement": [{"Effect": "Allow","Action": ["s3:PutObject"],"Resource": "arn:aws:s3:::mybucket/*"}]}'
```

### Generate Cross-Account Policy
```bash
aws-cross-account-iam generate --resource <resource_arn> --account1 <account1_id> --account2 <account2_id>
```

With resource in string format:
```bash
aws-cross-account-iam generate --resource '{"arn": "arn:aws:s3:::mybucket/*"}' --account1 <account1_id> --account2 <account2_id>
```






