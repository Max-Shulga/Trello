import { useState } from 'react'
import styles from './ColorList.module.scss'

interface ColorListParams {
  listStyles: {
    background: string
  }[]
  onClick?: (color: string) => void
}

export default function ColorList(params: ColorListParams) {
  const [selectedIndex, setsSelectedIndex] = useState<number | null>(null)

  const handleButtonClick = (color: string, index:number) => {
    if (params.onClick) {
      params.onClick(color)
    }
    setsSelectedIndex(index)
  }
  return (
    <>
      {params.listStyles.map((listStyle, index) => (
        <li key={index} className={styles.button}>
          <button
              className={`${styles.button} ${selectedIndex === index ? styles.acceptEffect :"" }`}
              style={{ background: listStyle.background }}
              onClick={() => handleButtonClick(listStyle.background,index)}
          />
        </li>
      ))}
    </>
  )
}
