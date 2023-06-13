import React from "react";
import SearchBar from "../Components/MainPage/SearchBar";
import "./MainPage.css";
import RecommendList from "../Components/MainPage/RecommendList";
import styled from "styled-components";
import SwiperBar from "../Components/MainPage/SwiperBar";
import LoginBlock from "../Components/MainPage/LoginBlock";
import {ajax} from "../Utils/ajax";

// eslint-disable-next-line react-refresh/only-export-components
const MiddleComponentStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  min-width: 650px;
  margin-top: 30px;
  margin-bottom: 30px;
`

class SwiperItem {
    imgUrl: string;
    clickUrl: string;

    constructor(imgUrl: string, clickUrl: string) {
        this.imgUrl = imgUrl;
        this.clickUrl = clickUrl;
    }
}

export default class MainPage extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    swiperItems: SwiperItem[] = [];

    constructor(props: NonNullable<unknown>) {
        super(props);
    }

    componentDidMount() {
        ajax.get('/api/recommend?num=5').then((res) => {
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
                this.swiperItems.push(new SwiperItem(
                    ajax.defaults.baseURL + "/img/cover?id=" + data[i].id,
                    "/goods?id=" + data[i].id
                ));
            }
            this.forceUpdate();
        });
    }


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
                        <SwiperBar imageArr={this.swiperItems}/>
                        <LoginBlock/>
                    </MiddleComponentStyled>
                    <RecommendList/>
                </div>
            </div>
        );
    }
}
