import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import type { NextPage } from "next";
import RotateIcon from "@icons/RotateIcon";

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
    <div className="relative flex flex-col justify-center items-center w-full h-screen gradient">
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
      <footer className="absolute bottom-10 flex items-center space-x-4">
        <button
          className="w-14 h-14 rounded-full text-white inline-flex justify-center items-center"
          onClick={undoSwipe}
        >
          <RotateIcon />
        </button>
        <div className="w-14 h-14 rounded-full text-white inline-flex justify-center items-center">
          {result.like}
        </div>
        <div className="w-14 h-14 rounded-full text-white inline-flex justify-center items-center">
          {result.nope}
        </div>
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
  const classNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;
  return (
    <>
      {active ? (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            rotate: `${card.name.length % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
        >
          <Emoji label={card.name} emoji={card.emoji} />
          <Title title={card.name} color={card.color} />
        </motion.div>
      ) : (
        <div
          className={`${classNames} ${
            card.name.length % 2 === 0 ? "rotate-6" : "-rotate-6"
          }`}
        >
          <Emoji label={card.name} emoji={card.emoji} />
          <Title title={card.name} color={card.color} />
        </div>
      )}
    </>
  );
};

/**
 * a11y friendly component for emojis
 * @reference https://devyarns.com/accessible-emojis
 */
const Emoji: React.FC<{ emoji: string; label: string }> = ({
  emoji,
  label,
}) => {
  return (
    <span role="img" aria-label={label} className="text-[140px]">
      {emoji}
    </span>
  );
};

const Title: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  return (
    <span style={{ color }} className="text-5xl font-bold">
      {title}
    </span>
  );
};

export default Home;
