import styles from './Card.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import InputForm from '../../../../components/InputForm/InputForm.tsx'
import { IChangeCardDataPayload } from '../../../../common/types/IChangeCardDataPayload.ts'
import { ICard } from '../../../../common/interfaces/ICard.ts'
import { AppDispatch } from '../../../../app/store.ts'
import { changeCardData } from '../../../../features/BoardSlice.ts'

interface CardProps extends ICard {
  dispatch: AppDispatch
  list_id: number
}

export default function Card(props: CardProps) {
  const [showInput, setShowInput] = useState(false)
  const { list_id,title, dispatch,id } = props

  const [cardData, setCardData] = useState<IChangeCardDataPayload>({
    id: id,
    list_id:list_id,
    title: '',
  })

  const handleCardOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setCardData({
      ...cardData,
      title: newTitle,
    })
  }
  const handleChangeCardTitleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    setShowInput(false)

    if (cardData.title) {
      e.preventDefault()
      dispatch(changeCardData(cardData))
    }
  }
  return (
    <li className={styles.cardContainer}>
      {showInput ? (
        <InputForm
          htmlFor={'changeCardTitle'}
          onChange={handleCardOnChange}
          onSubmit={handleChangeCardTitleOnSubmit}
          value={title}
        />
      ) : (
        <>
          <div>{title}</div>
          <button onClick={() => setShowInput(true)} />
        </>
      )}
    </li>
  )
}
