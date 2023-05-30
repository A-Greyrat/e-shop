import {Swiper, SwiperSlide} from "swiper/react"
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pagination, Navigation} from "swiper";

import "./SwiperBar.css";
// import 'swiper/swiper-bundle.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperBarProps {
    imageArr: {imgUrl: string, clickUrl: string}[]
}

export default function SwiperBar({imageArr}: SwiperBarProps) {
    const nav = useNavigate();
    return (
        <div className="swiper-bar-root">

            <Swiper
                pagination
                navigation
                modules={[Pagination, Navigation]}
                loop
                autoplay>
                {
                    imageArr.map((obj,index) =>
                        <SwiperSlide key={index}>
                            <img className="swiper-bar-img" src={obj.imgUrl} alt={obj.clickUrl} onClick={()=>nav(obj.clickUrl)}/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}
