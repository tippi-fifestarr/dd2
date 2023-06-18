import { useState, useEffect } from "react";
import Person from "./person";
import { Constants } from "../const/CONSTANTS";
import { useSound } from "use-sound";

export default function Cards({
  chosenCard,
  setChosenCard,
  selectedCard,
  cardSelected,
  setSelectedCard,
  setCardSelected,
  setSfxIndex,
  sfxIndex,
  isMuted,
  volume,
  deck,
  handleFlip,
}) {
  const [cardChosen, setCardChosen] = useState(false);
  // const [people, setPeople] = useState(deck);

  const [people, setPeople] = useState([]);
  const [initialShuffle, setInitialShuffle] = useState(false);
  const [gotPeople, setGotPeople] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the array initially when the deck is populated
  useEffect(() => {
    if (deck.length > 0 && !initialShuffle) {
      setPeople(shuffleArray([...deck]));
      setInitialShuffle(true); // Mark that the initial shuffle has been performed
      setGotPeople(true); // Indicate that the cards are loaded
    } else if (deck.length > 0 && initialShuffle) {
      setPeople([...deck]);
      setGotPeople(true); // Indicate that the cards are loaded
    }
  }, [deck]);

  const handleClick = (person) => {
    setSelectedCard(person);
    setCardSelected(true);
    click();
  };

  const cardChooser = (person) => {
    setChosenCard(person);
    setCardChosen(true);
    choose();
    // console.log("player chose card: ", person.name);
  };

  let currentSFX = Constants.sfx;
  // onclick move the currentSFX index 0 item to the end of the array

  const [flip] = useSound(currentSFX[1], { volume: isMuted ? 0 : volume });
  const [click] = useSound(currentSFX[2], { volume: isMuted ? 0 : volume });
  const [choose] = useSound(currentSFX[3], { volume: isMuted ? 0 : volume });

  const handleDoubleClick = (person) => {
    if (!cardChosen) {
      cardChooser(person);
    } else {
      // console.log(
      //   "card already chosen, so this causes the secondary effect of doubleclicking, namely flipping the card"
      // );
      setSfxIndex(0);
      flip();
      handleFlip(person);
    }
  };
  // selectedCard on single click for display in hero details
  // chosenCard on double click for display in the logo, chosenCard happens only once at the beginning
  // flippedCards is an array of cards that have been flipped, and should be hidden, when there is two remaining, update tooltips

  useEffect(() => {}, [cardSelected]);

  useEffect(() => {}, [chosenCard]);

  return !gotPeople ? (
    <div className="flex justify-center text-3xl text-slate-200 bg-slate-600 rounded-2xl m-2 p-2">
      Loading DaDeuce Cards... Please wait for the asyncFetch to complete
    </div>
  ) : !cardSelected ? (
    <div className="flex flex-col">
      <div className="flex items-center justify-center px-1 mx-1 sm:px-2 sm:mx-2 sm:py-1 lg:px-5 ">
        <div className="grid grid-cols-5 max-w-lg place-content-center  border-slate-200 border-2 rounded-lg p-1 md:p-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-center m-1"
            >
              <Person
                handleClick={handleClick}
                handleDoubleClick={handleDoubleClick}
                person={person}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="flex items-center justify-center px-1 mx-1 sm:px-2 sm:mx-2 sm:py-1 lg:px-5">
        <div className="grid grid-cols-5 max-w-lg place-content-center  border-slate-200 border-2 rounded-lg p-1 md:p-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex flex-row items-center justify-center m-1"
            >
              <Person
                handleClick={handleClick}
                handleDoubleClick={handleDoubleClick}
                person={person}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
