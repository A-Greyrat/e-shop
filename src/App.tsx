import './App.css';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";

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
