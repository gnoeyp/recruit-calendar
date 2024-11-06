'use client';

import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type CarouselDialogProps<T> = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dataSource: T[];
  render: (data: T) => React.ReactNode;
  current?: number;
  onChange?: (index: number) => void;
};

export default function CarouselDialog<DataType>({
  open,
  onOpenChange,
  dataSource,
  render,
  current = 0,
  onChange,
}: CarouselDialogProps<DataType>) {
  const [animation, setAnimation] = useState<'prev' | 'next' | null>(null);

  const goPrevious = () => {
    if (current === 0) return;
    if (animation !== null) return;

    setAnimation('prev');
  };
  const goNext = () => {
    if (current === dataSource.length - 1) return;
    if (animation !== null) return;

    setAnimation('next');
  };

  const handleClick = () => {
    onOpenChange?.(false);
  };

  const handleAnimationEnd = () => {
    if (animation === 'prev') {
      onChange?.(current - 1);
      setAnimation(null);
    } else if (animation === 'next') {
      onChange?.(current + 1);
      setAnimation(null);
    }
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
            className="text-3xl fixed left-8 top-1/2 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center"
          >
            <FaChevronLeft color="#fff" />
          </button>
          <div
            className="relative top-10 h-max bg-white min-h-52 w-[900px] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={classNames(
                'relative  h-max flex w-[2700px] -left-[900px]',
                {
                  'animate-carousel-prev': animation === 'prev',
                  'animate-carousel-next': animation === 'next',
                },
              )}
              onAnimationEnd={handleAnimationEnd}
            >
              <div className="w-[900px] h-max max-h-52">
                {current > 0 &&
                  dataSource.length > current - 1 &&
                  render(dataSource[current - 1])}
              </div>
              <div className="w-[900px] h-max">
                {dataSource.length > current && render(dataSource[current])}
              </div>
              <div className="w-[900px] h-max max-h-52">
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
            className="text-3xl fixed right-8 top-1/2 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center"
          >
            <FaChevronRight color="#fff" />
          </button>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function CarouselDialogContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col pt-10 gap-5">{children}</div>;
}

export function CarouselDialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-10 py-5">{children}</div>;
}

export function CarouselDialogHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="font-medium text-lg mb-4">{children}</h2>;
}

export function CarouselDialogTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h1 className="font-semibold text-2xl mb-1">{children}</h1>;
}

export function CarouselDialogDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-gray-400">{children}</p>;
}
