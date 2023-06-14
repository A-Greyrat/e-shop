import { useEffect, useState } from 'react'
import mainController from '../../ts/mainController';

import './PersonalWindow.css';

export default function PersonalWindow() {
    const [userInfo, setUserInfo] = useState<{username: string, avatar: string}>();

    useEffect(() => {
        mainController.getUserInfo().then(setUserInfo);
    },[]);

    return (
        <div className='personal-window-root'>
            <img className='personal-window-avatar' src={userInfo?.avatar}></img>
            <p className='personal-window-greeting'>Hi, <span>{userInfo?.username}</span></p>
            <div>
                <button>账号管理</button>
                <button onClick={() => {mainController.logout()}}>退出</button>
            </div>
        </div>
    )
}
