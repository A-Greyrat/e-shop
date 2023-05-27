import React from "react";
import SearchBar from "../Components/SearchBar";
import "./MainPage.css";
import LoginWindow from "../Components/LoginWindow";
import RecommendList from "../Components/RecommendList";
import styled from "styled-components";
import SwiperBar from "../Components/SwiperBar";

// eslint-disable-next-line react-refresh/only-export-components
const MiddleComponentStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  margin: 30px;
`

export default class MainPage extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    render() {
        return (
            <div className="main-page-root">
                <div className="main-page-container">
                    <SearchBar/>
                    <div style={{minHeight: "80px"}}></div>
                    <MiddleComponentStyled>
                        <SwiperBar/>
                        <LoginWindow />
                    </MiddleComponentStyled>
                    <RecommendList/>
                </div>
            </div>
        );
    }
}
