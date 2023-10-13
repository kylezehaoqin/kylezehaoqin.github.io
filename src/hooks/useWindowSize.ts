import { useState, useCallback } from "react"
import useEventListener from "./useEventListener"
import useDebounce from "./useDebounce"

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Threshold values for width and height
  const WIDTH_THRESHOLD = 40;  // Example threshold values, adjust as needed
  const HEIGHT_THRESHOLD = 40;

  // Create a function to update the window size
  const updateSize = useCallback(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Check if the difference exceeds the threshold
    if (Math.abs(newWidth - windowSize.width) > WIDTH_THRESHOLD ||
        Math.abs(newHeight - windowSize.height) > HEIGHT_THRESHOLD) {
      setWindowSize({ width: newWidth, height: newHeight });
    }
  }, [windowSize.width, windowSize.height]);

  // Debounce the update size function to avoid too many updates
  // during rapid window resizing
  useDebounce(updateSize, 200, []);

  // Add the event listener for the resize event
  useEventListener("resize", updateSize);

  return windowSize
}
