import React from "react";
import SearchBar from "../Components/SearchBar";
import "./MainPage.css";
import LoginWindow from "../Components/LoginWindow";
import Recommend from "../Components/Recommend";
import styled from "styled-components";
import SwipperBar from "../Components/SwipperBar";

const MiddleComponentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80vw;
`

export default class MainPage extends React.Component<{}, {}> {
    render() {
        return (
            <div className="main-page-root">
                <div className="main-page-container">
                    <SearchBar />
                    <div style={{minHeight: "80px"}}></div>
                    <MiddleComponentStyled>
                        <SwipperBar/>
                        <LoginWindow shown setShown={()=>{}}/>
                    </MiddleComponentStyled>
                    <Recommend/>
                </div>
            </div>
        );
    }
}
