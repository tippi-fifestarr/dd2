import React, { useState } from "react";
import Image from "next/image";
import { useSound } from "use-sound";
import { checkAccess } from "../utils/thirdweb";
// import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";

const StartModal = ({
  modalImage,
  modalOpen,
  setModalOpen,
  modalType,
  setModalType,
  songs,
  volume,
  setVolume,
  isMuted,
  contractMeta,
}) => {
  const [playSong0, { stop: stopSong0 }] = useSound(songs[0].src, {
    volume: isMuted ? 0 : 0.69,
  });
  const [playSong1, { stop: stopSong1 }] = useSound(songs[1].src, {
    volume: isMuted ? 0 : volume,
  });

  const handleX = () => {
    setModalOpen(false);
  };

  const handlePlay = () => {
    setModalType("rules");
    playSong0();
  };

  const handleHelp = () => {
    setModalType("help");
    stopSong0();
    playSong1();
  };

  const handleShuffleAndStart = () => {
    stopSong0();
    playSong1();
    // claimAccessKey();
    setModalOpen(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  // Add the volume slider in the "rules" modal
  const volumeSlider = (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );

  // // Connect to your NFT contract
  // const { contract } = useContract("{{contract_address}}");
  // // Load the NFT metadata from the contract using a hook
  // const { data: nft, isLoading, error } = useNFT(contract, "0");

  return (
    <>
      {modalOpen && modalType == "start" ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex items-center justify-center text-black">
            <div className="p-6 pt-2 bg-green-100 text-center rounded-lg flex flex-col items-center">
              <p
                className="w-full text-right text-4xl cursor-pointer"
                onClick={handleX}
              >
                <b>&times;</b>
              </p>
              <div className="w-28 m-2 drop-shadow-lg hover:drop-shadow-xl rounded-2xl border-green-600 border-2 bg-green-700">
                <Image
                  src={modalImage ? modalImage : "https://picsum.photos/200"}
                  alt=""
                  width={200}
                  height={200}
                  className="rounded-full w-full h-full object-cover drop-shadow-lg transition duration-150 ease-out hover:ease-in"
                />
              </div>
              <div className="p-2 m-1 sm:p-2 sm:m-2 rounded-2xl border-2 border-orange-600 bg-orange-50 drop-shadow-lg">
                <h2 className="text-xl sm:text-2xl p-1 sm:p-2">
                   Can you read my mind?{" "}
                </h2>
                {/* {isLoading ? (
                  <div>Loading...</div>
                ) : error || !nft ? (
                  <div>NFT not found</div>
                ) : (
                  <ThirdwebNftMedia metadata={nft.metadata} />
                )} */}
                <p className=" text-center p-1 md:p-2">
                  Yes or no questions, internet, <br /> and a fun friend are all
                  you need <br /> to play this crazy game; a <br /> random card
                  you must choose, <br /> deduce the truth like Dr. Sleuth!!
                </p>
              </div>
              <div className="w-full p-2 m-2 rounded-2xl border-2 border-orange-100 bg-green-300 drop-shadow-lg">
                <p className="p-2 text-xl">START GAME:</p>{" "}
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-slate-50 font-bold py-2 px-4 rounded m-1"
                  onClick={handlePlay}
                >
                  Play
                </button>
              </div>
              <a
                href="https://ceptor.club/feedback/"
                target="_blank"
                rel="noreferrer"
                className="m-2 p-2 hover:text-[#e137b1] drop-shadow-md hover:drop-shadow-lg"
              >
                Why?
              </a>
            </div>
          </div>
        </>
      ) : modalOpen && modalType == "rules" ? (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex items-center justify-center text-black">
          <div className="p-6 pt-2 bg-green-100 text-center rounded-lg flex flex-col items-center">
            <p
              className="w-full text-right text-4xl cursor-pointer"
              onClick={handleX}
            >
              <b>&times;</b>
            </p>
            <div className="w-28 m-2 drop-shadow-lg hover:drop-shadow-xl rounded-2xl border-green-600 border-2 bg-green-700">
              <h1 className="text-2xl">Rules</h1>
              <p>{contractMeta.name}</p>
              <Image
                src={contractMeta.image}
                alt="access key"
                width={200}
                height={200}
                className="rounded-full w-full h-full object-cover drop-shadow-lg transition duration-150 ease-out hover:ease-in"
                onClick={checkAccess}
              />
            </div>
            {/* <ol className="border-2 border-green-50 bg-green-200 text-slate-900 flex flex-col">
              <li>Get a friend to play DaDeuce with you on their phone.</li>
              <li>Double click: choose your Secret Card!</li>
              <li>Take turns asking each other yes / no questions.</li>
              <li>Click the cards you eliminate each turn</li>
              <li>DaDeuce your friend’s card and mint it for swag</li>
            </ol> */}
            <ol className="border-2 rounded-xl border-green-50 bg-green-200 text-slate-900 p-10 list-decimal text-left">
              <li className="text-sm md:text-lg leading-relaxed">
                Get a friend to play DaDeuce with you on their phone.
              </li>
              <li className="text-sm md:text-lg leading-relaxed">
                Double click: choose your Secret Card!
              </li>
              <li className="text-sm md:text-lg leading-relaxed">
                Take turns asking each other yes / no questions.
              </li>
              <li className="text-sm md:text-lg leading-relaxed">
                Click the cards you eliminate each turn
              </li>
              <li className="text-sm md:text-lg leading-relaxed">
                DaDeuce your friend’s card and mint it for swag
              </li>
            </ol>

            {/* right aligned on the bottom of the div "...click for more help"  */}
            <p
              className="text-right w-full underline hover:text-orange-900"
              onClick={handleHelp}
            >
              ...click for more help
            </p>
            {volumeSlider}
            <button
              onClick={handleShuffleAndStart}
              className="bg-orange-600 hover:bg-orange-700 text-slate-50 font-bold py-2 px-4 rounded m-3"
            >
              shuffle and start
            </button>
          </div>
          {/* add a big orange shuffle and start button */}
        </div>
      ) : modalOpen && modalType == "help" ? (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex items-center justify-center text-black">
          <div className="p-6 pt-2 bg-green-100 text-center rounded-lg flex flex-col items-center">
            <p
              className="w-full text-right text-4xl cursor-pointer"
              onClick={handleX}
            >
              <b>&times;</b>
            </p>
            <div className="w-28 m-2 drop-shadow-lg hover:drop-shadow-xl rounded-2xl border-green-600 border-2 bg-green-700">
              <h1 className="text-2xl">DaDeuce Rules!!!</h1>
            </div>
            <ol className="border-2 border-green-50 bg-green-200 text-slate-900 flex flex-col">
              <li>Play with friend!</li>
              <li>Double click: choose your Secret Card!</li>
              <li>Take turns asking each other yes / no questions.</li>
              <li>Click the cards you eliminate each turn</li>
              <li>DaDeuce your friend’s card and mint it for swag</li>
            </ol>
            <h1 className="text-2xl">Video instructions!</h1>
            {/* embed youtube video */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StartModal;
