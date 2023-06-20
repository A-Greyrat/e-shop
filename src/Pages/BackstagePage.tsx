import React from 'react'
import SideBar from '../Components/BackstagePage/SideBar'
import styled from 'styled-components'

const DivStyled = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    > :nth-child(1) {
        max-width: 30vw;
        width: 300px;
        background-color: var(--background-color);
        display: flex;
        flex-direction: column;
        > :nth-child(1) {
            margin-top: 5px;
            padding: 20px;
            font-size: 18px;
        }
    }
`

export default function BackstagePage() {
    return (
        <DivStyled>
            <div>
                <div>购物系统后台</div>
                <SideBar objArr={[
                    {type: 'item', text: 'aaa', url: '/', children: []},
                    {type: 'item', text: 'bbb', url: '/', children: []},
                    {type: 'folder', text: 'ccc', url: '/', children: [
                        {type: 'item', text: 'ddd', url: '/', children: []},
                        {type: 'item', text: 'eee', url: '/', children: []},
                    ]},
                ]}/>
            </div>
        </DivStyled>
    )
}
