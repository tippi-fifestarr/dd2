"use client";
import { gorditas } from "../layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Constants } from "../utils/CONSTANTS";
// import { ConnectWallet } from "@thirdweb-dev/react";

export default function Nav({
  chosenCard,
  isNewLevel,
  setNewLevel,
  selectedSongIndex,
  setSelectedSongIndex,
  songs,
  isMuted,
  setSfxIndex,
  sfxIndex,
  volume,
}) {
  const imagePath = `http://image.tmdb.org/t/p/original`;

  let image = imagePath + chosenCard.profile_path;
  useEffect(() => {
    image = imagePath + chosenCard.profile_path;
  }, [chosenCard]);
  let cardChosen = chosenCard.name != "none" ? true : false;
  // let currentSFX = Constants.sfx;
  // // onclick move the currentSFX index 0 item to the end of the array
  // const [sfxIndex, setSfxIndex] = useState(0);
  // const [play] = useSound(currentSFX[sfxIndex], { volume: 0.5 });

  // const handleSound = () => {
  //   play();
  //   setSfxIndex((prevIndex) => (prevIndex + 1) % currentSFX.length);
  // };

  let currentSFX = Constants.sfx;

  const [play] = useSound(currentSFX[sfxIndex], {
    volume: isMuted ? 0 : volume,
  });

  const handleSound = () => {
    play();
    setSfxIndex((prevIndex) => (prevIndex + 1) % currentSFX.length);
  };

  return (
    <nav
      className={`border-solid ${
        isNewLevel ? "bg-slate-600" : "bg-slate-500"
      }  rounded text-slate-100`}
    >
      <div className="flex space-x-5 justify-between items-center mx-5 mb-1 h-14">
        {/* conditionally render logo or chosen card */}
        {!cardChosen ? (
          <Image
            src="/favicondd.ico"
            alt="dadeuce favicon"
            width={55}
            height={55}
            className="rounded-full items-center p-1"
          />
        ) : cardChosen ? (
          <div className="overflow-hidden aspect-square h-14 p-1">
            <Image
              src={image}
              alt={`chosen card ${chosenCard.name}`}
              width={500}
              height={500}
              className="rounded-3xl w-full h-full object-cover"
            />
          </div>
        ) : (
          <div>
            what the heck is going on here? <br />
          </div>
        )}
        {/* display the dadeuce title, onhover underline, onclick unmute the audio and make a sound */}

        <h1
          onClick={handleSound}
          className={`text-2xl ${gorditas.className} font-bold hover:underline`}
        >
          DD
          {/* DaDeuce!? <ConnectWallet /> */}
        </h1>

        <Image
          src="/images/dadeuce.png"
          alt="dadeuce logo"
          width={55}
          height={55}
          className="rounded items-center p-2 flex"
          onClick={() => {
            setNewLevel(true);
          }}
        />
      </div>
    </nav>
  );
}
