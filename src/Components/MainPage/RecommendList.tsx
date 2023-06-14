import GoodsItem from './GoodsItem';
import {useEffect, useState} from "react";
import "./RecommendList.css";
import ajax from '../../ts/ajax';
import {useNavigate} from 'react-router-dom';

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

export default function RecommendList() {
    const [recommendList, setRecommendList] = useState<RecommendListItem[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        ajax.getRecommendList(12).then(res => {
            setRecommendList(res.slice());
        });
    }, []);

    return <div className="recommend-list-root">
        <div className="recommend-list-title-container">
            <div className="recommend-list-title">推荐</div>
        </div>
        <div className="recommend-list-container">
            {
                recommendList.map((item) => {
                    return <GoodsItem key={item.id}
                        iconSrc={item.cover}
                        title={item.title}
                        price={item.price}
                        onClick={() => {
                            nav("/detail/" + item.id)
                        }} />
                })
            }
        </div>
    </div>
}
