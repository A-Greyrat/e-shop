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
                        <SwiperBar imageArr={["//gw.alicdn.com/bao/uploaded/i2/1126047243/O1CN011Crsu123NLXcaHVfF_!!1126047243.jpg_300x300q90.jpg","//gw.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01qPHBPh1DfnSsV7wb8_!!2213246300244.jpg_300x300q90.jpg"]}/>
                        <LoginWindow />
                    </MiddleComponentStyled>
                    <RecommendList/>
                </div>
            </div>
        );
    }
}
