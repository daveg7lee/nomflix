import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { makeImagePath } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';

const SSlider = styled.div`
  margin-bottom: 30vh;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 220px);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 130px;
  border-radius: 4px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Title = styled.h2`
  font-size: 1.4vw;
  margin-bottom: 15px;
  font-weight: 500;
`;

const RightIconWrapper = styled(motion.div)`
  position: absolute;
  right: 4vw;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
  height: 130px;
  width: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  path {
    stroke-width: 2px;
  }
  border-radius: 4px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

interface Result {
  id: number;
  backdrop_path: string;
  name?: string;
  title?: string;
  overview: string;
}

interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

interface IProps {
  data: Data | undefined;
  offset: number;
  title: string;
  type: 'movies' | 'tvs' | 'searches';
}

function Slider({ data, offset, title, type }: IProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/${type}/${movieId}`);
  };
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <SSlider>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={movie.id + title}
                key={movie.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(movie.id)}
                transition={{ type: 'tween' }}
                bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title ? movie.title : movie.name}</h4>
                </Info>
              </Box>
            ))}
          <RightIconWrapper
            onClick={incraseIndex}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <BsChevronRight />
          </RightIconWrapper>
        </Row>
      </AnimatePresence>
    </SSlider>
  );
}

export default Slider;
