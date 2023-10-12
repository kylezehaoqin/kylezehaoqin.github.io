import { useEffect, useRef, MutableRefObject } from "react";

// Define the type for the callback function
type EventCallback = (event: Event) => void;

// Define the type for the element parameter, which could be either a window or an HTMLElement
type EventElement = Window | HTMLElement | null;

export default function useEventListener(
  eventType: string, // Specify that eventType should be a string
  callback: EventCallback, // Use the EventCallback type for callback
  element: EventElement = window // Specify that element should be of type EventElement and default to window
) {
  // Use MutableRefObject<EventCallback> to allow the ref to hold a callback function
  const callbackRef: MutableRefObject<EventCallback> = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    // Specify that e should be of type Event
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    // Specify the return type of the cleanup function
    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}