import Image from "next/image";

function CardDetail({ selectedCard, cardSelected }) {
  return (
    <div className="h-full px-2">
      <h1 className="text-center z-10 font-gorditas">
        {selectedCard?.name ? selectedCard.name : "DaDeuce"}
      </h1>
      <div className="flex flex-col sm:flex-row justify-center text-slate-900">
        <div className="flex justify-center place-content-center max-h-36 h-36 md:max-h-64 md:h-64">
          <div className="relative w-36 md:w-64">
            <Image
              src={!cardSelected ? "/images/dadeuce.png" : selectedCard.image}
              alt={
                !cardSelected
                  ? `image of a DaDeuce Placehold who is known for holding a place`
                  : `image of ${selectedCard.name} a ${selectedCard.type} on the ${selectedCard.team}, by ${selectedCard.image_provenance}`
              }
              className="object-cover h-36 md:h-64 w-fit rounded-l-lg z-10"
              fill
            />
          </div>
          <div className="text-sm md:text-base border-red-500 rounded-r-lg p-1 bg-red-200 max-w-prose w-56 md:w-72">
            {!cardSelected ? (
              <p>
                DaDeuce Placehold is known for **holding a place**, click a card
                to see more details here, double click once you&#39;ve chosen
                your character!
              </p>
            ) : (
              <div className="flex flex-col m-2">
                {Object.keys(selectedCard).map((key) => {
                  // Avoid rendering the 'id' field and 'attributes' field, which needs to be handled separately
                  if (
                    key !== "id" &&
                    key !== "attributes" &&
                    key !== "image" &&
                    key !== "image_provenance" &&
                    key !== "catchphrase" &&
                    key !== "name"
                  ) {
                    return (
                      <div key={key}>
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {selectedCard[key]}
                      </div>
                    );
                  }
                  // Handle 'attributes' field
                  //   if (key === "attributes") {
                  //     return (
                  //       <div key={key}>
                  //         <strong>Attributes:</strong>
                  //         {Object.keys(selectedCard[key]).map((attribute) => (
                  //           <div key={attribute}>
                  //             <strong>
                  //               {attribute.charAt(0).toUpperCase() +
                  //                 attribute.slice(1)}
                  //               :
                  //             </strong>{" "}
                  //             {selectedCard[key][attribute]}
                  //           </div>
                  //         ))}
                  //       </div>
                  //     );
                  //   }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="w-36 md:w-64 text-xs align-middle justify-center text-center items-center pb-2">
        {selectedCard?.catchphrase
          ? selectedCard.catchphrase
          : "DaDeuce the game"}
      </p>
    </div>
  );
}

export default CardDetail;
