import clsx from 'clsx'

interface IDividerProps {
  className?: string
}

export const Divider = ({ className }: IDividerProps) => {
  return <hr className={clsx('h-[0.5px] bg-[#e8e8e6] border-none', className)} />
}
