import React, { useState } from 'react'

import './PurchaseBlock.css';

interface PurchaseBlockProps {
    goodsId: number,
    title: string,
    price: number,
    tags: string[],
    goodsCnt: number,
    addr: string,
    onBuy: (setBuying: React.Dispatch<React.SetStateAction<boolean>>, goodsId: number, cnt: number) => void,
}

export default function PurchaseBlock({goodsId,title,price,tags,goodsCnt,addr,onBuy}: PurchaseBlockProps) {
    const [needCnt, setNeedCnt] = useState(0);
    const [buying, setBuying] = useState(false);

    return (
        <div className='purchase-root'>
            <div className='purchase-title'>{title}</div>
            <div className='purchase-price-line'>价格：￥<span className='purchase-price'>{price}</span></div>
            <div className='purchase-intro'>
                <span className='purchase-label'>分类：</span>
                {
                    tags.map(tag=><span className='purchase-item-block' key={tag}>{tag}</span>)
                }
            </div>
            <div className='purchase-addr'>
                <span className='purchase-label'>配送：</span>
                <span className='purchase-item-block'>{addr}</span>
            </div>
            <div className='purchase-addr'>
                <span className='purchase-label'>库存：</span>
                <span className='purchase-item-block'>{goodsCnt}</span>
            </div>
            <div className='purchase-cnt'>
                <span className='purchase-label'>数量：</span>
                <PurchaseCntChooser maxCnt={goodsCnt} cnt={needCnt} setCnt={setNeedCnt}/>
            </div>
            <button className='purchase-buying-btn' onClick={() => onBuy(setBuying,goodsId,needCnt)}>{buying ? "购买中..." : "购买"}</button>
        </div>
    )
}

interface PurchaseCntChooserProps {
    maxCnt: number,
    cnt: number,
    setCnt: React.Dispatch<React.SetStateAction<number>>,
}

function PurchaseCntChooser({maxCnt,cnt,setCnt}: PurchaseCntChooserProps) {
    return (
        <div className='purchase-counter' style={{display: "flex", alignItems: "stretch"}}>
            <span onClick={() => setCnt(cnt=> cnt>1 ? cnt-1 : cnt)}>-</span>
            <input
                id='purchase-counter-input'
                onChange={ev => {
                    var newNum = parseInt(ev.target.value);
                    if (!isNaN(newNum) && 0<newNum && newNum<=maxCnt) {
                        setCnt(newNum);
                    } else {
                        setCnt(cnt);
                    }
                }}
                style={{width: "20px", border: "none", cursor: "text", textAlign: "center"}}
                value={cnt}/>
            <span onClick={() => setCnt(cnt=>cnt<maxCnt ? cnt+1 : cnt)}>+</span>
        </div>
    )
}
