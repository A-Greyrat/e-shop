import React, { useEffect, useState } from 'react'
import LoginWindow from './LoginWindow';
import mainController from '../../ts/mainController';
import PersonalWindow from './PersonalWindow';

import './LoginBlock.css';

export default function LoginBlock() {
    const [hasLogin, setHasLogin] = useState(false);

    useEffect(() => {
        var updateLoginState = (token: string) => setHasLogin(!!token);
        updateLoginState(mainController.token);
        return mainController.tokenSubscription.subscribe(updateLoginState);
    },[]);

    return <div className='login-block-root'>{
        hasLogin ? (
            <PersonalWindow/>
        ) : (
            <LoginWindow
                onSubmit={async (ev,user,pwd) => {
                    ev.preventDefault();
                    if (user && pwd) {
                        var temp = await mainController.login(user,pwd);
                        if (temp=="OK") {
                            alert("登录成功");
                        } else if (temp=="INVALID") {
                            alert("账号或密码错误");
                        } else if (temp=="NETWORK_ERROR") {
                            alert("网络错误");
                        }
                    }
                }
            }/>
        )
    }</div>
}
