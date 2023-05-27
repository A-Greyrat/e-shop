import React from "react";
import "./SearchBar.css";

export default class SearchBar extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    render() {
        return (
            <div className="search-bar-root">
                <input className="search-bar-content" type="text" placeholder="搜索"/>
                <div className="search-bar-icon" style={{height: "100%"}}>
                    <div className="search-bar-icon-container">
                        <svg viewBox="0 0 1024 1024"
                             xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                            <path
                                d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"
                                fill="#2c2c2c"></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}
