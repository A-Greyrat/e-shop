import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Covers from '../Components/DetailPage/Covers';
import PurchaseBlock from '../Components/DetailPage/PurchaseBlock';
import BusinessIntro from '../Components/DetailPage/BusinessIntro';
import GoodsIntro from '../Components/DetailPage/GoodsIntro';
import ajax from '../ts/ajax';

import './DetailPage.css';

export default function DetailPage() {
    var { goodsIdStr } = useParams();
    var goodsId = parseInt(goodsIdStr || "1");

    const [goodsDetail, setGoodsDetail] = useState<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        descCount: number
    }>({
        name: "string",
        price: 0,
        id: 0,
        tags: [],
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
        ajax.getBusinessInfo(goodsId).then(setBusinessIntro);
    }, []);

    return (
        <div className='detail-page-root'>
            <BusinessIntro
                avatar={businessIntro?.avatar}
                name={businessIntro?.name}
                goodsRank={businessIntro?.goodsRank}
                businessRank={businessIntro?.businessRank}
            />
            <div className='detail-page-product'>
                <Covers imageArr={[ajax.getCoverImgSrc(goodsId)]} />
                <PurchaseBlock
                    goodsId={goodsId}
                    title={goodsDetail.name}
                    price={goodsDetail.price}
                    tags={goodsDetail.tags}
                    addr='l;alfdj;aiofjsi'
                    onBuy={(goodsId: number, cnt: number) => {
                        alert(goodsId + " " + cnt);
                    }}
                />
            </div>
            <GoodsIntro imageArr={new Array(goodsDetail.descCount).fill("").map((_, i) => ajax.getDescImgSrc(goodsId, i))} />
        </div>
    )
}
