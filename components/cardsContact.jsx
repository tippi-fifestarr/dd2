"use client";
import { useState, useEffect } from "react";
import Person from "./person";
import Image from "next/image";
import Link from "next/link";

// export default async function Cards() {
export default function Cards() {
  // this is what's breaking it, sincie
  const [chosenCard, setChosenCard] = useState({});
  const [people, setPeople] = useState([]);
  const [gotPeople, setGotPeople] = useState(false);
  const [cardChosen, setCardChosen] = useState(false);

  const imagePath = "http://image.tmdb.org/t/p/original";
  const asyncFetch = async () => {
    const peopleRequestPath = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    const data = await fetch(peopleRequestPath);
    const res = await data.json();
    res.results = res.results.sort((a, b) => 0.5 - Math.random());
    setGotPeople(true);
    return res;
  };

  const handleClick = (person) => {
    console.log("single clicked ", person);
  };

  const handleDoubleClick = (person) => {
    console.log("double clicked ", person);
    setChosenCard(person);
    setCardChosen(true);
  };
  // selectedCard on single click for display in hero details
  // chosenCard on double click for display in the logo, chosenCard happens only once at the beginning
  // flippedCards is an array of cards that have been flipped, and should be hidden, when there is two remaining, update tooltips

  useEffect(() => {
    console.log("people effect: ", people);
    asyncFetch().then((res) => {
      console.log("people: ", people);
      setPeople(res.results);
    });
  }, []);

  useEffect(() => {
    console.log("chosen card effect: ", chosenCard);
  }, [chosenCard]);

  //   console.log(res);

  //   const [selectedCard, setSelectedCard] = useState("");
  // state for which card was clicked

  // update the hero image to show clicked
  return (
    // cards element is the parent of the card detail and the card grid
    // cards begins with a div

    !gotPeople ? (
      <div className="text-slate-200 text-2xl">
        Loading people... {asyncFetch}
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="border-slate-200 border-2 rounded-lg px-5 mx-5">
          <div className="grid grid-cols-5">
            {people.map((person) => (
              <div className="m-1 p-0.5 rounded-md bg-green-300 w-full text-xs content-center">
                {/* <Link href="/contact/[id]" as={`/contact/${person.id}`}> */}
                <Link
                  href={`/contact/${person.id}`}
                  className="bg-green-300 bg-opacity-30"
                >
                  <Person
                    handleClick={handleClick}
                    handleDoubleClick={handleDoubleClick}
                    person={person}
                    setChosenCard={setChosenCard}
                    imagePath={imagePath}
                  />
                  <div className="text-xs mx-1 text-center object-contain truncate">
                    {person.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
