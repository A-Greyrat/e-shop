import React from 'react'
import styled from 'styled-components';

const LoginWindowRoot = styled.div`
  width: 300px;
  max-width: 90vw;
  background: white;
  border-radius: 5px;
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
      margin-top: 10px;
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
                <div style={{margin: "30px", fontSize: "20px"}}>Title</div>
                <form onSubmit={onSubmit}>
                    <input
                        name="username"
                        placeholder="username"/>
                    <input
                        name="password"
                        placeholder="password"/>
                    <button>
                        Log in
                    </button>
                    <p>Or <a onClick={ev => {
                        ev.preventDefault();
                    }}>register now!</a></p>
                </form>
            </LoginWindowRoot>
        </div>
    }</>
}

export default LoginWindow;
