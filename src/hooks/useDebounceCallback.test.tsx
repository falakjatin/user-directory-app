import { renderHook, act } from '@testing-library/react';
import useDebounceCallback from './useDebounceCallback';

jest.useFakeTimers();

describe('useDebounceCallback', () => {
    test('calls the callback after delay', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounceCallback(callback, 500));

        // Call debounced function
        act(() => {
            result.current('hello');
        });

        // Should not be called immediately
        expect(callback).not.toHaveBeenCalled();

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(callback).toHaveBeenCalledWith('hello');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('resets timer if called again before delay', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounceCallback(callback, 500));

        act(() => {
            result.current('first');
            jest.advanceTimersByTime(300);
            result.current('second'); // should cancel 'first'
            jest.advanceTimersByTime(300);
        });

        expect(callback).not.toHaveBeenCalled(); // only 300ms so far

        act(() => {
            jest.advanceTimersByTime(200); // total 500ms since second call
        });

        expect(callback).toHaveBeenCalledWith('second');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('clears timeout on unmount', () => {
        const callback = jest.fn();
        const { result, unmount } = renderHook(() => useDebounceCallback(callback, 500));

        act(() => {
            result.current('test');
        });

        unmount();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();
    });
});
