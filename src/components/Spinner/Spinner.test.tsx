import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

test('renders spinner and loading text', () => {
    render(<Spinner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
});
