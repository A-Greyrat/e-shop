import {useEffect, useState} from 'react'
import LoginWindow from './LoginWindow';
import user from '../../ts/user';
import PersonalWindow from './PersonalWindow';

import './LoginBlock.css';
import ajax from '../../ts/ajax';

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
                        const {status} = await user.login(username, pwd).catch(()=>({status: "-1"}));
                        if (status == "403") {
                            alert("账号或密码错误");
                        } else if (status == "-1") {
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
