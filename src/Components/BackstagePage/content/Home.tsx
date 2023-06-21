import React, { useEffect, useRef, useState } from 'react'
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

    > * {
        margin-left: 2vw;
        margin-right: 2vw;
    }

    > :nth-child(1) {
        margin-top: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
            width: 100px;
            border-radius: 10px;
            flex: 0 1 auto;
        }
    }
    > :nth-child(2) {
        margin-top: 50px;
    }
`

export default function Home() {
    const [hitokoto, setHitokoto] = useState("");
    const [permission, setPermission] = useState("");

    useEffect(() => {
        fetch("https://v1.hitokoto.cn?encode=text").then(x=>x.text()).then(setHitokoto);
        user.getPermission().then(x=>{
            setPermission(x||"");
        });
    },[])

    return (
        <DivStyled>
            <div>
                <div>
                    <div className='back-home-title'>Hello, {user.info.username}</div>
                    <div className='back-home-subtitle'>{hitokoto}</div>
                </div>
                <img src={user.info.avatar}></img>
            </div>
            <SettingList permission={permission}/>
        </DivStyled>
    )
}

function SettingList({permission}: {
    permission: string;
}) {
    return <div>{(permission == "customer")
        ? <>
            <SettingLine hint='头像：' inputType="file" onSubmit={v => alert(v)} btnText='保存' />
            <SettingLine hint='名称：' onSubmit={v => alert(v)} btnText='保存' />
            <SettingLine hint='地址：' onSubmit={v => alert(v)} btnText='保存' />
        </>
        : (permission == "business")
        ? <>
            <SettingLine hint='头像：' inputType="file" onSubmit={v => alert(v)} btnText='保存' />
            <SettingLine hint='名称：' onSubmit={v => alert(v)} btnText='保存' />
        </>
        : (permission == "manager")
        ? <>
            <SettingLine hint='头像：' inputType="file" onSubmit={v => alert(v)} btnText='保存' />
            <SettingLine hint='名称：' onSubmit={v => alert(v)} btnText='保存' />
        </>
        : <></>}
    </div>;
}

const SettingLineStyled = styled.div`
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        span {
            color: var(--label-color);
        }
        input {
            border-radius: 5px;
            border: 2px solid var(--light-primary-color);
            font-family: inherit;
            outline: 0px solid transparent;
            user-select: none;
            transition: 0.2s;
            height: 26px;
            width: 280px;
            min-width: 0;
            :focus {
                outline: 3px solid var(--primary-color);
            }
        }
        input[type="file"] {
            width: 288px;
            border: none;
        }
        > * {
            margin-right: 10px;
        }
    `

function SettingLine({hint,inputType='text',defaultValue,btnText,onSubmit}: {
    hint: string;
    inputType?: string;
    defaultValue?: string;
    btnText: string;
    onSubmit: (value: string)=>void;
}) {
    const ref = useRef();
    return <SettingLineStyled>
        <span>{hint}</span>
        <input ref={ref as any} type={inputType} defaultValue={defaultValue}></input>
        <button onClick={()=>onSubmit((ref.current as any)?.value)}>{btnText}</button>
    </SettingLineStyled>
}