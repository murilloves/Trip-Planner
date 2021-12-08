import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders app name', async () => {
  render(<App />);
  const appName = screen.getByText(/Trip Planner/i);
  await waitFor(() => {
    expect(appName).toBeInTheDocument();
  });
});
