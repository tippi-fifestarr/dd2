import Image from "next/image";
import { useEffect } from "react";

export default function CardDetail({ selectedCard, cardSelected }) {
  // render the card detail
  let imagePath = "http://image.tmdb.org/t/p/original";

  return (
    <div className="h-full px-2">
      {/* display details of selected card, larger image, person name, knownfor, other stats */}
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="flex justify-center place-content-center max-h-40 h-40 md:max-h-44 md:h-44">
          <div className="relative w-32 md:w-36">
            <Image
              src={
                !cardSelected
                  ? "/images/dadeuce.png"
                  : imagePath + selectedCard.profile_path
              }
              // src={chosenCard} // image of selected card
              alt={
                !cardSelected
                  ? `image of a DaDeuce Placehold who is known for holding a place`
                  : `image of ${selectedCard.name} who is known for ${selectedCard.known_for[0].name}`
              }
              className="object-cover h-36 md:h-44 w-fit rounded-l-md"
              fill
            />
          </div>

          <div className="text-sm md:text-base border-red-500 rounded-r-md p-1 bg-red-200 max-w-prose w-56 md:w-72">
            {!cardSelected ? (
              <p>
                DaDeuce Placehold is known for **holding a place**, click a card
                to see more details here, double click once you&#39;ve chosen
                your character!
              </p>
            ) : (
              <>
                <p>
                  You&#39;ve clicked on <b> {selectedCard.name}, </b>{" "}
                  <b>
                    {" "}
                    {selectedCard.known_for[0].name
                      ? selectedCard.known_for[0].name
                      : selectedCard.known_for[0].title}
                  </b>{" "}
                  is something they are known for!
                </p>
                <div className="text-xs sm:text-sm">
                  {selectedCard.gender == "1" ? "Her" : "His"} popularity is
                  {selectedCard.popularity}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
