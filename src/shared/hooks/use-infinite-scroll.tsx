import { useState, useRef, useEffect } from 'react';

type Args = {
  callback: () => void;
};

export const useInfiniteScroll = ({ callback }: Args) => {
  const [observerElement, setObserverElement] = useState<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!observerElement) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        threshold: 1.0,
      },
    );

    observer.current.observe(observerElement);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [observerElement, callback]);

  return { setObserverElement };
};
