import clsx from 'clsx'

interface IBadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge = ({ children, className }: IBadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center bg-[#ffeef3] text-[#c2185b] rounded-full px-3.5 py-1 text-xs font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}
