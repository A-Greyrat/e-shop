import GoodsItem from './GoodsItem';
import "./RecommendList.css";
import {useNavigate} from 'react-router-dom';

export default function RecommendList({title,listData}: {
    title: string;
    listData: {
        id: number,
        name: string,
        price: number,
        cover: string,
    }[];
}) {
    const nav = useNavigate();

    return <div className="recommend-list-root">
        <div className="recommend-list-title-container">
            <div className="recommend-list-title">{title}</div>
        </div>
        <div className="recommend-list-container">
            {
                listData.map((item) => {
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
