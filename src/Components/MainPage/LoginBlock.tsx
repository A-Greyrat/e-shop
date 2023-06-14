import {useEffect, useState} from 'react'
import LoginWindow from './LoginWindow';
import user from '../../ts/user';
import PersonalWindow from './PersonalWindow';

import './LoginBlock.css';

export default function LoginBlock() {
    const [hasLogin, setHasLogin] = useState(!!user.token);

    useEffect(() => {
        const updateLoginState = (token: string) => setHasLogin(!!token);
        return user.tokenSubscription.subscribe(updateLoginState);
    },[]);

    return <div className='login-block-root'>{
        hasLogin ? (
            <PersonalWindow/>
        ) : (
            <LoginWindow
                onSubmit={async (ev,setLogging,username,pwd) => {
                    ev.preventDefault();
                    if (username && pwd) {
                        setLogging(true);
                        const temp = await user.login(username, pwd);
                        if (temp == "OK") { /* empty */
                        } else if (temp == "INVALID") {
                            alert("账号或密码错误");
                        } else if (temp == "NETWORK_ERROR") {
                            alert("网络错误");
                        }
                        setLogging(false);
                    } else {
                        alert("请输入完整的登录信息！");
                    }
                }
            }/>
        )
    }</div>
}
