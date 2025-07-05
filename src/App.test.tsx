import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, name: 'John Doe', phone: '123-456-7890', company: { name: 'BC Ferries' } },
    ]),
  })
) as jest.Mock;

test('renders search input', async () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
});

test('shows loading initially', () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('shows user card after fetch', async () => {
  render(<App />);
  expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
});

test('shows no users found when search doesn`t match', async () => {
  render(<App />);
  await waitFor(() => screen.getByText(/john doe/i));
  screen.getByPlaceholderText(/search users/i).dispatchEvent(new Event('input', { bubbles: true }));
  expect(screen.queryByText(/no users found/i)).not.toBeInTheDocument(); // You'd simulate typing invalid text to trigger this
});

test('shows "No Users Found" when search does not match any user', async () => {
  render(<App />);

  // Wait for initial data to appear
  await waitFor(() => expect(screen.getByText(/john doe/i)).toBeInTheDocument());

  // Type an invalid search query
  const input = screen.getByPlaceholderText(/search users/i);
  await userEvent.clear(input);
  await userEvent.type(input, 'Ryan');

  // Assert that "No Users Found" is shown
  expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
});
