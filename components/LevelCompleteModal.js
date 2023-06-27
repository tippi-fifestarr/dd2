// components/LevelCompleteModal.js
import React from "react";
import Image from "next/image";

const LevelCompleteModal = ({
  modalOpen,
  setModalOpen,
  hasAccessRanked5,
  createToken,
  saveMatchHistory,
}) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen ? (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-90 flex items-center justify-center text-black">
          <div className="p-6 pt-2 bg-green-100 text-center rounded-lg flex flex-col items-center">
            <p
              className="w-full text-right text-4xl cursor-pointer"
              onClick={handleClose}
            >
              <b>&times;</b>
            </p>
            <div className="w-28 m-2 drop-shadow-lg hover:drop-shadow-xl rounded-2xl border-green-600 border-2 bg-green-700">
              <h1 className="text-2xl">Level Complete!</h1>
            </div>
            <div className="p-2 m-1 sm:p-2 sm:m-2 rounded-2xl border-2 border-orange-600 bg-orange-50 drop-shadow-lg">
              {hasAccessRanked5 ? (
                <p>Congratulations! You can now save your match history.</p>
              ) : (
                <div>
                  <p>
                    To save your match history, you need the AccessRanked5 NFT.
                  </p>
                  <button onClick={createToken}>Create Token</button>
                </div>
              )}
            </div>
            {hasAccessRanked5 && (
              <div className="w-full p-2 m-2 rounded-2xl border-2 border-orange-100 bg-green-300 drop-shadow-lg">
                <button onClick={saveMatchHistory}>Save Match History</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LevelCompleteModal;
