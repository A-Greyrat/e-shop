import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper";

import "./SwiperBar.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperBarProps {
    imageArr: string[]
}

export default function SwiperBar({ imageArr }: SwiperBarProps) {
    return (
        <Swiper
            pagination
            navigation
            modules={[Pagination, Navigation]}
            loop
            autoplay>
            {
                imageArr.map(x =>
                    <SwiperSlide>
                        <img className="swiperbar-img" src={x} alt="" />
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}
