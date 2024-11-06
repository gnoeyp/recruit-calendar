import { useReducer, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type State = {
  current: number;
  animation: 'prev' | 'next' | null;
};

const initialState: State = {
  current: 0,
  animation: null,
};

type Action =
  | { type: 'PREV_START' }
  | { type: 'PREV_END' }
  | { type: 'NEXT_START' }
  | { type: 'NEXT_END' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'PREV_START':
      return {
        ...state,
        animation: 'prev',
      };
    case 'PREV_END':
      return {
        current: state.current - 1,
        animation: null,
      };
    case 'NEXT_START':
      return {
        ...state,
        animation: 'next',
      };
    case 'NEXT_END':
      return {
        current: state.current + 1,
        animation: null,
      };
    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const ref = useRef<HTMLDivElement>(null);

  const goPrevious = () => {
    if (state.current === 0) return;
    if (state.animation !== null) return;

    const element = ref.current;
    const eventHandler = () => {
      setTimeout(() => dispatch({ type: 'PREV_END' }));
      element?.removeEventListener('animationend', eventHandler);
    };
    element?.addEventListener('animationend', eventHandler);

    dispatch({ type: 'PREV_START' });
  };
  const goNext = () => {
    if (state.current === dataSource.length - 1) return;
    if (state.animation !== null) return;
    const element = ref.current;

    const eventHandler = () => {
      setTimeout(() => dispatch({ type: 'NEXT_END' }));
      element?.removeEventListener('animationend', eventHandler);
    };
    element?.addEventListener('animationend', eventHandler);

    dispatch({ type: 'NEXT_START' });
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
            className="text-3xl fixed left-8 top-1/2 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center"
          >
            <FaChevronLeft color="#fff" />
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
                  'animate-carousel-prev': state.animation === 'prev',
                  'animate-carousel-next': state.animation === 'next',
                },
              )}
            >
              <div className="w-[900px] h-max max-h-52">
                {state.current > 0 &&
                  dataSource.length > state.current - 1 &&
                  render(dataSource[state.current - 1])}
              </div>
              <div className="w-[900px] h-max">
                {dataSource.length > state.current &&
                  render(dataSource[state.current])}
              </div>
              <div className="w-[900px] h-max max-h-52">
                {dataSource.length > state.current + 1 &&
                  render(dataSource[state.current + 1])}
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
