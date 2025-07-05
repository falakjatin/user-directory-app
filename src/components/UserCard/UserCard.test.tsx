import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

test('displays name, phone, and company', () => {
    render(<UserCard name="Alice" phone="555-1234" companyName="TechCorp" />);
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/555-1234/i)).toBeInTheDocument();
    expect(screen.getByText(/techcorp/i)).toBeInTheDocument();
});

test('phone link uses tel', () => {
    render(<UserCard name="Bob" phone="123-4567" companyName="Inc" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('tel:'));
});
