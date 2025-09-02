import { EButtonType } from '@/models/common'

interface IButtonProps {
  type?: EButtonType
  text?: string
  isSubmitting?: boolean
  className?: string
  onClick: () => void
  isDisabled?: boolean
  style?: React.CSSProperties
}

const Button = ({
  type = EButtonType.BUTTON,
  text,
  isDisabled,
  isSubmitting,
  className,
  style,
  onClick
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`w-full bg-[var(--primary-color)] hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 ${className} ${isDisabled ? 'opacity-50 flex items-center justify-center' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
    >
      {isSubmitting ? <div className="w-6 h-6 button-loading animate-spin"></div> : <span>{text}</span>}
    </button>
  )
}

export default Button
