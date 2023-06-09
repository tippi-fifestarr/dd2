// pages/play.js
import { useState, useEffect } from "react";
import Image from "next/image";
import { getDeck } from "../utils/deck";
import CardDetail from "../components/CardDetail3";
import StartModal from "../components/startModal";
import Sound from "../components/sound";
import ZoomSelection from "../components/zoomSelection";
import HelpTips from "../components/helpTips";
import Tipsbox from "../components/tipsbox";
import { Constants } from "../const/CONSTANTS";
// import Meta from "../components/Meta";
// import Nav from "../components/nav";

function Play({ deck }) {
  // We'll keep track of the currently selected card in state
  const [selectedCard, setSelectedCard] = useState({});
  const [cardSelected, setCardSelected] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sfxIndex, setSfxIndex] = useState(0);
  const [volume, setVolume] = useState(0.69);
  const [cardSituation, setCardSituation] = useState({});
  const [isNewLevel, setNewLevel] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
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

  const handleClick = (selectedCard) => {
    setCardSelected(true);
    setSelectedCard(selectedCard);
  };

  const handleHelper = () => {
    console.log("helper clicked");
    setModalType("help");
    setModalOpen(true);
  };

  const tips = [
    // "take turns asking yes/no questions to dadeuce!",
    "give me a tip, send to wingbird.eth",
  ];

  return (
    <>
      {/* <Meta /> */}
      {/* <Nav
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
        /> */}
      <div className="flex flex-col md:flex-row justify-center content-center items-center">
        <div className="w-full h-full">
          {/* <AudioPlayer /> */}
          <div className="flex justify-center">
            {" "}
            <Tipsbox
              chosenCard={chosenCard}
              tips={tips}
              cardsRemaining={10}
              finalCard={deck.cards[0]}
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

      <footer className="my-2 text-center transition-colors duration-200">
        {/* <div className="">
          <ul className="flex flex-row justify-between px-5 sm:text-xl">
            <li className="flex">
              <a className="text-blue-200 hover:bg-blue-600" href="/">
                Home
              </a>
            </li>
            <li
              className={
                gorditas.className + " text-slate-300 hover:bg-slate-500 flex"
              }
            >
              <a href="/about">About</a>
            </li>
            <li
              className={`${islandMoments.className} text-slate-300  hover:bg-slate-600 text-2xl`}
            >
              <a href="/contact">Contact</a>
            </li>
            <li
              className={
                frijole.className + " flex text-slate-300 hover:bg-slate-700"
              }
            >
              <a href="/kickstart">Kickstart</a>
            </li>
          </ul>
        </div> */}
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
