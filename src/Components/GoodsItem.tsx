import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const GoodsItemStyled = styled.div`
    display: flex;
    height: 120px;
    align-items: center;
    align-self: center;
    justify-content: start;
    border-radius: 8px;
    background-color: #ffffff;
    border: 3px solid #ffbba2;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s;
    :hover {
        border: 3px solid red;
        > div {
            color: orange;
        }
    }
    > img {
        height: 100%;
    }
    > .text-block {
        flex: 0 1 auto;
        min-width: 0;
        margin: 10px;
        margin-right: 0;
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
};

function GoodsItem({iconSrc,title,price,onClick}: GoodsItemProps) {
    return (
        <GoodsItemStyled onClick={onClick}>
            <img src={iconSrc}></img>
            <div className='text-block'>
                <div>{title}</div>
                <div>{price}￥</div>
            </div>
        </GoodsItemStyled>
    )
}

export default GoodsItem;