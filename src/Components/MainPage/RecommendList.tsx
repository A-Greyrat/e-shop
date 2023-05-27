import GoodsItem from './GoodsItem';
import React from "react";
import "./RecommendList.css";

const RecommendList: React.FC = () => {
    return <div className="recommend-list-root">
        <div className="recommend-list-title-container">
            <div className="recommend-list-title">推荐</div>
        </div>
        <div className="recommend-list-container">
            <GoodsItem
                iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg'
                title='普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架' price={100} onClick={() => alert('hello world')}/>
            <GoodsItem
                iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg'
                title='hahahahahahahaah' price={100} onClick={() => alert('hello world')}/>
            <GoodsItem
                iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg'
                title='hahahahahahahaah' price={100} onClick={() => alert('hello world')}/>
            <GoodsItem
                iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg'
                title='hahahahahahahaah' price={100} onClick={() => alert('hello world')}/>
            <GoodsItem
                iconSrc='//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg'
                title='hahahahahahahaah' price={100} onClick={() => alert('hello world')}/>
        </div>
    </div>
};

export default RecommendList;
