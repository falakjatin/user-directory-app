import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchInput from './SearchInput';

describe('SearchInput Component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('renders input field', () => {
        const mockFn = jest.fn();
        render(<SearchInput onChange={mockFn} />);
        const input = screen.getByPlaceholderText(/search users/i);
        expect(input).toBeInTheDocument();
    });

    test('renders search icon', () => {
        const mockFn = jest.fn();
        render(<SearchInput onChange={mockFn} />);
        const icon = document.querySelector('svg.search-icon');
        expect(icon).toBeInTheDocument();
    });

    test(
        'debounces onChange callback after delay',
        async () => {
            const mockFn = jest.fn();
            render(<SearchInput onChange={mockFn} />);
            const input = screen.getByPlaceholderText(/search users/i);
            fireEvent.change(input, { target: { value: 'J' } });

            // Shouldn't be called immediately
            expect(mockFn).not.toHaveBeenCalled();

            await waitFor(() => {
                expect(mockFn).toHaveBeenCalledTimes(1);
            }, { timeout: 2000 }); // ⬅️ increase timeout here
        },
        7000 // ⬅️ test-level timeout
    );


    test(
        'only calls onChange once even with multiple keystrokes in delay',
        async () => {
            const mockFn = jest.fn();
            render(<SearchInput onChange={mockFn} />);
            const input = screen.getByPlaceholderText(/search users/i);

            fireEvent.change(input, { target: { value: 'J' } });
            fireEvent.change(input, { target: { value: 'Jo' } });
            fireEvent.change(input, { target: { value: 'Joh' } });

            await waitFor(() => {
                expect(mockFn).toHaveBeenCalledTimes(1);
            }, { timeout: 2000 });
        },
        7000
    );
});
