import { useState, useEffect } from "react";

/**
 * Custom hook để debounce một giá trị.
 *
 * @param {any} value - Giá trị cần debounce.
 * @param {number} delay - Thời gian debounce (ms).
 * @returns {any} Giá trị đã được debounce.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt timeout để cập nhật giá trị debounce
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Xóa timeout khi giá trị hoặc delay thay đổi
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
