import { type ReactElement, useState } from 'react'

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'submit' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

const variantStyles = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-800',
  secondary: 'bg-purple-100 hover:bg-purple-200 text-purple-700 focus:ring-purple-500 focus:ring-opacity-30 active:bg-purple-300',
  submit: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500 focus:ring-opacity-50 active:from-indigo-800 active:to-purple-800 shadow-lg',
  outline: 'border-2 border-purple-600 text-purple-600 hover:bg-red-600 hover:text-white focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-700',
  ghost: 'text-purple-600 hover:bg-purple-100 focus:ring-purple-500 focus:ring-opacity-30 active:bg-purple-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800'
}

const defaultStyles = 
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg border border-transparent shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none cursor-pointer'

const sizeStyles = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
}

const Button = (props: ButtonProps) => {
  const { variant, size, text, startIcon, endIcon, onClick, disabled, type = 'button' } = props
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || loading || !onClick) return
    try {
      const result = onClick()
      if (result instanceof Promise) {
        setLoading(true)
        await result
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type={type}
      className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]}`}
      onClick={onClick ? handleClick : undefined}
      title={props.title}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-current rounded-full" />
      ) : (
        <>
          {startIcon}
          {text}
          {endIcon}
        </>
      )}
    </button>
  )
}

export default Button