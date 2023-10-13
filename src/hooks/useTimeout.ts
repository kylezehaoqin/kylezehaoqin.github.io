import { useCallback, useEffect, useRef } from "react";

// Define the type for the callback function
type Callback = () => void;

export default function useTimeout(callback: Callback, delay: number) {
  // Use useRef to store the callback function and timeout ID
  const callbackRef = useRef<Callback>(callback);
  const timeoutRef = useRef<number | undefined>();

  // Update the callback ref on each render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Define set and clear functions using useCallback to prevent unnecessary re-renders
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Set the timeout on mount and clear it on unmount
  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  // Define a reset function to clear and set the timeout
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  // Return the reset and clear functions for use in the component
  return { reset, clear };
}
