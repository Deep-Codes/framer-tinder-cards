import type { NextPage } from "next";

const CARDS = [
  { id: 0, emoji: "🍅", name: "Tomato", color: "#E42100" },
  { id: 1, emoji: "🍊", name: "Tangerine", color: "#F36000" },
  { id: 2, emoji: "🍋", name: "Lemon", color: "#F3BC00" },
  { id: 3, emoji: "🍐", name: "Pear", color: "#A0A226" },
  { id: 4, emoji: "🥬", name: "Lettuce", color: "#349B19" },
  { id: 5, emoji: "🫐", name: "Blueberries", color: "#70BBFF" },
  { id: 6, emoji: "🍆", name: "Eggplant", color: "#7F4877" },
  { id: 7, emoji: "🍇", name: "Grapes", color: "#BC2A6E" },
];

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col bg-black justify-center items-center w-full h-screen">
      {CARDS.map((card) => (
        <div
          style={{
            background: "linear-gradient(180deg, #050505 0%, #111111 100%)",
          }}
          key={card.name}
          className="absolute h-[430px] w-[300px] border border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-grab"
        >
          <span className="text-[140px]">{card.emoji}</span>
          <span style={{ color: card.color }} className="text-5xl font-bold">
            {card.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Home;
