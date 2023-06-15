import './App.css';
import DetailPage from './Pages/DetailPage';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import user from './ts/user';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path='/detail/:goodsId' Component={() => {
                if (user.token) {
                    return <DetailPage/>;
                } else {
                    alert("请先登录。");
                    return <Navigate to="/"/>;
                }
            }}></Route>
            
            <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    );
}

export default App;
