'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/utils/style';

const SLIDE_DELAY = 100;

enum CarouselAnimation {
  PREV = 'prev',
  NEXT = 'next',
  IDLE = 'idle',
}

type CarouselState = {
  prevIndex: number;
  currentIndex: number;
  nextIndex: number;
  animation: CarouselAnimation;
};

type CarouselDialogProps<T> = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dataSource: T[];
  render: (data: T) => React.ReactElement;
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
}: CarouselDialogProps<DataType>): React.ReactElement {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const [state, setState] = useState<CarouselState>({
    prevIndex: current - 1,
    currentIndex: current,
    nextIndex: current + 1,
    animation: CarouselAnimation.IDLE,
  });

  useEffect(() => {
    setState({
      prevIndex: current - 1,
      currentIndex: current,
      nextIndex: current + 1,
      animation: CarouselAnimation.IDLE,
    });
  }, [current]);

  const goPrevious = () => {
    if (state.currentIndex === 0) return;
    if (state.animation !== CarouselAnimation.IDLE) return;

    setState((prevState) => ({
      ...prevState,
      animation: CarouselAnimation.PREV,
    }));
  };

  const handleClick = () => {
    onOpenChange?.(false);
  };

  const handleAnimationEnd = () => {
    if (state.animation === CarouselAnimation.PREV) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.prevIndex,
      }));
    } else if (state.animation === CarouselAnimation.NEXT) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.nextIndex,
      }));
    }

    timeoutRef.current = setTimeout(() => {
      setState((prevState) => {
        return {
          ...prevState,
          prevIndex: prevState.currentIndex - 1,
          nextIndex: prevState.currentIndex + 1,
          animation: CarouselAnimation.IDLE,
        };
      });
    }, SLIDE_DELAY);
  };

  useEffect(() => {
    onChangeRef.current?.(state.nextIndex - 1);
  }, [state.nextIndex]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const goNext = () => {
    if (state.currentIndex === dataSource.length - 1) return;
    if (state.animation !== CarouselAnimation.IDLE) return;

    setState((prevState) => ({
      ...prevState,
      animation: CarouselAnimation.NEXT,
    }));
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 bg-black pb-10 bg-opacity-50 z-50 flex justify-center overflow-y-scroll"
          onClick={handleClick}
        >
          {current > 0 && (
            <button
              onClick={(e) => {
                goPrevious();
                e.stopPropagation();
              }}
              className="text-3xl fixed left-8 top-1/2 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center"
              aria-label="move to previous slide"
            >
              <FaChevronLeft color="#fff" />
            </button>
          )}
          <div
            className="relative top-10 h-max bg-white shadow-2xl min-h-screen w-[900px] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn('relative  h-max flex w-[2700px] -left-[900px]', {
                'animate-carousel-prev':
                  state.animation === CarouselAnimation.PREV,
                'animate-carousel-next':
                  state.animation === CarouselAnimation.NEXT,
              })}
              onAnimationEnd={handleAnimationEnd}
            >
              <div className="w-[900px] h-max max-h-52">
                {state.prevIndex >= 0 &&
                  dataSource.length > state.prevIndex &&
                  render(dataSource[state.prevIndex])}
              </div>
              <div className="w-[900px] h-max">
                {dataSource.length > state.currentIndex &&
                  render(dataSource[state.currentIndex])}
              </div>
              <div className="w-[900px] h-max max-h-52">
                {dataSource.length > state.nextIndex &&
                  render(dataSource[state.nextIndex])}
              </div>
            </div>
          </div>
          {current < dataSource.length - 1 && (
            <button
              onClick={(e) => {
                goNext();
                e.stopPropagation();
              }}
              className="text-3xl fixed right-8 top-1/2 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center"
              aria-label="move to next slide"
            >
              <FaChevronRight color="#fff" />
            </button>
          )}
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
