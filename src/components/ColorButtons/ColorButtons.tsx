interface ColorListParams {
  colors: string[]
  onClick?: (color: string, button: HTMLButtonElement) => void
  className: string
}

export default function ColorButtons(props: ColorListParams) {
  const { colors, onClick, className } = props
  const handleColorButtonClick = (color: string, button: HTMLButtonElement) => {
    if (onClick) {
      onClick(color, button)
    }
  }

  return (
    <>
      {colors.map((buttonBg, index) => (
        <li
          key={index}
          className={className}
          style={{ background: buttonBg }}
          onClick={e => handleColorButtonClick(buttonBg, e.target as HTMLButtonElement)}
        ></li>
      ))}
    </>
  )
}
