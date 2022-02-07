import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch } from 'react-router';
import styled from 'styled-components';
import { getSearchMovie, getSearchTv, IMovie, ITv } from '../api';
import Modal from '../Components/Common/Modal';
import Slider from '../Components/Home/Slider';

const Wrapper = styled.div`
  width: 100vw;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 15vh;
  padding: 0 4%;
`;

const offset = 6;

function Search() {
  const bigMovieMatch = useMatch('/searches/:id');
  const keyword = useMatch('/search/:keyword');
  const { data: movieData, isLoading: movieLoading } = useQuery(
    ['search', 'movie'],
    () => getSearchMovie(keyword?.params.keyword)
  );

  const { data: TvData, isLoading: TvLoading } = useQuery(
    ['search', 'tv'],
    () => getSearchTv(keyword?.params.keyword)
  );

  const clicked = () => {
    if (bigMovieMatch?.params.id) {
      const Movie = movieData?.results.find(
        (movie: IMovie) => movie.id === Number(bigMovieMatch.params.id)
      );
      const Tv = TvData?.results.find(
        (tv: ITv) => tv.id === Number(bigMovieMatch.params.id)
      );

      if (Tv) {
        return { data: Tv, category: 'Tv' };
      } else if (Movie) {
        return { data: Movie, category: 'Movie' };
      }
    }
  };

  return (
    <Wrapper>
      {movieLoading || TvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderWrapper>
            <Slider
              data={movieData}
              offset={offset}
              title="Movie"
              type="searches"
            />
            <Slider data={TvData} offset={offset} title="Tv" type="searches" />
          </SliderWrapper>
          {
            <AnimatePresence>
              {bigMovieMatch ? (
                <Modal
                  bigMovieMatch={bigMovieMatch}
                  clicked={clicked()}
                  route={`/search/${keyword?.params.keyword}`}
                />
              ) : null}
            </AnimatePresence>
          }
        </>
      )}
    </Wrapper>
  );
}

export default Search;
