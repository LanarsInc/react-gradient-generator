import { useEffect, useRef } from 'react';

const useOutsideClick = (
  callback: () => void,
  excludedElement?: HTMLDivElement | null
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (excludedElement && event.target === excludedElement) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, excludedElement]);

  return ref;
};

export default useOutsideClick;
