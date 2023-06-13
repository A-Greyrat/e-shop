import React, { useEffect, useState } from 'react'
import mainController from '../../ts/mainController';

import './PersonalWindow.css';

export default function PersonalWindow() {
    const [userInfo, setUserInfo] = useState<{username: string, avatar: string}>();

    useEffect(() => {
        mainController.getUserInfo()
        .then(x => {
            if (x.statusCode==200) setUserInfo(x.info)
        });
    },[]);

    return (
        <div className='personal-window-root'>
            <img className='personal-window-avatar' src={userInfo?.avatar}></img>
            <p className='personal-window-greeting'>Hi, <span>{userInfo?.username}</span></p>
            <button onClick={() => {mainController.logout()}}>退出</button>
        </div>
    )
}
