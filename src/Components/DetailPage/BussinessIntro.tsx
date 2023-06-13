import React from 'react'

import './BussinessIntro.css';

interface BussinessIntroProps {
    avatar: string,
    name: string,
    goodsRank: number,
    bussinessRank: number,
}

export default function BussinessIntro({avatar,name,goodsRank,bussinessRank}: BussinessIntroProps) {
    return (
        <div className='bussiness-intro-root'>
            <img src={avatar}></img>
            <span className='bussiness-intro-name'>{name}</span>
            <div className='bussiness-intro-divider'></div>
            <RankBlock title='商品评分' rank={goodsRank}/>
            <RankBlock title='商家评分' rank={bussinessRank}/>
        </div>
    )
}

function RankBlock({title, rank}: {title: string, rank: number}) {
    return <div className='bussiness-intro-rank'>
        <div>{title}</div>
        <div>{rank}</div>
    </div>
}
