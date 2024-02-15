import {ICard} from "../../../../features/cardSlice.ts";
import Card from "./Card..tsx";

interface ListProps {
    cards: ICard[]
}

export default function List(props: ListProps) {
    const {cards} = props
    const showCards = () => {
        return cards.map(cards => (
            <div key={cards.id}>

                <h2>{cards.title}</h2>

                {cards.cases.map(cases => (
                    <Card key={cases.id} title={cases.title}/>
                ))}
                <button>Add new Case</button>
            </div>

        ))
    }
    return (
        <div>
            {showCards()}
            <button>Add new Card</button>
        </div>
    )
}