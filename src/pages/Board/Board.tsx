import {useState} from "react";

const initialTitle = "Моя тестова дошка"
const initialLists = [
    {
        id: 1,
        title: "Плани",
        cards: [
            {
                id: 1,
                title: "помити кота"
            },
            {
                id: 2,
                title: "приготувати суп"
            },
            {
                id: 3,
                title: "сходити в магазин"
            }
        ]
    },
    {
        id: 2,
        title: "В процесі",
        cards: [
            {
                id: 4,
                title: "подивитися серіал"
            }
        ]
    },
    {
        id: 3,
        title: "Зроблено",
        cards: [
            {
                id: 5,
                title: "зробити домашку"
            },
            {
                id: 6,
                title: "погуляти з собакой"
            }
        ]
    }
]

export const Board = () => {
    const [title, setTitle] = useState(initialTitle)
    const [lists, setLists] = useState(initialLists)


    return (
        <>
            <h1>{title}</h1>
            <div>Hello board</div>
        </>
    )


}