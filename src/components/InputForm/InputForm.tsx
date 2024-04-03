import { useForm } from 'react-hook-form'
import { ChangeEvent, FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import styles from './InputForm.module.scss'

interface IInputFormParams extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  htmlFor: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function InputForm(params: IInputFormParams) {
  const { htmlFor, onChange, onSubmit, className, value, ...rest } = params
  const form = useForm()
  const { register } = form
  const { name, ref } = register(htmlFor)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    setInputValue(event.target.value)
  }

  return (
    <form name={htmlFor} onSubmit={onSubmit} onBlur={onSubmit} className={className ? className : ''}>
      <label htmlFor={name} />
      <input
        className={styles.input}
        type='text'
        onChange={handleOnChange}
        name={name}
        ref={input => {
          inputRef.current = input
          ref(input)
        }}
        value={inputValue}
        {...rest}
      />
    </form>
  )
}
