import { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 위치에 따라 캘린더 헤더의 visibility를 판단하여 몇 번째 헤더가 표시되어야 할지를 관리하는 훅입니다.
 *
 * @param {number} headerHeight - visibility를 판단하는 데 사용되는 헤더의 높이입니다.
 * @returns {object} 다음을 포함하는 객체를 반환합니다:
 * - `contentWrapperRef` (React.RefObject<HTMLDivElement>): 콘텐츠 래퍼 요소에 대한 ref입니다. 콘텐츠는 element의 array입니다.
 * - `headerIndex` (number): 현재 표시되어야 하는 헤더의 인덱스입니다.
 *
 * @example
 * const { contentWrapperRef, headerIndex } = useCalendarHeader(100);
 *
 * const header = headerIndex < weeks.length ? headers[headerIndex] : [];
 *
 *
 * <div>
 *  // do something with the header (e.g. render a sticky header)
 * </div>
 * <div ref={contentWrapperRef}>
 *  {rows.map((row, index) => (
 *    <div>
 *      <div>
 *        // 높이 100인 헤더
 *      </div>
 *      <div>
 *        // 콘텐츠
 *      </div>
 *    </div>
 *  )}
 * </div>
 */
export default function useCalendarHeader(headerHeight: number) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [headerIndex, setHeaderIndex] = useState(0);

  const maxLength = contentWrapperRef.current?.children.length ?? 0;

  const isElementVisible = (element?: Element) => {
    if (!element) return false;
    const topOffset = element?.getBoundingClientRect().top ?? 0;
    return topOffset > headerHeight;
  };

  useEffect(() => {
    const eventListener = () => {
      const topElement = contentWrapperRef.current?.children[headerIndex];
      if (isElementVisible(topElement) && headerIndex > 0) {
        setHeaderIndex(headerIndex - 1);
        return;
      }

      if (headerIndex >= maxLength - 1) return;

      const secondTopElement =
        contentWrapperRef.current?.children[headerIndex + 1];
      if (!isElementVisible(secondTopElement)) {
        setHeaderIndex(headerIndex + 1);
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
