import React from "react";
import SearchBar from "../Components/SearchBar";
import "./MainPage.css";

export default class MainPage extends React.Component<{}, {}> {
    render() {
        return (
            <div className="main-page-root">
                <div className="main-page-container">
                    <SearchBar />
                </div>
            </div>
        );
    }
}
