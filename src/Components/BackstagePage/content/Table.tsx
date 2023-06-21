import styled from "styled-components";

const TableStyled = styled.table`
    margin: 20px;
    border-collapse: collapse;
    td {
        border: 1px solid #00000045;
        padding-left: 10px;
        padding-right: 10px;
        min-width: 100px;
        line-height: 40px;
        :hover {
            background-color: var(--background-color);
        }
    }
    > :nth-child(1) {
        background-color: var(--background-color);
    }
`

export default function Table({arr}: {
    arr?: any[][];
}) {
    return <TableStyled>
        <thead>
        <tr>
            {
                arr?.[0]?.map((x,index)=><td key={x+index}>{x}</td>)
            }
        </tr>
        </thead>
        <tbody>
        {
            arr?.slice(1)?.map((elem,index)=><tr key={index}>{elem.map((x,index2)=><td key={x+index2}>{x}</td>)}</tr>)
        }
        </tbody>
    </TableStyled>
}
