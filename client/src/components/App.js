import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Detail from './Detail/Detail';
import Items from './Items/Items';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ minHeight: '100vh' }}>
        {/* 요청된 경로로 페이지 이동 : 특정 컴포넌트 실행 */}
        <Router basename={ process.env.PUBLIC_URL }>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/detail/:movieId" element={<Detail />} /> 
            <Route path="/items" element={<Items />} />
          </Routes>
        </Router>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;