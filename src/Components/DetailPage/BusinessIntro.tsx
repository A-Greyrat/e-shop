import React from 'react'

import './BusinessIntro.css';

interface BusinessIntroProps {
    avatar?: string,
    name?: string,
    goodsRank?: number,
    businessRank?: number,
}

export default function BusinessIntro({avatar,name,goodsRank,businessRank}: BusinessIntroProps) {
    return (
        <div className='business-intro-root'>
            <img src={avatar}></img>
            <span className='business-intro-name'>{name}</span>
            <div className='business-intro-divider'></div>
            <RankBlock title='商品评分' rank={goodsRank}/>
            <RankBlock title='商家评分' rank={businessRank}/>
        </div>
    )
}

function RankBlock({title, rank}: {title?: string, rank?: number}) {
    return <div className='business-intro-rank'>
        <div>{title}</div>
        <div>{rank}</div>
    </div>
}
