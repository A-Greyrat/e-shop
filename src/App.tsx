import './App.css';
import DetailPage from './Pages/DetailPage';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path='/detail/:goodsId' element={<DetailPage/>}></Route>
                
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </>
    );
}

export default App;
