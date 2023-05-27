import React, { FormEvent, useRef } from 'react'
import styled from 'styled-components';

const LoginWindowRoot = styled.div`
    width: 250px;
    max-width: 90vw;
    background: var(--background-color);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;

    > form {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: stretch;
        width: 90%;

        > * {
        margin-top: 10px;
        }
        > div {
            border: 1.5px solid var(--primary-color);
            background-color: var(--background-color);
            height: 10px;
            padding: 10px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            > input {
                background-color: inherit;
                margin-left: 10px;
                width: 100%;
                border: none;
                outline: none;
            }
        }
        > button {
            line-height: 40px;
            text-align: center;
            font-size: 15px;
            background: var(--primary-color);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            overflow: hidden;
            user-select: none;
            border: none;
            transition: 0.2s;
            :hover {
                filter: brightness(0.9);
            }
        }
    }
`

interface LoginWindowProps {
    onSubmit: (ev: FormEvent<HTMLFormElement>,username?: string,pwd?: string) => void,
}

const LoginWindow: React.FC<LoginWindowProps> = ({onSubmit}) => {
    var usernameRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    var pwdRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    return <div>
        <LoginWindowRoot>
            <div style={{margin: "20px", fontSize: "20px"}}>Title</div>
            <form onSubmit={ev=>{
                var username = usernameRef.current?.value;
                var pwd = pwdRef.current?.value;
                onSubmit(ev,username,pwd);
            }}>
                <div>
                    <input
                        ref={usernameRef}
                        placeholder="username"
                        type='text'/>
                </div>
                <div>
                    <input
                        ref={pwdRef}
                        placeholder="password"
                        type='password'/>
                </div>
                <button>Log in</button>
            </form>
        </LoginWindowRoot>
    </div>
}

export default LoginWindow;
