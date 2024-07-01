import React from 'react'
import AntCard from '../commons/AntCard';
import { Row, } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

const ImgList = (props) => {
  const { list } = props;
  
  return (
    <Row gutter={[10, 10]}>
      {list.map(prop => {
        return (
          <React.Fragment key={prop.credit_id}>
            {prop.profile_path &&
              <AntCard
                path={`${IMAGE_BASE_URL}w400${prop.profile_path}`}
                castName={prop.name}
              />
            }
          </React.Fragment>
        );
      })}
    </Row>
  );
};

export default ImgList;