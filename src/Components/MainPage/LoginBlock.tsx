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
                onSubmit={async (ev,setLogging,user,pwd) => {
                    ev.preventDefault();
                    if (user && pwd) {
                        setLogging(true);
                        var temp = await mainController.login(user,pwd);
                        if (temp=="OK") {
                        } else if (temp=="INVALID") {
                            alert("账号或密码错误");
                        } else if (temp=="NETWORK_ERROR") {
                            alert("网络错误");
                        }
                    } else {
                        alert("请输入完整的登录信息！");
                    }
                }
            }/>
        )
    }</div>
}
