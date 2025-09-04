// Libs
import { useState } from 'react'
import { Control, useController, Path, PathValue } from 'react-hook-form'

// Icon
import IconEyeClose from '@/assets/icons/IconEyeClose'
import IconEyeOpen from '@/assets/icons/IconEyeOpen'

interface IInputProps<T extends object> {
  type: string
  name: string
  control: Control<T>
  className?: string
  classNameLabel?: string
  placeholder?: string
  label?: string
}

const InputPassword = <T extends object>({
  name = '',
  control,
  className,
  classNameLabel,
  placeholder,
  label
}: IInputProps<T>) => {
  const { field } = useController({
    control,
    name: name as Path<T>,
    defaultValue: '' as PathValue<T, Path<T>>
  })

  const [showTogglePassword, setShowTogglePassword] = useState<boolean>(false)

  return (
    <>
      {label && (
        <label className={`inline-block mb-1 text-sm capitalize text-heading ${classNameLabel}`} htmlFor={name}>
          {label}
        </label>
      )}
      <div
        className={`w-full h-12 rounded-lg border-2 text-[15px] border-gray-200 text-secondary flex items-center pr-2 gap-1 ${className}`}
      >
        {/*focus:border-[var(--primary-color)] focus:outline-none transition-colors */}
        <input
          type={showTogglePassword ? 'text' : 'password'}
          id={name}
          className={`w-full h-full  text-[15px] px-4 placeholder:text-sm`}
          placeholder={placeholder}
          {...field}
        />
        {showTogglePassword ? (
          <IconEyeOpen handleClickEyeIcon={() => setShowTogglePassword(false)}></IconEyeOpen>
        ) : (
          <IconEyeClose handleClickEyeIcon={() => setShowTogglePassword(true)}></IconEyeClose>
        )}
      </div>
    </>
  )
}

export default InputPassword
