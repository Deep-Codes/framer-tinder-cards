import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
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

type ArrayElementType<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type CardType = ArrayElementType<typeof CARDS>;

type SwipeType = "like" | "nope";

type ResultType = { [k in SwipeType]: number };

type HistoryType = CardType & { swipe: SwipeType };

interface CardProps {
  card: CardType;
  active: boolean;
  removeCard: (oldCard: CardType, swipe: SwipeType) => void;
}

const Home: NextPage = () => {
  const [cards, setCards] = useState(CARDS);
  const [result, setResult] = useState<ResultType>({ like: 0, nope: 0 });
  const [history, setHistory] = useState<HistoryType[]>([]);
  // index of last card
  const activeIndex = cards.length - 1;
  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setCards((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };
  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
      setCards((current) => [...current, newCard]);
    }
  };
  return (
    <div className="relative flex flex-col bg-black justify-center items-center w-full h-screen">
      <AnimatePresence>
        {cards.map((card, index) => (
          <Card
            key={card.name}
            active={index === activeIndex}
            removeCard={removeCard}
            card={card}
          />
        ))}
      </AnimatePresence>
      <footer className="absolute bottom-10">
        <button onClick={undoSwipe}>Undo</button>
        <span> ❤️ {result.like}</span>
        <span> ❌ {result.nope}</span>
      </footer>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ card, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.x > 200) {
      setLeaveX(1000);
      removeCard(card, "like");
    }
    if (info.offset.x < -200) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };
  return (
    <>
      {active ? (
        <motion.div
          style={{
            background: "linear-gradient(180deg, #050505 0%, #111111 100%)",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
          }}
          exit={{
            x: leaveX,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className="absolute h-[430px] w-[300px] border border-gray-500 shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab"
        >
          <span className="text-[140px]">{card.emoji}</span>
          <span style={{ color: card.color }} className="text-5xl font-bold">
            {card.name}
          </span>
        </motion.div>
      ) : (
        <div
          style={{
            background: "linear-gradient(180deg, #050505 0%, #111111 100%)",
          }}
          className="absolute h-[430px] w-[300px] rounded-2xl flex flex-col justify-center items-center cursor-grab"
        >
          <span className="text-[140px]">{card.emoji}</span>
          <span style={{ color: card.color }} className="text-5xl font-bold">
            {card.name}
          </span>
        </div>
      )}
    </>
  );
};

export default Home;
