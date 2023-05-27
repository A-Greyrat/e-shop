import React from "react";
import SearchBar from "../Components/MainPage/SearchBar";
import "./MainPage.css";
import LoginWindow from "../Components/MainPage/LoginWindow";
import RecommendList from "../Components/MainPage/RecommendList";
import styled from "styled-components";
import SwiperBar from "../Components/MainPage/SwiperBar";

// eslint-disable-next-line react-refresh/only-export-components
const MiddleComponentStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  min-width: 650px;
  margin-top: 30px;
  margin-bottom: 30px;
`

export default class MainPage extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    render() {
        return (
            <div className="main-page-root">
                <video src="/idle.webm" style={{
                    position: "fixed",
                    bottom: "0",
                    left: "-120px",
                    marginLeft: "5%",
                    width: '300px',
                    height: 'auto',
                    userSelect: "none",
                    zIndex: -1,
                }} autoPlay={true} loop={true}
                       muted={true} playsInline={true}
                />
                <div className="main-page-container">
                    <SearchBar/>
                    <div style={{minHeight: "80px"}}></div>
                    <MiddleComponentStyled>
                        <SwiperBar imageArr={
                            [
                                '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                                '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                            ]
                        }/>
                        <LoginWindow onSubmit={(ev,user,pwd) => {ev.preventDefault();alert(user+" "+pwd)}}/>
                    </MiddleComponentStyled>
                    <RecommendList/>
                </div>
            </div>
        );
    }
}
