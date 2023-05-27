import { MouseEventHandler } from 'react';
import "../../theme.css";
import "./GoodsItem.css";

interface GoodsItemProps {
    iconSrc: string,
    title: string,
    price: number,
    onClick: MouseEventHandler<HTMLDivElement>,
}

function GoodsItem({iconSrc,title,price,onClick}: GoodsItemProps) {
    return (
        <div className="goods-item-root" onClick={onClick}>
            <img className="goods-item-img" src={iconSrc} alt=""></img>
            <div className="goods-item-text-block">
                <div className="goods-item-title">{title}</div>
                <div className="goods-item-price">
                    ￥ <div className="goods-item-price-number">{price}</div>
                </div>
            </div>
        </div>
    )
}

export default GoodsItem;
