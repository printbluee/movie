import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import AntCard from '../commons/AntCard';
import MainImage from './Section/MainImage';


function LandingPage() {
  // useEffect : React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말함
  // 클라이언트가 서버에게 요청할 때 서버가 응답이 느릴 경우 
  // 서버가 요청이 올 때까지 작업을 못하니까 비동기 처리할 것
  // => 서버에 요청할 땐 비동기 처리할 것

  const navigate = useNavigate();

  // [state]
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null); // 첫 번째로 받은 data 를 메인 이미지로 지정, 값이 안 올 수 있기 때문에 기본값을 null
  const [CurrentPage, setCurrentPage] = useState(0); // 0 페이지는 없으니 1 페이지부터 !

  useEffect(() => {
    const page = 1; // 시작할 땐 1 페이지니까 여기서 상태 설정 하지 않음
    fetchMovies(page);
  }, []);

  const loadMoreItems = () => {
    fetchMovies(CurrentPage + 1);
  };

  return (
    <>
      <div>
        {/* <Link to='/items'>items 이동</Link> &nbsp;&nbsp;
        <a href='/items'>[a 태그] Items 로 이동</a> */}
      </div>
      <div style={{ width: '100%' }}>
        {/* Main Image : 웹 브라우저 꽉차게 */}
        {MainMovieImage &&
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.poster_path}`}
            title={`${MainMovieImage.title}`}
            overview={`${MainMovieImage.overview}`}
          />
        }

        {/* 다음 버튼 */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Button onClick={() => navigate(1)}>다음</Button>
        </div>

        <div style={{ width: '85%', margin: '1rem auto' }}>
          <h2>새로 나온 영화</h2>
          <hr />

          {/* Movie Grid Card : 웹 브라우저 안 쪽으로 좀 들어가게 */}
          <Row gutter={[10, 10]}>
            {/* 6개의 컬럼이 오기 위해서 map 을 통해서 반복문 구현 */}
            {Movies.map(movie => {
              return (
                <React.Fragment key={movie.id}>
                  <AntCard
                    landingPage
                    path={`${IMAGE_BASE_URL}w400${movie.poster_path}`}
                    title={movie.title}
                    movieId={movie.id}
                  />
                </React.Fragment>
              );
            })}
          </Row>
        </div>

        {/* 더보기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Button onClick={loadMoreItems}>더보기</Button>
        </div>
      </div>
    </>
  )

  function fetchMovies(page) {
    const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    fetch(endpoint) // 요청
      .then(res => res.json()) // 응답 : 객체변환
      .then(res => {
        // console.log(res.results);
        setMovies([...Movies, ...res.results]); // 전개 연산자 : 배열 또는 객체를 하나하나 넘기는 용도
        setMainMovieImage(res.results[0]);
        setCurrentPage(res.page);
      });
  }
}

export default LandingPage;