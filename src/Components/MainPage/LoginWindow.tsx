import React from 'react'
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
    onSubmit?: () => void,
}

const LoginWindow: React.FC<LoginWindowProps> = ({onSubmit}) => {
    return <>{
        <div>
            <LoginWindowRoot>
                <div style={{margin: "20px", fontSize: "20px"}}>Title</div>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name="username"
                            placeholder="username"
                            type='text'/>
                    </div>
                    <div>
                        <input
                            name="password"
                            placeholder="password"
                            type='password'/>
                    </div>
                    <button onClick={ev=>{ev.preventDefault()}}>
                        Log in
                    </button>
                </form>
            </LoginWindowRoot>
        </div>
    }</>
}

export default LoginWindow;
