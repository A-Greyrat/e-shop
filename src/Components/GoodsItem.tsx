import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import "../theme.css";
import "./GoodsItem.css";

const GoodsItemStyled = styled.div`
  display: flex;
  height: 120px;
  align-items: center;
  align-self: center;
  justify-content: start;
  border-radius: 8px;
  background-color: var(--background-color);
  border: 3px solid var(--background-color);
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    border: 3px solid var(--primary-color) !important;

    > div {
      color: var(--primary-color) !important;
    }
  }

  > .text-block {
    flex: 0 1 auto;
    min-width: 0;
    margin: 10px 0 10px 10px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    > div {
      width: 100%;
      word-wrap: break-word;
      transition: 0.2s;
    }
  }
`;

interface GoodsItemProps {
    iconSrc: string,
    title: string,
    price: number,
    onClick: MouseEventHandler<HTMLDivElement>,
}

function GoodsItem({iconSrc,title,price,onClick}: GoodsItemProps) {
    return (
        <GoodsItemStyled onClick={onClick}>
            <img className="goods-item-img" src={iconSrc} alt=""></img>
            <div className="goods-item-text-block">
                <div className="goods-item-title">{title}</div>
                <div className="goods-item-price">{price}￥</div>
            </div>
        </GoodsItemStyled>
    )
}

export default GoodsItem;
