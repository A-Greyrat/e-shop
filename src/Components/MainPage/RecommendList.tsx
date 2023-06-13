// import GoodsItem from './GoodsItem';
// import React, { useEffect, useState } from "react";
// import "./RecommendList.css";
// import { useNavigate } from 'react-router-dom';
// import ajax from '../../ts/ajax';

// const RecommendList: React.FC = () => {
//     var nav = useNavigate();

//     const [recommandArr, setRecommandArr] = useState<{
//         goodsId: number,
//         iconSrc: string,
//         title: string,
//         price: number,
//     }[]>([]);

//     useEffect(() => {
//         (async () => {
//             var obj = await ajax.getRecommandList();
//             if (obj.statusCode==200 && obj.list) {
//                 setRecommandArr(obj.list)
//             }
//         })();
//     },[]);

//     return <div className="recommend-list-root">
//         <div className="recommend-list-title-container">
//             <div className="recommend-list-title">推荐</div>
//         </div>
//         <div className="recommend-list-container">
//             {
//                 recommandArr.map(x => <GoodsItem
//                     key={x.goodsId}
//                     iconSrc={x.iconSrc}
//                     title={x.title}
//                     price={x.price}
//                     onClick={() => nav(`/detail/${x.goodsId}`)}
//                 />)
//             }
//         </div>
//     </div>
// };
import React from "react";
import {ajax} from "../../Utils/ajax";
import GoodsItem from "./GoodsItem";

class RecommendListItem {
    id: number;
    title: string;
    price: number;
    cover: string;

    constructor(id: number, title: string, price: number) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.cover = ajax.defaults.baseURL + "/img/cover?id=" + id;
    }
}

export default class RecommendList extends React.Component<NonNullable<unknown>, NonNullable<unknown>> {
    private recommendList: RecommendListItem[] = [];

    constructor(props: NonNullable<unknown>) {
        super(props);
    }

    componentDidMount() {
        ajax.get('recommend?num=12').then((res: { data: { data: any; }; }) => {
            console.log(res);
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
                this.recommendList.push(new RecommendListItem(data[i].id, data[i].name, data[i].price));
            }
            this.forceUpdate();
        });
    }

    render() {
        return <div className="recommend-list-root">
            <div className="recommend-list-title-container">
                <div className="recommend-list-title">推荐</div>
            </div>
            <div className="recommend-list-container">
                {
                    this.recommendList.map((item) => {
                        return <GoodsItem key={item.id}
                                          iconSrc={item.cover}
                                          title={item.title}
                                          price={item.price}
                                          onClick={() => {
                                              window.location.href = "/goods?id=" + item.id;
                                          }}/>
                    })
                }
            </div>
        </div>
    }
}
