import { useQuery } from 'react-query';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import {
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMoviesResult,
} from '../api';
import { makeImagePath } from '../utils';
import { useMatch } from 'react-router-dom';
import Slider from '../Components/Home/Slider';
import Modal from '../Components/Common/Modal';

const Wrapper = styled.div`
  width: 100vw;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  padding: 0 4%;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 1.4vw;
  width: 50%;
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 80vh;
  padding: 0 4%;
`;

const offset = 6;

function Home() {
  const bigMovieMatch = useMatch('/movies/:id');

  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);

  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(['movies', 'topRated'], getTopRatedMovie);

  const { data: upComingData, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>(['movies', 'upComing'], getUpcomingMovie);

  const clicked = () => {
    if (bigMovieMatch?.params.id) {
      const AringToday = nowPlayingData?.results.find(
        (movie) => movie.id === Number(bigMovieMatch.params.id)
      );
      const Popular = topRatedData?.results.find(
        (movie) => movie.id === Number(bigMovieMatch.params.id)
      );
      const Upcoming = upComingData?.results.find(
        (movie) => movie.id === Number(bigMovieMatch.params.id)
      );

      if (AringToday) {
        return { data: AringToday, category: 'Now Playing' };
      } else if (Popular) {
        return { data: Popular, category: 'Top Rated' };
      } else if (Upcoming) {
        return { data: Upcoming, category: 'Upcoming' };
      }
    }
  };

  return (
    <Wrapper>
      {nowPlayingLoading || topRatedLoading || upComingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Slider
              data={nowPlayingData}
              offset={offset}
              title="Now Playing"
              type="movies"
            />
            <Slider
              data={topRatedData}
              offset={offset}
              title="Top Rated"
              type="movies"
            />
            <Slider
              data={upComingData}
              offset={offset}
              title="Upcoming"
              type="movies"
            />
          </SliderWrapper>
          {
            <AnimatePresence>
              {bigMovieMatch ? (
                <Modal
                  bigMovieMatch={bigMovieMatch}
                  clicked={clicked()}
                  route="/"
                />
              ) : null}
            </AnimatePresence>
          }
        </>
      )}
    </Wrapper>
  );
}
export default Home;
