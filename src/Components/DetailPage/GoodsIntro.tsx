import React from 'react'
import styled from 'styled-components'

interface GoodsIntroProps {
    imageArr: string[],
}

var DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    > div {
        font-size: 20px;
        align-self: baseline;
        margin-bottom: 20px;
    }
    > img {
        width: 800px;
        max-width: 90%;
    }
`

export default function GoodsIntro({imageArr}: GoodsIntroProps) {
    return (
        <DivStyled>
            <div>商品详情</div>
            {
                imageArr.map((url,index) => <img key={index} src={url} alt={url}></img>)
            }
        </DivStyled>
    )
}
