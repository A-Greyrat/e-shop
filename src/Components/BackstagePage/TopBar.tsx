import styled from 'styled-components'
import user from '../../ts/user';
import { useNavigate } from 'react-router-dom';

const DivStyled = styled.div`
    padding: 10px 20px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        line-height: 30px;
        height: 30px;
    }
    > :nth-child(2) {
        > * {
            margin-left: 10px;
        };
    }
`

export default function TopBar({title}: {
    title: string;
}) {
    const nav = useNavigate();
    return (
        <DivStyled>
            <div>{title}</div>
            <div>
                <button onClick={()=>{nav("/")}}>back</button>
                <button onClick={()=>{user.logout();nav("/")}}>logout</button>
            </div>
        </DivStyled>
    )
}