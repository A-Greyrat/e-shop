import GoodsItem from './GoodsItem';
import React, { useEffect, useState } from "react";
import "./RecommendList.css";
import { useNavigate } from 'react-router-dom';
import ajax from '../../ts/ajax';

const RecommendList: React.FC = () => {
    var nav = useNavigate();

    const [recommandArr, setRecommandArr] = useState<{
        goodsId: number,
        iconSrc: string,
        title: string,
        price: number,
    }[]>([]);

    useEffect(() => {
        (async () => {
            var obj = await ajax.getRecommandList();
            if (obj.statusCode==200 && obj.list) {
                setRecommandArr(obj.list)
            }
        })();
    },[]);

    return <div className="recommend-list-root">
        <div className="recommend-list-title-container">
            <div className="recommend-list-title">推荐</div>
        </div>
        <div className="recommend-list-container">
            {
                recommandArr.map(x => <GoodsItem
                    key={x.goodsId}
                    iconSrc={x.iconSrc}
                    title={x.title}
                    price={x.price}
                    onClick={() => nav(`/detail/${x.goodsId}`)}
                />)
            }
        </div>
    </div>
};

export default RecommendList;
