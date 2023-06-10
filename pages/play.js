// pages/play.js
import { useState, useEffect } from "react";
import { getDeck } from "../utils/deck";
import CardDetail from "../components/CardDetail3";
import StartModal from "../components/startModal";
import Sound from "../components/sound";
import ZoomSelection from "../components/zoomSelection";
import HelpTips from "../components/helpTips";
import Tipsbox from "../components/tipsbox";
import { Constants } from "../const/CONSTANTS";
import React from "react";
import ChatArea from "../components/ChatArea";
import Cards from "../components/cards";

function Play({ deckProps }) {
  // We'll keep track of the currently selected card in state
  const [selectedCard, setSelectedCard] = useState({});
  const [cardSelected, setCardSelected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sfxIndex, setSfxIndex] = useState(0);
  const [volume, setVolume] = useState(0.69);
  const [modalType, setModalType] = useState("start");
  const [modalOpen, setModalOpen] = useState(true);
  // all the cards
  const [deck, setDeck] = useState(deckProps.cards);

  // // onFlippedCard
  function handleFlip(card) {
    setDeck((prev) => {
      return prev.map((c) => {
        if (c.id === card.id) {
          return { ...c, flipped: !c.flipped };
        } else {
          return c;
        }
      });
    });
  }

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

  const handleHelper = () => {
    console.log("helper clicked");
    setModalType("help");
    setModalOpen(true);
  };

  const tips = [
    // "take turns asking yes/no questions to dadeuce!",
    "give me a tip, send to wingbird.eth",
  ];

  console.log("Play component rendered");

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center content-center items-center">
        <div className="w-full h-full">
          <div className="flex justify-center">
            {" "}
            <ChatArea />
            <Tipsbox
              chosenCard={chosenCard}
              tips={tips}
              cardsRemaining={10}
              finalCard={deck[0]}
            />
            <div
              className="text-slate-200 text-center hover:text-slate-400 cursor-pointer rounded-full border-[3px] border-slate-600 hover:bg-slate-400 h-fit p-0.5"
              onClick={() => {
                alert("tooltips in progress ");
              }}
            >
              ❔
            </div>
          </div>
        </div>
        <CardDetail selectedCard={selectedCard} cardSelected={cardSelected} />
      </div>
      <Cards
        chosenCard={chosenCard}
        setChosenCard={setChosenCard}
        selectedCard={selectedCard}
        cardSelected={cardSelected}
        setSelectedCard={setSelectedCard}
        setCardSelected={setCardSelected}
        setSfxIndex={setSfxIndex}
        sfxIndex={sfxIndex}
        isMuted={isMuted}
        volume={volume}
        deck={deck}
        handleFlip={handleFlip}
      />
      <footer className="my-2 text-center transition-colors duration-200">
        <div className="flex flex-row justify-around">
          <ZoomSelection />
          <HelpTips handleHelper={handleHelper} />
          {/* <button className="z-10 text-slate-200 bg-slate-600 rounded-lg hover:bg-slate-300 transition-colors duration-200 p-1">
            Sound on/off 🔈slider
          </button> */}
          <Sound
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            volume={volume}
            setVolume={setVolume}
          />
        </div>
        <StartModal
          modalImage={"/images/dadeuce.png"}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalType={modalType}
          setModalType={setModalType}
          volume={volume}
          songs={songs}
          setVolume={setVolume}
          isMuted={isMuted}
        />
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const deckProps = await getDeck();
  return {
    props: {
      deckProps,
    },
  };
}

export default Play;
