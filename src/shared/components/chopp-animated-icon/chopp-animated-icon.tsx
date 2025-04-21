import { ReactElement } from 'react';
import { motion } from 'framer-motion';

type AnimationType = 'bounce' | 'rotate' | 'scale';

type Props = {
  icon: ReactElement;
  animation?: AnimationType;
  autoplay?: boolean;
  playOnHover?: boolean;
  className?: string;
};

export const ChoppAnimatedIcon = ({
  icon,
  animation = 'bounce',
  autoplay = true,
  playOnHover = false,
  className,
}: Props) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'bounce':
        return {
          animate: { y: [0, -5, 0] },
          transition: { duration: 0.8, repeat: Infinity },
        };
      case 'rotate':
        return {
          animate: { rotate: [0, 15, -15, 0] },
          transition: { duration: 1, repeat: Infinity },
        };
      case 'scale':
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration: 0.8, repeat: Infinity },
        };
      default:
        return {};
    }
  };

  const MotionWrapper = motion.div;

  return (
    <MotionWrapper
      className={className}
      {...(autoplay ? getAnimationProps() : {})}
      whileHover={playOnHover ? getAnimationProps() : {}}
    >
      {icon}
    </MotionWrapper>
  );
};
