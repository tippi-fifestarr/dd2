// pages/play.js
import { useState } from "react";
import Image from "next/image";
import { getDeck } from "../utils/deck";
import CardDetail from "../components/CardDetail3";
// import Nav from "../components/nav";

function Play({ deck }) {
  // We'll keep track of the currently selected card in state
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardSelected, setCardSelected] = useState(false);

  const handleClick = (selectedCard) => {
    setCardSelected(true);
    setSelectedCard(selectedCard);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Detail viewer */}

        {selectedCard && (
          <CardDetail selectedCard={selectedCard} cardSelected={cardSelected} />
        )}

        {/* Gameboard */}
        <div className="grid grid-cols-5 gap-2">
          {deck.cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col p-1 border-2 border-slate-200 rounded-md shadow cursor-pointer overflow-clip justify-center"
              onClick={() => handleClick(card)}
            >
              <h2 className="text-xs sm:text-sm w-20 sm:w-24 text-center font-gorditas">
                {card.name}
              </h2>
              <Image
                src={card.image}
                alt={card.name + ", " + card.image_provenance}
                width={55}
                height={55}
                className="rounded-md self-center"
              />
              {/* Other card details... */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Fetch your deck data from the API
// export async function getStaticProps() {
//   const res = await fetch("/api/deck");
//   const deck = await res.json();

//   return {
//     props: {
//       deck,
//     },
//   };
// }

export async function getStaticProps() {
  const deck = await getDeck();

  return {
    props: {
      deck,
    },
  };
}

// export async function getServerSideProps(context) {
//   const res = await fetch(`http://localhost:3000/api/deck`);
//   const deckData = await res.json();

//   return {
//     props: {
//       deck: deckData.deck.map((card) => ({
//         id: card.id,
//         type: card.type,
//         name: card.name,
//         description: card.description,
//         image: card.image,
//         attributes: card.attributes,
//         ability: card.ability,
//       })),
//     },
//   };
// }

export default Play;
