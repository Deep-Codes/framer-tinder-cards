import { PanInfo, motion } from "framer-motion";
import { useState } from "react";
import { CardProps } from "types";

const Card: React.FC<CardProps> = ({ card, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };
  const classNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;
  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
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
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
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

export default Card;
