import { Button, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import MainImage from '../LandingPage/Section/MainImage';
import ImgList from './ImgList';
import MovieInfo from './MovieInfo';

const Detail = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  // [state]
  const [Movie, setMovie] = useState({}); // json 형태니까 {} 형태로
  const [Casts, setCasts] = useState([]); // 배열 형태니까 [] 형태로 
  const [Crews, setCrews] = useState([]); // 배열 형태니까 [] 형태로 
  const [ActorToggle, setActorToggle] = useState(false);
  const [CrewToggle, setCrewToggle] = useState(false);

  useEffect(() => {
    // [특정 영화 정보] URL
    let endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`;

    // [출연진/제작진] URL
    let endpointCrew = `${API_URL}${movieId}/credits?api_key=${API_KEY}`;

    // [특정 영화 정보] 영화 아이디로 정보 요청
    axios.get(endpointInfo).then(obj => setMovie(obj.data))

    // [출연진/제작진] 정보 요청
    axios(endpointCrew).then(obj => {
      setCasts(obj.data.cast)
      setCrews(obj.data.crew)
    })

  }, []);

  // 버튼 핸들러 
  function toggleActorView() {
    setActorToggle(!ActorToggle);
  }
  function toggleCrewView() {
    setCrewToggle(!CrewToggle);
  }

  return (
    <>
      {/* Header */}
      {Movie &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.poster_path}`}
          title={`${Movie.title}`}
          overview={`${Movie.overview}`}
        />
      }

      {/* 영화 목록 버튼 */}
      <div style={{ textAlign: 'center', margin: '40px' }}>
        {/* -1 : 이전 페이지 */}
        <Button onClick={() => navigate(-1)}>영화 목록</Button>
      </div>

      {/* Body */}
      <div style={{ width: '85%', margin: '20px auto' }}>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />

        {/* Actors Grid */}
        {/* 배우 목록 버튼 */}
        <div style={{ textAlign: 'center', margin: '40px' }}>
          <div style={{ display: 'inline-block', textAlign: 'center', margin: '5px' }}>
            <Button type={ActorToggle ? 'primary' : 'dashed'} onClick={toggleActorView}>배우 목록</Button>
          </div>
          <div style={{ display: 'inline-block', textAlign: 'center', margin: '5px' }}>
            <Button type={CrewToggle ? 'primary' : 'dashed'} onClick={toggleCrewView}>제작진 목록</Button>
          </div>
        </div>

        {/* 배우 목록 버튼 */}
        {ActorToggle &&
          <>
            <Divider style={{ borderColor: '#00f' }}>배우 목록</Divider>
            <ImgList 
              list={Casts}
            />
            {/* {<Row gutter={[10, 10]}>
              {Casts.map(cast => {
                return (
                  <React.Fragment key={cast.id}>
                    {cast.profile_path &&
                      <AntCard
                        path={`${IMAGE_BASE_URL}w400${cast.profile_path}`}
                        castName={cast.name}
                      />
                    }
                  </React.Fragment>
                );
              })}
            </Row>} */}
          </>
        }

        {/* 제작진 목록 버튼 */}
        {CrewToggle &&
          <>
            <Divider style={{ borderColor: '#00f' }}>제작진 목록</Divider>
            <ImgList 
              list={Crews}
            />
            {/* {<Row gutter={[10, 10]}>
              {Crews.map((crew, index) => {
                return (
                  <React.Fragment key={index}>
                    {crew.profile_path &&
                      <AntCard
                        path={`${IMAGE_BASE_URL}w400${crew.profile_path}`}
                        castName={crew.name}
                      />
                    }
                  </React.Fragment>
                );
              })}
            </Row>} */}
          </>
        }

      </div>
    </>
  );
};

export default Detail;