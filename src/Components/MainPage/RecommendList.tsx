import { useState } from 'react';
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
    const [pageIndex, setPageIndex] = useState(0);
    const itemsCntPerPage = 12;

    return <div className="recommend-list-root">
        <div className="recommend-list-title-container">
            <div className="recommend-list-title">{title}</div>
        </div>
        <div className="recommend-list-container">
            {
                listData
                ?.slice(pageIndex*itemsCntPerPage,(pageIndex+1)*itemsCntPerPage)
                .map((item) => {
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
        <PageCntViewer pageIndex={pageIndex} setPageIndex={setPageIndex} maxPageIndex={Math.ceil(listData?.length/itemsCntPerPage)}/>
    </div>
}

function PageCntViewer({pageIndex,setPageIndex,maxPageIndex}: {
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    maxPageIndex: number;
}) {
    return (
        <div className="page-cnt-viewer">
            <button onClick={()=>(pageIndex-1>=0) && setPageIndex(pageIndex-1)}>上一页</button>
            <div>{pageIndex+1}</div>
            <button onClick={()=>(pageIndex+1<maxPageIndex) && setPageIndex(pageIndex+1)}>下一页</button>
            <div>共 {maxPageIndex} 页</div>
        </div>
    )
}