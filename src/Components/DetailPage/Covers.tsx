import {Swiper, SwiperSlide} from "swiper/react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Pagination, Navigation} from "swiper";

// import 'swiper/swiper-bundle.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";

var CoversStyled = styled.div`
    width: 400px;
    max-width: 100%;
    height: 400px;
    user-select: none;
    min-width: 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    > div {
        width: inherit;
        max-width: inherit;
        height: inherit;
        border-radius: 10px;
    }

    img {
        width: inherit;
        height: inherit;
        object-fit: cover;
        object-position: center;
        min-width: 100%;
    }
`

interface CoversProps {
    imageArr: string[]
}

export default function Covers({imageArr}: CoversProps) {
    return (
        <CoversStyled>
            <Swiper
                pagination
                navigation
                modules={[Pagination, Navigation]}
                loop>
                {
                    imageArr.map((url,index) =>
                        <SwiperSlide key={index}>
                            <img src={url} alt={url}/>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </CoversStyled>
    )
}
