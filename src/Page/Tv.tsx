import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
  getAringTodayTv,
  getPopularTv,
  getTopRatedTv,
  IGetTvResult,
} from '../api';
import Slider from '../Components/Home/Slider';
import { makeImagePath } from '../utils';
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

function Tv() {
  const bigMovieMatch = useMatch('/tvs/:id');

  const { data: AringTodayData, isLoading: AringTodayLoading } =
    useQuery<IGetTvResult>(['tv', 'AringToday'], getAringTodayTv);

  const { data: PopularData, isLoading: PopularLoading } =
    useQuery<IGetTvResult>(['tv', 'Popular'], getPopularTv);

  const { data: TopRatedData, isLoading: TopRatedLoading } =
    useQuery<IGetTvResult>(['tv', 'topRated'], getTopRatedTv);

  const clicked = () => {
    if (bigMovieMatch?.params.id) {
      const AringToday = AringTodayData?.results.find(
        (tv) => tv.id === Number(bigMovieMatch.params.id)
      );
      const Popular = PopularData?.results.find(
        (tv) => tv.id === Number(bigMovieMatch.params.id)
      );
      const TopRated = TopRatedData?.results.find(
        (tv) => tv.id === Number(bigMovieMatch.params.id)
      );
      if (AringToday) {
        return { data: AringToday, category: 'Aring Today' };
      } else if (Popular) {
        return { data: Popular, category: 'Popular' };
      } else if (TopRated) {
        return { data: TopRated, category: 'Top Rated' };
      }
    }
  };

  console.log(AringTodayData, PopularData, TopRatedData);

  return (
    <Wrapper>
      {AringTodayLoading || PopularLoading || TopRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              AringTodayData?.results[0].backdrop_path || ''
            )}
          >
            <Title>{AringTodayData?.results[0].name}</Title>
            <Overview>{AringTodayData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Slider
              data={AringTodayData}
              offset={offset}
              title="Aring Today"
              type="tvs"
            />
            <Slider
              data={PopularData}
              offset={offset}
              title="Popular"
              type="tvs"
            />
            <Slider
              data={TopRatedData}
              offset={offset}
              title="Top Rated"
              type="tvs"
            />
          </SliderWrapper>
          <AnimatePresence>
            {bigMovieMatch ? (
              <Modal
                clicked={clicked()}
                bigMovieMatch={bigMovieMatch}
                route="/tv"
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
