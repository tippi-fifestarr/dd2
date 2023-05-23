import { useState, useEffect } from "react";
import Person from "./person";
import { Constants } from "../utils/CONSTANTS";
import { useSound } from "use-sound";

export default function Cards({
  chosenCard,
  setChosenCard,
  selectedCard,
  cardSelected,
  setSelectedCard,
  setCardSelected,
  totalClicks,
  setTotalClicks,
  isNewLevel,
  setNewLevel,
  cardsRemaining,
  setCardsRemaining,
  handleLevelComplete,
  setSfxIndex,
  sfxIndex,
  isMuted,
  volume,
}) {
  const [cardChosen, setCardChosen] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]); // [person1, person2
  const [people, setPeople] = useState([]);
  const [gotPeople, setGotPeople] = useState(false);

  let imagePath = "http://image.tmdb.org/t/p/original";
  const asyncFetch = async () => {
    const peopleRequestPath = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

    const data = await fetch(peopleRequestPath);
    const res = await data.json();
    res.results = res.results.sort((a, b) => 0.5 - Math.random());
    setGotPeople(true);
    return res;
  };

  const handleClick = (person) => {
    setSelectedCard(person);
    setCardSelected(true);
    setTotalClicks(totalClicks + 1);
    click();
  };

  const cardChooser = (person) => {
    setChosenCard(person);
    setCardChosen(true);
    setTotalClicks(totalClicks + 1);
    choose();
    console.log("player chose card: ", person.name);
  };

  let currentSFX = Constants.sfx;
  // onclick move the currentSFX index 0 item to the end of the array

  const [flip] = useSound(currentSFX[1], { volume: isMuted ? 0 : volume });
  const [click] = useSound(currentSFX[2], { volume: isMuted ? 0 : volume });
  const [choose] = useSound(currentSFX[3], { volume: isMuted ? 0 : volume });

  const handleDoubleClick = (person) => {
    console.log("is this a new level? ", isNewLevel);
    if (isNewLevel) {
      if (!cardChosen) {
        cardChooser(person);
        setNewLevel(false); // this is the first click, so set isNewLevel to false
      } else {
        console.log(
          "card already chosen, so this causes the secondary effect of doubleclicking, namely flipping the card"
        );
      }
    } else {
      console.log(
        "not a new level, so this is a double click, reducing cards remaining",
        cardsRemaining
      );
      setSfxIndex(0);
      flip();
      setFlippedCards((prev) => {
        const newFlippedCards = prev.includes(person.name)
          ? prev.filter((card) => card !== person.name)
          : [...prev, person.name];
        return newFlippedCards;
      });

      if (cardsRemaining === 1) {
        handleLevelComplete(person); // this assumes handleLevelComplete is a function that is defined somewhere in the Page component
      } else {
        setCardsRemaining(cardsRemaining - 1);
        setNewLevel(false); // this is the first click, so set isNewLevel to false
      }
    }
  };
  // selectedCard on single click for display in hero details
  // chosenCard on double click for display in the logo, chosenCard happens only once at the beginning
  // flippedCards is an array of cards that have been flipped, and should be hidden, when there is two remaining, update tooltips

  useEffect(() => {
    asyncFetch().then((res) => {
      setPeople(res.results);
    });
  }, []);

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
                isNewLevel={isNewLevel}
                person={person}
                setChosenCard={setChosenCard}
                imagePath={imagePath}
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
                // onClick={() => {
                //   setChosenCard(person);
                //   console.log("hello", chosenCard);
                // }}
                handleClick={handleClick}
                handleDoubleClick={handleDoubleClick}
                person={person}
                setChosenCard={setChosenCard}
                // name={person.name}
                // known_for={
                //   person.known_for[0].name
                //     ? person.known_for[0].name
                //     : person.known_for[0].title
                // }
                // profile_path={person.profile_path}
                imagePath={imagePath}
                flippedCards={flippedCards}
                setFlippedCards={setFlippedCards}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
