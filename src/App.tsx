import './App.css';
import DetailPage from './Pages/DetailPage';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import user from './ts/user';
import BackstagePage from './Pages/BackstagePage';
import SearchPage from './Pages/SearchPage';

function App() {
    const componentAfterLogin = (comp: any) => {
        return () => {
            if (user.token) {
                return comp;
            } else {
                alert("请先登录。");
                return <Navigate to="/"/>;
            }
        }
    }
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/detail/:goodsId' Component={componentAfterLogin(<DetailPage/>)}></Route>
            <Route path='/backstage/*' Component={componentAfterLogin(<BackstagePage/>)}></Route>
            
            <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    );
}

export default App;
