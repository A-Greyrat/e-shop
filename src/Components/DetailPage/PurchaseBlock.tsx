import React, { useState } from 'react'

import './PurchaseBlock.css';

interface PurchaseBlockProps {
    goodsId: number,
    title: string,
    price: number,
    intro: string,
    addr: string,
    onBuy: (goodsId: number, cnt: number) => void,
}

export default function PurchaseBlock({goodsId,title,price,intro,addr,onBuy}: PurchaseBlockProps) {
    const [goodsCnt, setGoodsCnt] = useState(1);

    return (
        <div className='purchase-root'>
            <div className='purchase-title'>{title}</div>
            <div className='purchase-price-line'>价格￥<span className='purchase-price'>{price}</span></div>
            <div className='purchase-intro'>
                <span className='purchase-label'>简介：</span>
                <span>{intro}</span>
            </div>
            <div className='purchase-addr'>
                <span className='purchase-label'>配送：</span>
                <span className='purchase-item-block'>{addr}</span>
            </div>
            <div className='purchase-cnt'>
                <span className='purchase-label'>数量：</span>
                <PurchaseCntChooser cnt={goodsCnt} setCnt={setGoodsCnt}/>
            </div>
            <button className='purchase-buying-btn' onClick={() => onBuy(goodsId,goodsCnt)}>购买</button>
        </div>
    )
}

interface PurchaseCntChooserProps {
    cnt: number,
    setCnt: React.Dispatch<React.SetStateAction<number>>,
}

function PurchaseCntChooser({cnt,setCnt}: PurchaseCntChooserProps) {
    return (
        <div style={{display: "flex", alignItems: "stretch"}}>
            <span className='purchase-item-block' onClick={() => setCnt(cnt=> cnt>1 ? cnt-1 : cnt)}>-</span>
            <input
                className='purchase-item-block'
                onChange={ev => {
                    var newNum = parseInt(ev.target.value);
                    if (!isNaN(newNum) && 0<newNum) {
                        setCnt(newNum);
                    } else {
                        setCnt(cnt);
                    }
                }}
                style={{width: "20px", border: "none", cursor: "text", textAlign: "center"}}
                value={cnt}/>
            <span className='purchase-item-block' onClick={() => setCnt(cnt=>cnt+1)}>+</span>
        </div>
    )
}
