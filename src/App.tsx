import './App.css';
import LoginWindow from './Components/MainPage/LoginWindow';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import mainController from './ts/mainController';
import PersonalWindow from './Components/MainPage/PersonalWindow';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </>
    );
}

export default App;
