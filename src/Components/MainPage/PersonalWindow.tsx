import { useEffect, useState } from 'react'
import user from '../../ts/user';

import './PersonalWindow.css';
import { useNavigate } from 'react-router-dom';

export default function PersonalWindow() {
    const [userInfo, setUserInfo] = useState<{username: string, avatar: string}>();
    const nav = useNavigate();

    useEffect(() => {
        user.getInfo().then(setUserInfo);
    },[]);

    return (
        <div className='personal-window-root'>
            <div className='personal-window-avatar-container'>
                <img className='personal-window-avatar' src={userInfo?.avatar}></img>
            </div>
            <p className='personal-window-greeting'>Hi, <span>{userInfo?.username}</span></p>
            <div>
                <button onClick={() => {nav("/backstage")}}>账号管理</button>
                <button onClick={() => {user.logout()}}>退出</button>
            </div>
        </div>
    )
}
