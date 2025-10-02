import { Control, useController, Path, PathValue } from 'react-hook-form'

interface IInputProps<T extends object> {
  type: string
  name: string
  control: Control<T>
  className?: string
  classNameLabel?: string
  placeholder?: string
  label?: string
}

const Input = <T extends object>({
  type = 'text',
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

  return (
    <>
      {label && (
        <label className={`inline-block mb-1 text-sm capitalize text-heading ${classNameLabel}`} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={`w-full border-2 border-gray-200 p-4 rounded-lg focus:border-[var(--primary-color)] focus:outline-none transition-colors ${className} placeholder:text-sm`}
        placeholder={placeholder}
        {...field}
      />
    </>
  )
}

export default Input
