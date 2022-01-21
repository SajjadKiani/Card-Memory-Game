import Card from "./Card";
import {cardsData} from "../cards";
import {useEffect, useState} from "react";

function Game() {

  const [data,setData] = useState(cardsData)
  const [state , setState] = useState(0)
  const [clickedCards , setClickedCards] = useState([])

  const handleFlipped = (id,flip) => {
    setData(prev => prev.map((card) =>
        card.id === id ? {...card,isFlipped: flip} : card)
    )
  }

  useEffect(() => {

    if (state === 2) {

      setTimeout(() => {

        if (clickedCards[0].name !== clickedCards[1].name && clickedCards[0].id !== clickedCards[1].id) {
          handleFlipped(clickedCards[0].id,false)
          handleFlipped(clickedCards[1].id,false)
        }
        setState(0)
        setClickedCards([])
      }, 1500)
    }

  },[state])

  const handleClick = (id) => {

    setState(prev => prev + 1)
    setClickedCards(prev => [...prev,data[id-1]])

    if (state < 2) {
      handleFlipped(id, true)
    }

  }

  return (
    <section className="memory-game">
      {data.map((card,i) => {
        return  <Card key={i} card={card} onClick={() => handleClick(card.id) } />
      })}
    </section>
  );
}

export default Game;
