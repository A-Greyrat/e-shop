import styled from 'styled-components';
import GoodsItem from './GoodsItem';
import React from "react";

const RecommendRoot = styled.div`
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-gap: 30px;
`

const Recommend: React.FC = () => {
    return <RecommendRoot>
        <GoodsItem iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg' title='hahahahahahahaah' price={100} onClick={()=>alert('hello world')}/>
        <GoodsItem iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg' title='hahahahahahahaah' price={100} onClick={()=>alert('hello world')}/>
        <GoodsItem iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg' title='hahahahahahahaah' price={100} onClick={()=>alert('hello world')}/>
        <GoodsItem iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg' title='hahahahahahahaah' price={100} onClick={()=>alert('hello world')}/>
        <GoodsItem iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg' title='hahahahahahahaah' price={100} onClick={()=>alert('hello world')}/>
    </RecommendRoot>
};

export default Recommend;
