import { useEffect, useState } from 'react'
import Table from './Table'
import user from '../../../ts/user';
import styled from 'styled-components';
import ajax from '../../../ts/ajax';

const DivStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

export default function BuyingHistory() {
    const [table, setTable] = useState<any>([]);

    useEffect(() => {
        ajax.getBuyingHistory(user.token).then(user.convertResultToTable).then(setTable);
    },[]);

    const renderReadOnly = (table: any[][]) => {
        var tc = table.map(x=>x.slice());
        for (let row=1;row<tc.length;row++) {
            tc[row] = tc[row].map(x=><span>{x}</span>);
        }
        return tc;
    }

    return (
        <DivStyled>
            <Table data={renderReadOnly(table)}/>
        </DivStyled>
    )
}
