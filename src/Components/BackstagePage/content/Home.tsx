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
            margin-left: 10px;
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
        fetch("https://v1.hitokoto.cn?encode=text").then(x => x.text()).then(setHitokoto);
        user.getInfo();
        user.getPermission().then(x => {
            setPermission(x || "");
        });
    }, [])

    return (
        <DivStyled>
            <div>
                <div>
                    <div className='back-home-title'>Hello, {user.info.username}</div>
                    <div className='back-home-subtitle'>{hitokoto}</div>
                </div>
                <img src={user.info.avatar}></img>
            </div>
            <SettingList permission={permission} />
        </DivStyled>
    )
}

function SettingList({ permission }: {
    permission: string;
}) {
    const saveFn = async (key: string, value: any, setSaving: React.Dispatch<React.SetStateAction<boolean>>) => {
        setSaving(true);
        await user.saveConfig({ [key]: value });
        alert("保存成功。");
        setSaving(false);
    };

    return <div>{(permission == "CUSTOMER")
        ? <>
            <SettingLine hint='头像：' sKey="avatar" inputType="file" onSubmit={saveFn} />
            <SettingLine hint='名称：' defaultValue={user.info.username} sKey="name" onSubmit={saveFn} />
            <SettingLine hint='密码：' sKey="pwd" onSubmit={saveFn} />
            <SettingLine hint='地址：' defaultValue={user.info.addr} sKey="addr" onSubmit={saveFn} />
        </>
        : (permission == "BUSINESS")
            ? <>
                <SettingLine hint='头像：' sKey="avatar" inputType="file" onSubmit={saveFn} />
                <SettingLine hint='名称：' defaultValue={user.info.username} sKey="name" onSubmit={saveFn} />
                <SettingLine hint='密码：' sKey="pwd" onSubmit={saveFn} />
            </>
            : (permission == "ROOT")
                ? <>
                    <SettingLine hint='头像：' sKey="avatar" inputType="file" onSubmit={saveFn} />
                    <SettingLine hint='名称：' defaultValue={user.info.username} sKey="name" onSubmit={saveFn} />
                    <SettingLine hint='密码：' sKey="pwd" onSubmit={saveFn} />
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
        padding-left: 5px;
        padding-right: 5px;
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
        width: 284px;
        border: none;
    }
    > * {
        margin-right: 10px;
    }
`

function SettingLine({ hint, inputType = 'text', sKey, defaultValue, onSubmit }: {
    hint: string;
    inputType?: string;
    sKey: string;
    defaultValue?: string;
    onSubmit: (key: string, value: string, setSaving: React.Dispatch<React.SetStateAction<boolean>>) => void;
}) {
    const ref = useRef();
    const [saving, setSaving] = useState(false);

    return <SettingLineStyled>
        <span>{hint}</span>
        <input ref={ref as any} type={inputType} defaultValue={defaultValue}></input>
        <button onClick={() => onSubmit(sKey, (ref.current as any)?.value, setSaving)}>{saving ? "保存中..." : "保存"}</button>
    </SettingLineStyled>
}