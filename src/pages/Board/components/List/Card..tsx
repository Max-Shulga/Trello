interface CardProps {
    title: string
}

export default function Card(props: CardProps) {

    return (
        <p>{props.title}</p>
    )
}