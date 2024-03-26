import styles from './ColorList.module.scss'
import React, { useRef, useState } from 'react'

interface ColorListParams {
  onClick?: (color: string) => void
}

export default function ColorList(params: ColorListParams) {
  const [beforeHidden, setBeforeHidden] = useState(false)
  const [showAllColors, setShowAllColors] = useState(false)
  const [selectedColorRow, setSelectedColorRow] = useState<number | null>(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null)

  const buttonsColors = [
    [
      { className: styles.lightBlueGradient },
      { className: styles.purpleGradient },
      { className: styles.pinkGradient },
      { className: styles.yellowGradient },
      { className: styles.greenGradient },
    ],
    [
      { className: styles.blue },
      { className: styles.orange },
      { className: styles.green },
      { className: styles.red },
      { className: styles.purple },
      { className: styles.pink },
      { className: styles.salad },
      { className: styles.lightBlue },
      { className: styles.gray },
    ],
  ]
  const buttonRefs = useRef<Array<Array<React.RefObject<HTMLButtonElement>>>>(
    buttonsColors.map(row => row.map(() => React.createRef<HTMLButtonElement>())),
  )
  const handleShowAllColorsButton = () => {
    setBeforeHidden(!beforeHidden)
    setShowAllColors(!showAllColors)
  }

  const handleButtonClick = (row: number, index: number) => {
    const buttonRef = buttonRefs.current[row][index].current
    if (buttonRef) {
      const backgroundColor = window.getComputedStyle(buttonRef).getPropertyValue('background')

      if (params.onClick) {
        params.onClick(backgroundColor)
      }
    }
    setSelectedColorRow(row)
    setSelectedColorIndex(index)
  }
  return (
    <>
      {buttonsColors[0].map((buttonBg, index) => (
        <li key={index} className={styles.colorPikerElement}>
          <button
            className={`${styles.colorPikerElement} ${buttonBg.className} ${
              selectedColorRow === 0 && selectedColorIndex === index ? styles.acceptEffect : ''
            }`}
            ref={buttonRefs.current[0][index]}
            onClick={() => handleButtonClick(0, index)}
          />
        </li>
      ))}
      <li
        className={`${styles.colorPikerElement} ${beforeHidden ? '' : styles.moreEffect} ${styles.moreEffectContainer}`}
        onClick={handleShowAllColorsButton}
      >
        <button />
      </li>
      {showAllColors && (
        <div className={styles.allColorsDropMenuContainer}>
          <h4>Colors</h4>
          <ul className={styles.allColorsList}>
            {buttonsColors[1].map((buttonBg, index) => (
              <li key={index} className={styles.colorPikerElement}>
                <button
                  className={`${styles.colorPikerElement} ${buttonBg.className} ${
                    selectedColorRow === 1 && selectedColorIndex === index
                      ? styles.acceptEffect
                      : ''
                  }`}
                  ref={buttonRefs.current[1][index]}
                  onClick={() => handleButtonClick(1, index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
