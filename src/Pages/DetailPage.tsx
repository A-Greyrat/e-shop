import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Covers from '../Components/DetailPage/Covers';
import PurchaseBlock from '../Components/DetailPage/PurchaseBlock';
import BusinessIntro from '../Components/DetailPage/BusinessIntro';
import GoodsIntro from '../Components/DetailPage/GoodsIntro';
import ajax from '../ts/ajax';
import user from '../ts/user';

import './DetailPage.css';

export default function DetailPage() {
    var { goodsId: goodsIdStr } = useParams();
    var goodsId = parseInt(goodsIdStr || "1");
    const nav = useNavigate();

    const [goodsDetail, setGoodsDetail] = useState<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        cnt: number,
        descCount: number
    }>({
        name: "string",
        price: 0,
        id: 0,
        tags: [],
        cnt: 0,
        descCount: 0
    });
    
    const [businessIntro, setBusinessIntro] = useState<{
        avatar: string,
        name: string,
        goodsRank: number,
        businessRank: number
    }>();

    useEffect(() => {
        ajax.getGoodsDetail(goodsId).then(setGoodsDetail);
        ajax.getBusinessInfoByGid(goodsId).then(setBusinessIntro);
    }, []);

    return (
        <div className='detail-page-root'>
            <div>
                <div onClick={() => {nav("/")}}>
                    <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1484"><path d="M665.6 938.666667c-12.8 0-21.333333-4.266667-29.866667-12.8l-341.333333-332.8c-21.333333-21.333333-34.133333-51.2-34.133333-81.066667s12.8-59.733333 34.133333-81.066667l341.333333-332.8c17.066667-17.066667 42.666667-17.066667 59.733334 0 17.066667 17.066667 17.066667 42.666667 0 59.733334l-341.333334 332.8c-4.266667 4.266667-8.533333 12.8-8.533333 21.333333s4.266667 12.8 8.533333 21.333333l341.333334 332.8c17.066667 17.066667 17.066667 42.666667 0 59.733334-4.266667 8.533333-17.066667 12.8-29.866667 12.8z" fill="#221E1F" p-id="1485"></path></svg>
                </div>
                <BusinessIntro
                    avatar={businessIntro?.avatar}
                    name={businessIntro?.name}
                    goodsRank={businessIntro?.goodsRank}
                    businessRank={businessIntro?.businessRank}
                />
            </div>
            
            <div className='detail-page-product'>
                <Covers imageArr={[ajax.getCoverImgSrc(goodsId)]} />
                <PurchaseBlock
                    goodsId={goodsId}
                    title={goodsDetail.name}
                    price={goodsDetail.price}
                    tags={goodsDetail.tags}
                    goodsCnt={goodsDetail.cnt}
                    addr={user.info.addr}
                    onBuy={async (setBuying, goodsId: number, cnt: number) => {
                        if (cnt==0) return alert("购买数量不能为0。");
                        setBuying(true);
                        var obj = await ajax.buy(user.token,goodsId,cnt);
                        if (obj.status=="200") alert("购买成功。");
                        else alert(`购买失败：${obj?.message}`);
                        setBuying(false);
                        history.go(0);
                    }}
                />
            </div>
            <GoodsIntro imageArr={new Array(goodsDetail.descCount).fill("").map((_, i) => ajax.getDescImgSrc(goodsId, i))} />
        </div>
    )
}
