import GoodsItem from './GoodsItem';
import React from "react";
import "./RecommendList.css";
import ajax from '../../ts/ajax';

class RecommendListItem {
    id: number;
    title: string;
    price: number;
    cover: string;

    constructor(id: number, title: string, price: number) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cover = ajax.serverUrl + "/img/cover?id=" + id;
    }
}

export default class RecommendList extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    state: Readonly<{ recommendList: RecommendListItem[] }> = {
        recommendList: []
    }

    constructor(props: NonNullable<unknown>) {
        super(props);
    }

    componentDidMount() {
        ajax.getRecommandList(12).then(x => this.setState({
            recommendList: x
        }))
    }

    render() {
        return <div className="recommend-list-root">
            <div className="recommend-list-title-container">
                <div className="recommend-list-title">推荐</div>
            </div>
            <div className="recommend-list-container">
                {
                    this.state.recommendList.map((item) => {
                        return <GoodsItem key={item.id}
                            iconSrc={item.cover}
                            title={item.title}
                            price={item.price}
                            onClick={() => {
                                window.location.href = "/detail/" + item.id;
                            }} />
                    })
                }
            </div>
        </div>
    }
}
