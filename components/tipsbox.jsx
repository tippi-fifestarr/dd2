export default function Tipsbox({
  chosenCard,
  tips,
  cardsRemaining,
  finalCard,
}) {
  // perhaps cardsRemaining should be an array of cards remaining
  // and when we want to show the number of cards remaining, we can just do cardsRemaining.length
  // and when we want to display the final cards, we can just output the cardsRemaining and forget about finalCard

  // console.log("array?", tips);
  let isChosen = chosenCard.name != "none" ? true : false;
  // useEffect(() => {
  //   console.log(cardsRemaining);
  // }, [cardsRemaining]);
  return (
    <div className="">
      {!isChosen ? (
        // for each tip in tips, render a tooltip
        <div
          className={`w-fit bg-slate-200 bg-opacity-20 rounded-xl items-center p-1 gap-1 mx-2 mb-1 flex flex-col-reverse`}
        >
          <div>
            {tips.map((tip) => (
              <div
                key={tip}
                className="text-xs md:text-base lg:text-lg text-slate-200 md:p-0.5 lg:p-1"
              >
                <div>{tip}</div>
              </div>
            ))}
          </div>
          <div
            className={`text-xs md:text-sm lg:text-base text-slate-200 md:p-0.5 lg:p-1`}
          >
            🤩 double click to choose a card. begin!
          </div>
          <div
            className={`text-xs md:text-sm lg:text-base text-slate-200 md:p-0.5 lg:p-1`}
          >
            😉 single click to view. welcome to dadeuce!
          </div>
        </div>
      ) : isChosen ? (
        <div
          className={`w-fit bg-slate-200 bg-opacity-20 rounded-xl items-center p-1 gap-1 m-1`}
        >
          {/* <h1 className="font-inter"> - make the tooltips :star_struck: 🤩 </h1> */}
          <div
            className={`text-xs md:text-base lg:text-lg text-slate-200 p-0.5 md:p-1 lg:p-2`}
          >
            ❤️‍🔥 click card to examine, ask y/n questions!
          </div>
          <div
            className={`text-xs md:text-base lg:text-lg text-slate-200 p-0.5 md:p-1 lg:p-2`}
          >
            🤩 now, you can double click to &quot;flip&quot; a card. Eliminate!
          </div>
          <div className="text-xs md:text-base lg:text-lg text-slate-200 p-0.5 md:p-1 lg:p-2">
            {cardsRemaining >= 18
              ? `🔍 You've chosen ${chosenCard.name}, see?`
              : cardsRemaining >= 14
              ? `${cardsRemaining} cards remaining`
              : cardsRemaining >= 10
              ? `${tips ? tips[0] : "no tips yet"}`
              : cardsRemaining >= 5
              ? `"you're getting close, player!" - dadeuce`
              : cardsRemaining >= 2
              ? `"LAST CARDS! DID YOU DADEUCE?!`
              : cardsRemaining === 0
              ? `${finalCard}🤩 you da deuce! 🤩`
              : `🤩 you da deuce! 🤩`}
          </div>
        </div>
      ) : (
        <div>
          what the heck is going on? <br />
          <br />
        </div>
      )}
    </div>
  );
}
