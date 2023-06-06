// pages/play.js
import { useState } from "react";
import Image from "next/image";
// import Nav from "../components/nav";
import React from 'react';
import ChatArea from "../components/ChatArea";


function Play({ deck }) {
  // We'll keep track of the currently selected card in state
  const [selectedCard, setSelectedCard] = useState(null);

  console.log('Play component rendered');

  return (
    <>
      {/* <main>
        <Nav
          chosenCard={chosenCard}
          isNewLevel={isNewLevel}
          setNewLevel={setNewLevel}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          selectedSongIndex={selectedSongIndex}
          songs={songs}
          sfxIndex={sfxIndex}
          setSfxIndex={setSfxIndex}
          volume={volume}
        />
      </main> */}

        <div>
          <h1>Welcome to WS</h1>
          <ChatArea />
        </div>
      <div className="flex flex-col items-center">
        {/* Detail viewer */}
        {selectedCard && (
          <div className="p-4 m-4 border border-gray-200 rounded shadow">
            <h2 className="text-xl font-bold font-gorditas">
              {selectedCard.name}
            </h2>
            <p>{selectedCard.description}</p>
            <Image
              src={selectedCard.image}
              alt={selectedCard.name}
              width={256}
              height={256}
            />
            {/* Other card details... */}
          </div>
        )}

        {/* Gameboard */}
        <div className="grid grid-cols-5 gap-4">
          {deck.cards.map((card) => (
            <div
              key={card.id}
              className="p-4 border border-gray-200 rounded shadow cursor-pointer"
              onClick={() => setSelectedCard(card)}
            >
              <h2 className="text-lg font-bold">{card.name}</h2>
              {/* Other card details... */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Fetch your deck data from the API
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/deck");
  const deck = await res.json();

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
