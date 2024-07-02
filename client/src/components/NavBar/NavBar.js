import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

// 메뉴가 여러 개일 때 배열 형태로 나타낸 것
// const items1 = ['HOME', '메뉴'].map((key, test) => ({
//   key,
//   label: <a href={
//     key == 'HOME' ? '/' : key
//   }>{key}</a>,
// }));

// 메뉴가 한 개이니 배열 형태로 안함
const items = [{
  key: 'Home',
  label: (<a href='/movie'>Home</a>)
}];

const NavBar = () => {
  return (
    <Layout>
      <Header
        style={{ display: 'flex', alignItems: 'center', }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
    </Layout>
  );
};

export default NavBar;