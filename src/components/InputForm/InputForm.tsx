import { useForm } from 'react-hook-form'
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import styles from './InputForm.module.scss'

interface IInputFormParams extends InputHTMLAttributes<HTMLInputElement>{
  htmlFor: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export default function InputForm(params: IInputFormParams) {
  const { htmlFor, onChange, value, ...rest } = params
  const form = useForm()
  const { register } = form
  const { name, ref } = register(htmlFor)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState(value||'')

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
  )
}
