import Image from "next/image";

function CardDetail({ selectedCard }) {
  return (
    <div className="flex flex-row-reverse p-4 m-4 border border-gray-200 rounded shadow">
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
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {selectedCard[key]}
              </div>
            );
          }
          // Handle 'attributes' field
          if (key === "attributes") {
            return (
              <div key={key}>
                <strong>Attributes:</strong>
                {Object.keys(selectedCard[key]).map((attribute) => (
                  <div key={attribute}>
                    <strong>
                      {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
                    </strong>{" "}
                    {selectedCard[key][attribute]}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className=" text-center align-middle items-center justify-center">
        <h1>{selectedCard.name}</h1>
        <Image
          src={selectedCard.image}
          alt={selectedCard.name}
          width={256}
          height={256}
        />
        <p>{selectedCard.catchphrase}</p>
      </div>
    </div>
  );
}

export default CardDetail;
