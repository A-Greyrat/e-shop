import React from 'react'
import { useParams } from 'react-router-dom'
import Covers from '../Components/DetailPage/Covers';
import PurchaseBlock from '../Components/DetailPage/PurchaseBlock';
import BussinessIntro from '../Components/DetailPage/BussinessIntro';
import GoodsIntro from '../Components/DetailPage/GoodsIntro';

import './DetailPage.css';

interface PurchaseBlockProps {
    title: string,
    price: number,
    covers: string[],
    desc: string,
    descPics: string[],
    
}

export default function DetailPage() {
    var { goodsIdStr } = useParams();
    var goodsId = parseInt(goodsIdStr || "1");

    return (
        <div className='detail-page-root'>
            <BussinessIntro
                avatar="//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg"
                name="商家A"
                goodsRank={4.9}
                bussinessRank={5.0}
            />
            <div className='detail-page-product'>
                <Covers imageArr={["//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg","//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg"]}/>
                <PurchaseBlock
                    goodsId={goodsId}
                    title='haha'
                    price={100}
                    intro='减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二减价二'
                    addr='l;alfdj;aiofjsi'
                    onBuy={(goodsId: number, cnt: number) => {
                        alert(goodsId+" "+cnt);
                    }}
                />
            </div>
            <GoodsIntro imageArr={["//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg","//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg"]}/>
        </div>
    )
}
