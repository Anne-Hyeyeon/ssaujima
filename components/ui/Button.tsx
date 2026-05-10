import clsx from 'clsx'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center font-medium tracking-[-0.01em] transition-opacity disabled:opacity-50 cursor-pointer',
        'rounded-full',
        {
          'bg-[#1a1a1a] text-white hover:opacity-90': variant === 'primary',
          'border border-[#e8e8e6] text-[#1a1a1a] hover:bg-[#fafaf9]': variant === 'outline',
          'text-[#1a1a1a] hover:opacity-70': variant === 'ghost',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-7 py-3.5 text-[15px]': size === 'md',
          'px-8 py-4 text-base': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}
