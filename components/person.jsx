import Image from "next/image";
import { useEffect, useState } from "react";

export default function Person({ person, handleClick, handleDoubleClick }) {
  const { name, image } = person;
  const [isCardClicked, setCardClicked] = useState(false);

  const cardClickHandler = () => {
    setCardClicked(!isCardClicked);
    handleClick(person);
    console.log("is it flipped?", person.flipped);
  };

  return (
    <div className="h-16 w-16 md:h-[90px] md:w-[90px]">
      {/* <h1>{name}</h1> */}
      {/* <p>oh, from {known_for}, right?</p> */}
      {/* <Link className="relative h-16" href={`/about`}> */}
      <div className="relative flex items-center justify-center aspect-square">
        <Image
          src={image}
          alt={`image of ${name}`}
          fill
          className={`items-center w-full h-full object-cover my-0.5 rounded-md focus:outline-none focus:ring focus:ring-violet-300 hover:border-solid active:border-red-700  hover:border-2 duration-500 ${
            person.flipped ? "blur-sm" : ""
          }`}
          // className="absolute h-full w-full object-cover rounded-md"
          onClick={() => cardClickHandler()}
          onDoubleClick={() => handleDoubleClick(person)}
        />
      </div>
    </div>
  );
}
