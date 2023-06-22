import React, { useEffect, useState } from 'react'
import Table from './Table'
import user from '../../../ts/user';
import styled from 'styled-components';

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    td {
        height: 65px;
    }
`

export default function BuyingHistory() {
    const [table, setTable] = useState<any[][]>([]);

    useEffect(() => {
        user.getBuyingHistory().then(setTable);
    },[]);

    return (
        <DivStyled>
            <Table arr={table} editableTypes={table.length?Array(table?.[0]?.length).fill("readonly"):[]}/>
        </DivStyled>
    )
}
