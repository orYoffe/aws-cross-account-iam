import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home page', () => {
  it('renders validate mode by default', () => {
    render(<Home />);
    expect(screen.getByText(/Validate and generate cross-account IAM policies/)).toBeInTheDocument();
    // The first button is the mode switch, the second is the action
    const buttons = screen.getAllByText('Validate');
    expect(buttons[0]).toBeDisabled();
    expect(screen.getByText('Generate')).not.toBeDisabled();
  });

  it('shows result after validation', async () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText('Policy 1 (JSON)'), { target: { value: '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["arn:aws:iam::222222222222:root"]},"Action":["sts:AssumeRole"],"Resource":["*"]}]}' } });
    fireEvent.change(screen.getByPlaceholderText('Policy 2 (JSON)'), { target: { value: '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["arn:aws:iam::222222222222:root"]},"Action":["sts:AssumeRole"],"Resource":["*"]}]}' } });
    // The second Validate button is the action
    const buttons = screen.getAllByText('Validate');
    fireEvent.click(buttons[1]);
    await waitFor(() => {
      expect(screen.getByText(/Policy 1:/)).toBeInTheDocument();
      expect(screen.getByText(/Policy 2:/)).toBeInTheDocument();
    });
  });

  it('switches to generate mode and shows result', async () => {
    render(<Home />);
    // Switch to generate mode
    fireEvent.click(screen.getAllByText('Generate')[0]);
    fireEvent.change(screen.getByPlaceholderText('Resource ARN or JSON'), { target: { value: 'arn:aws:s3:::mybucket/*' } });
    fireEvent.change(screen.getByPlaceholderText('Account 1 ID'), { target: { value: '111111111111' } });
    fireEvent.change(screen.getByPlaceholderText('Account 2 ID'), { target: { value: '222222222222' } });
    // Find all Generate buttons and click the enabled one
    const buttons = screen.getAllByRole('button', { name: 'Generate' });
    const actionButton = buttons.find(btn => !btn.disabled);
    fireEvent.click(actionButton);
    // Look for a key string in the JSON output
    expect(screen.getByText((content) => content.includes('"Version": "2012-10-17"'))).toBeInTheDocument();
  });
});
