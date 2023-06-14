import './App.css';
import DetailPage from './Pages/DetailPage';
import MainPage from "./Pages/MainPage";
import {Navigate, Route, Routes} from "react-router-dom";
import user from './ts/user';
import { useEffect, useState } from 'react';

function App() {
    const [hasLogin, setHasLogin] = useState(!!user.token);

    useEffect(() => {
        const updateLoginState = (token: string) => setHasLogin(!!token);
        return user.tokenSubscription.subscribe(updateLoginState);
    },[]);

    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path='/detail/:goodsId' element={hasLogin ? <DetailPage/> : <Navigate to="/"/>}></Route>
                
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
            </Routes>
        </>
    );
}

export default App;
