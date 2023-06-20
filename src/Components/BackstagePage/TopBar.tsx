import React from 'react'
import styled from 'styled-components'

const DivStyled = styled.div`
    padding: 15px 20px;
    background-color: white;
    display: flex;
    justify-content: space-between;
`

export default function TopBar() {
    return (
        <DivStyled>
            <div>TopBar</div>
        </DivStyled>
    )
}
