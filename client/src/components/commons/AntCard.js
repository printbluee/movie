import React from 'react'
import { Col, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AntCard = (props) => {

  if (props.landingPage) {
    // [LandingPage]
    return(
      <Col lg={4} md={6} sm={12} xs={24}>
        <Card hoverable style={{ width: '100%' }}
        cover={
          <div>
            <Link to={`/detail/${props.movieId}`}>
              <img style={{ width: '100%' }} alt={props.title} src={props.path} />
            </Link>
          </div>}>
          <Meta title={props.title} />
        </Card>
      </Col>
    )
  } else {
    // [Detail] 처리
    return (
      <Col lg={4} md={6} sm={12} xs={24}>
        <Card hoverable style={{ width: '100%' }}
        cover={
          <div>
            <img style={{ width: '100%' }}
              src={props.path}
              alt={props.castName}
            />
          </div>}>
          <Meta title={props.castName} />
        </Card>
      </Col>
    );
  }
};

export default AntCard;