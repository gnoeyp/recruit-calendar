import { useEffect, useRef, useState } from 'react';

export default function useCalendarHeader(headerHeight: number, maxLength = 5) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [headerIndex, setTopIndex] = useState(0);

  // XXX:
  // - 직접적인 DOM 조작. 개선 여지 있을지 고민해보기
  // - HEADER_HEIGHT 계산 방법 있는지
  useEffect(() => {
    const eventListener = () => {
      const topElement = contentWrapperRef.current?.children[headerIndex];
      const topOffset = topElement?.getBoundingClientRect().top ?? 0;
      if (topOffset > headerHeight && headerIndex > 0) {
        setTopIndex(headerIndex - 1);
      }

      const secondTopElement =
        contentWrapperRef.current?.children[headerIndex + 1];
      const secondTopOffset =
        secondTopElement?.getBoundingClientRect().top ?? 0;
      if (secondTopOffset < headerHeight && headerIndex < maxLength - 1) {
        setTopIndex(headerIndex + 1);
      }
    };
    window.addEventListener('scroll', eventListener);
    return () => {
      window.removeEventListener('scroll', eventListener);
    };
  }, [headerIndex]);

  return {
    contentWrapperRef,
    headerIndex,
  };
}
