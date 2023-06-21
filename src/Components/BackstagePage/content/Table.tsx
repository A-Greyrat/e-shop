import styled from "styled-components";

const TableStyled = styled.table`
    margin: 20px;
    border-collapse: collapse;
    td {
        border: 1px solid #00000045;
        padding-left: 10px;
        padding-right: 10px;
        min-width: 80px;
        line-height: 40px;
        margin: 10px;
        transition: 0.2s;
        :hover {
            background-color: var(--background-color);
        }
    }
    td.td-textarea {
        position: relative;
        :hover {
            background-color: inherit;
            > .td-background-container {
                background-color: var(--background-color);
            }
        }
        > .td-background-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: 0.2s;
        }
        > .textarea-container {
            position: absolute;
            top: 0px;
            left: 0px;
            padding-left: inherit;
            padding-right: inherit;
            min-width: inherit;
            width: calc(100% - 15px);
            height: calc(100% - 15px);
        }
        textarea {
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            background: inherit;
            resize: none;
        }
    }
    
    > :nth-child(1) {
        background-color: var(--background-color);
    }
`

export default function Table({arr,setArr}: {
    arr?: any[][];
    setArr?: React.Dispatch<React.SetStateAction<any[][]>>;
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
            arr?.slice(1)?.map((elem,index)=><tr key={index}>{elem.map((x,index2)=>
                <td key={x+index2} className={typeof(x)==="string"?"td-textarea":""}>{
                    typeof(x)==="string"
                    ? <>
                        <div className="td-background-container"></div>
                        <div className="textarea-container">
                            <textarea defaultValue={x} onBlur={ev=>{setArr?.(table=>{
                                var tc = table.map(x=>x.slice());
                                tc[index+1][index2] = ev.target.value;
                                return tc;
                            })}}></textarea>
                        </div>
                    </>
                    : x
                }</td>
            )}</tr>)
        }
        </tbody>
    </TableStyled>
}
