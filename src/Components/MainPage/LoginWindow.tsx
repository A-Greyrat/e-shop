import React, {FormEvent, useRef, useState} from 'react'
import styled from 'styled-components';

const LoginWindowRoot = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    > form {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: stretch;
        width: 90%;

        > * {
            margin-top: 15px;
        }

        > div {
            border: 0.1em solid var(--primary-color);
            background-color: var(--background-color);
            height: 10px;
            padding: 12px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            transition: 0.3s;
            
            :hover {
                border-color: var(--secondary-color);
            }

            > input {
                background-color: inherit;
                margin-left: 10px;
                width: 100%;
                border: none;
                outline: none;
            }
        }

        > button {
            line-height: 35px;
            text-align: center;
            font-size: 15px;
            background: var(--primary-color);
            color: white;
            border-radius: 15px;
            cursor: pointer;
            overflow: hidden;
            user-select: none;
            border: none;
            transition: 0.2s;

            :hover {
                background: var(--button-focus-color);
            }
        }
    }
`

interface LoginWindowProps {
    onSubmit: (ev: FormEvent<HTMLFormElement>, setLogging: React.Dispatch<React.SetStateAction<boolean>>, username?: string, pwd?: string) => void,
}

const LoginWindow: React.FC<LoginWindowProps> = ({onSubmit}) => {
    const usernameRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const pwdRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const [logging, setLogging] = useState(false);

    return <LoginWindowRoot>
        <div className="login-window-icon-container">
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                <path
                    d="M498.602667 191.744a204.714667 204.714667 0 0 1 116.906666 372.8c133.162667 47.317333 229.077333 173.290667 231.893334 322.026667l0.085333 6.784h-64c0-157.333333-127.573333-284.885333-284.885333-284.885334-155.136 0-281.301333 123.968-284.821334 278.250667l-0.085333 6.613333h-64c0-151.68 96.810667-280.746667 232-328.810666a204.714667 204.714667 0 0 1 116.906667-372.8z m0 64a140.714667 140.714667 0 1 0 0 281.450667 140.714667 140.714667 0 0 0 0-281.450667z"
                    fill="var(--primary-color)"></path>
            </svg>
        </div>
        <form onSubmit={ev => {
            const username = usernameRef.current?.value;
            const pwd = pwdRef.current?.value;
            onSubmit(ev, setLogging, username, pwd);
        }}>
            <div>
                <input
                    ref={usernameRef}
                    placeholder="账户"
                    type='text'/>
            </div>
            <div>
                <input
                    ref={pwdRef}
                    placeholder="密码"
                    type='password'/>
            </div>
            <button>{logging ? "Logging in..." : "Log in"}</button>
        </form>
    </LoginWindowRoot>
}

export default LoginWindow;
