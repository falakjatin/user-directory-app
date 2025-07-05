import { useCallback, useRef, useEffect } from 'react';

function useDebounceCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number = 500
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedFn = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedFn;
}

export default useDebounceCallback;
