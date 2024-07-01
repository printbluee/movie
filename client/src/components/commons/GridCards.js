import React from 'react'
import { Col } from 'antd';

/*
https://getbootstrap.kr/docs/5.3/layout/grid/
=================
xs : 0 ~ 575px
sm : 576 ~ 767px
md : 768 ~ 991px
lg : 992 ~ 1199px
=================
lg 일때 6개 이미지 : span={4}
md 일때 4개 이미지 : span={6}
sm 일때 4개 이미지 : span={12}
xs 일때 1개 이미지 : span={24}
*/

const GridCards = (props) => {
  // console.log(props)
  // console.log('landingPage >> ', typeof props.landingPage)
  
  if(props.landingPage) {
    // [LandingPage]
    return (
      <Col lg={4} md={6} sm={12} xs={24}> 
        <div>
          <a href={`/movie/${props.movieId}`}>
            <img style={{ width: '100%' }}
              src={props.path}
              alt={props.title}
              />
          </a>
        </div>
      </Col>
    );
  } else {
    // [Detail]
    return (
      <Col lg={4} md={6} sm={12} xs={24}> 
        <div>
          <img style={{ width: '100%' }}
            src={props.path}
            alt={props.castName}
            />
        </div>
      </Col>
    );
  }
};

export default GridCards;