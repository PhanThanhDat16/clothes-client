import React from 'react'

interface IFieldProps {
  children: React.ReactNode
  className?: string
}

const FieldInputComponent = ({ children, className }: IFieldProps) => (
  <div className={`mb-4 ${className}`}>{children}</div>
)

export default FieldInputComponent
