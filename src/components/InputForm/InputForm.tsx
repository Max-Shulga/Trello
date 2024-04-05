import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react'
import styles from './InputForm.module.scss'
import { RegexPattern } from '../../common/types/RegexPattern.ts'

interface IInputFormParams
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  htmlFor: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  onSubmit: SubmitHandler<FormValues>
  className?: string
  validationPattern?: RegexPattern
}

type FormValues = {
  title: string
}
export default function InputForm(params: IInputFormParams) {
  const { htmlFor, onChange, onSubmit, validationPattern, className, value, ...rest } = params
  const { register, handleSubmit, setFocus } = useForm<FormValues>()
  const [inputValue, setInputValue] = useState(value || '')
  const [isValid, setIsValid] = useState(false)
  const [showValidInfo, setShowValidInfo] = useState(false)
  const pattern = validationPattern || /.*/

  const handleFormSubmit: SubmitHandler<FormValues> = data => {
    if (pattern.test(inputValue)) {
      if (!inputValue.trim()) {
        onSubmit({ title: value || '' })
      } else {
        onSubmit(data)
      }
    } else {
      setIsValid(true)
    }
  }

  useEffect(() => {
    setFocus('title')
  }, [setFocus])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(false)
    setShowValidInfo(false)
    onChange(e)
    setInputValue(e.target.value)
  }
  const handleValidInfoOnClick = () => {
    setShowValidInfo(!showValidInfo)
  }

  return (
    <form
      id={htmlFor}
      name={htmlFor}
      onSubmit={handleSubmit(handleFormSubmit)}
      onBlur={handleSubmit(handleFormSubmit)}
      className={className ? className : ''}
    >
      <label htmlFor={htmlFor} className={styles.inputContainer}>
        <input
          className={styles.input}
          type='text'
          value={inputValue}
          {...register(`title`)}
          onChange={handleInputChange}
          {...rest}
        />
        {isValid && <span onClick={handleValidInfoOnClick} className={styles.validInfoIcon}></span>}
        {showValidInfo && (
          <div className={styles.info}>
            <h4>The name of the board may contain:</h4>
            <p> Numbers, letters, spaces,</p>
            <p>dashes, periods, and underscores</p>
          </div>
        )}
      </label>
    </form>
  )
}
