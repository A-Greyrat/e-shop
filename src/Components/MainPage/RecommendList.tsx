import GoodsItem from './GoodsItem';
import {useEffect, useState} from "react";
import "./RecommendList.css";
import ajax from '../../ts/ajax';
import {useNavigate} from 'react-router-dom';

export default function RecommendList() {
    const [recommendList, setRecommendList] = useState<{
        id: number,
        name: string,
        price: number,
        cover: string,
    }[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        ajax.getRecommendList(12).then(setRecommendList);
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
                        title={item.name}
                        price={item.price}
                        onClick={() => {
                            nav("/detail/" + item.id);
                        }} />
                })
            }
        </div>
    </div>
}
