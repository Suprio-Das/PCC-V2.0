import React, { useEffect } from 'react';

type OutsideClickHandler = (event: Event) => void;

export const UseOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: OutsideClickHandler) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
