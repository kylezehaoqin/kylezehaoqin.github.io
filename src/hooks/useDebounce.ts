import { useEffect, DependencyList } from "react";
import useTimeout from "./useTimeout";

// Define the type for the callback function
type Callback = () => void;

export default function useDebounce(
  callback: Callback,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay);

  // Reset the timeout every time a dependency changes
  useEffect(reset, [...dependencies, reset]);

  // Clear the timeout when the component is unmounted
  useEffect(clear, [clear]);
}
