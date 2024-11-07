import { cn } from '@/utils/style';
import { cva, VariantProps } from 'class-variance-authority';

const tinyBadgeStyles = cva(
  'w-4 h-4 inline-flex items-center justify-center rounded-md text-white text-xs',
  {
    variants: {
      variant: {
        light: 'bg-orange-500',
        dark: 'bg-cyan-800',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  },
);

type TinyBadgeProps = {
  children?: React.ReactNode;
  className?: string;
} & VariantProps<typeof tinyBadgeStyles>;

export default function TinyBadge({
  children,
  variant,
  className,
}: TinyBadgeProps) {
  return (
    <div className={cn(tinyBadgeStyles({ variant, className }))}>
      {children}
    </div>
  );
}
