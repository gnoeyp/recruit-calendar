import { useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { kMaxLength } from 'buffer';

type CarouselDialogProps<T> = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dataSource: T[];
  render: (data: T) => React.ReactNode;
};

export default function CarouselDialog<DataType>({
  open,
  onOpenChange,
  dataSource,
  render,
}: CarouselDialogProps<DataType>) {
  const [current, setCurrent] = useState(0);
  const [animation, setAnimation] = useState<'prev' | 'next' | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const goPrevious = () => {
    if (current === 0) return;
    if (animation !== null) return;

    const element = ref.current;
    const eventHandler = () => {
      setCurrent(current - 1);
      setAnimation(null);
      element?.removeEventListener('animationend', eventHandler);
    };
    element?.addEventListener('animationend', eventHandler);

    setAnimation('prev');
  };
  const goNext = () => {
    if (current === dataSource.length - 1) return;
    if (animation !== null) return;
    const element = ref.current;

    const eventHandler = () => {
      setCurrent(current + 1);
      setAnimation(null);
      element?.removeEventListener('animationend', eventHandler);
    };
    element?.addEventListener('animationend', eventHandler);

    setAnimation('next');
  };

  const handleClick = () => {
    onOpenChange?.(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 bg-black pb-10 bg-opacity-50 z-50 flex justify-center overflow-y-scroll"
          onClick={handleClick}
        >
          <button
            onClick={(e) => {
              goPrevious();
              e.stopPropagation();
            }}
            className="text-3xl"
          >
            <FaChevronLeft />
          </button>
          <div
            className="relative top-10 h-max bg-white min-h-52 w-[900px] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={ref}
              className={classNames(
                'relative  h-max flex w-[2700px] -left-[900px]',
                {
                  'animate-carousel-prev': animation === 'prev',
                  'animate-carousel-next': animation === 'next',
                },
              )}
            >
              <div className="w-[900px] h-max">
                {current > 0 &&
                  dataSource.length > current - 1 &&
                  render(dataSource[current - 1])}
              </div>
              <div className="w-[900px] h-max">
                {dataSource.length > current && render(dataSource[current])}
              </div>
              <div className="w-[900px] h-max">
                {dataSource.length > current + 1 &&
                  render(dataSource[current + 1])}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              goNext();
              e.stopPropagation();
            }}
            className="text-3xl"
          >
            <FaChevronRight />
          </button>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
