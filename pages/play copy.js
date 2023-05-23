// pages/play.js
import Nav from "./nav";
import Cards from "./cards";
import { useState, useEffect } from "react";
import HelpTips from "./helpTips";
import ZoomSelection from "./zoomSelection";
import { gorditas, oswald, frijole, islandMoments } from "./layout";
import Tipsbox from "./tipsbox";
import CardDetail from "./cardDetail";
import { Constants } from "./CONSTANTS";
import Sound from "../components/sound";
import StartModal from "./startModal";

export default function Home() {
  // music related state
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sfxIndex, setSfxIndex] = useState(0);
  const [volume, setVolume] = useState(0.69);

  const [selectedCard, setSelectedCard] = useState({});
  const [cardSelected, setCardSelected] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState(20);
  const [isNewLevel, setNewLevel] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [finalCard, setFinalCard] = useState({});
  const [modalType, setModalType] = useState("start");
  const [modalOpen, setModalOpen] = useState(true);

  const songs = Constants.songs;

  console.log(songs);
  const [chosenCard, setChosenCard] = useState({
    name: "none",
    id: 0,
    profile_path: "",
    description: "dadeuce",
  });

  useEffect(() => {
    console.log("chosenCard", chosenCard);
  }, [chosenCard.name]);

  const handleLevelComplete = (selectedCard) => {
    console.log("level complete:", currentLevel);
    setFinalCard(selectedCard);
    resetCards();
    setCurrentLevel(currentLevel + 1);
    setSelectedSongIndex(selectedSongIndex + 1);
    setCardsRemaining(20);
  };

  const resetCards = () => {
    // reset the cards to the initial state
    setNewLevel(true);
    console.log("first");
  };

  const handleHelper = () => {
    console.log("helper clicked");
    setModalType("help");
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("use effect new level?:", isNewLevel);
  }, [isNewLevel]);

  const tips = [
    // "take turns asking yes/no questions to dadeuce!",
    "give me a tip, send to wingbird.eth",
  ];

function Play({ deck }) {
  // We'll keep track of the currently selected card in state
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="flex flex-col items-center">
      {/* Detail viewer */}
      {selectedCard && (
        <div className="p-4 m-4 border border-gray-200 rounded shadow">
          <h2 className="text-xl font-bold">{selectedCard.name}</h2>
          <p>{selectedCard.description}</p>
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
