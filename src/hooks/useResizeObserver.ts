import { useEffect, useRef } from "react";

// type for the callback function
export type ResizeObserverCallback = (entry: ResizeObserverEntry) => void;

export default function useResizeObserver(
  targetRef: React.RefObject<HTMLElement | SVGElement | null>,
  callback: ResizeObserverCallback
) {
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (targetRef.current) {
      // Initialize the observer with the callback
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          callback(entry);
        }
      });

      // Start observing the target element
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      // Cleanup: Disconnect the observer when the component is unmounted or the target changes
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef, callback]);
}
