import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import user from '../../../ts/user'

const DivStyled = styled.div`
    .back-home-title {
        margin-bottom: 20px;
        font-size: 26px;
    }
    .back-home-subtitle {
        color: var(--label-color);
    }
`

export default function Home() {
    const [hitokoto, setHitokoto] = useState("");

    useEffect(() => {
        fetch("https://v1.hitokoto.cn?encode=text").then(x=>x.text()).then(setHitokoto);
    },[])

    return (
        <DivStyled>
            <div className='back-home-title'>Hello, {user.info.username}</div>
            <div className='back-home-subtitle'>{hitokoto}</div>
        </DivStyled>
    )
}
