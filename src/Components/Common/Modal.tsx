import { motion, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { AiFillLike, AiOutlineLike, AiOutlinePlus } from 'react-icons/ai';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { makeImagePath } from '../../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  padding-bottom: 12px;
  font-size: 46px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PlayBtn = styled.button`
  background-color: ${(props) => props.theme.white.lighter};
  padding: 8px 38px;
  margin: 20px;
  margin-right: 12px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
    font-size: 22px;
  }
`;

const BtnWrapper = styled.div`
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.white.lighter};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  svg {
    font-size: 22px;
    stroke-width: 4px;
  }
`;

const BigOverview = styled.div`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  overflow: scroll;
`;

interface Result {
  id: number;
  backdrop_path: string;
  name?: string;
  title?: string;
  overview: string;
}

interface IProps {
  bigMovieMatch: any;
  clicked:
    | {
        data: Result;
        category: string;
      }
    | undefined;
  route: string;
}

function Modal({ bigMovieMatch, clicked, route }: IProps) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => navigate(route);

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={bigMovieMatch.params.id + clicked?.category}
      >
        {clicked && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clicked.data.backdrop_path,
                  'w500'
                )})`,
              }}
            >
              <BigTitle>
                {clicked.data.title ? clicked.data.title : clicked.data.name}
              </BigTitle>
              <BtnsWrapper>
                <PlayBtn>
                  <BsFillCaretRightFill />
                  Play
                </PlayBtn>
                <BtnWrapper onClick={() => setLike((prev) => !prev)}>
                  {like ? <AiFillLike /> : <AiOutlineLike />}
                </BtnWrapper>
                <BtnWrapper>
                  <AiOutlinePlus />
                </BtnWrapper>
              </BtnsWrapper>
            </BigCover>
            <BigOverview>
              <p>{clicked.data.overview}</p>
            </BigOverview>
          </>
        )}
      </BigMovie>
    </>
  );
}

export default Modal;
