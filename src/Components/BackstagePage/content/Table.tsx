import styled from "styled-components";

const TableStyled = styled.table`
    margin: 20px;
    border-collapse: collapse;
    td {
        min-height: 40px;
        border: 1px solid #00000045;
        padding-left: 10px;
        padding-right: 10px;
        min-width: 80px;
        line-height: 40px;
        margin: 10px;
        transition: 0.2s;
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

export interface TableCellRenderArgs {
    cell: any;
    line: Record<string,any>;
    row: number;
    keyInData: string;
}

export interface TableColumnConfig {
    headName: string;
    keyInData: string;
    type?: ("string" | "number" | "readonly"); // 有type时会渲染为textarea
    render?: (obj: TableCellRenderArgs) => any;
}

export default function Table({ data, setData, config, style = {} }: {
    data: Record<string, any>[];
    setData?: React.Dispatch<React.SetStateAction<any[]>>
    config: TableColumnConfig[];
    style?: React.CSSProperties;
}) {
    const handleEdit = (ev: any, line: Record<string, any>, row: number, aConfig: TableColumnConfig) => {
        if (aConfig.type == "string") {
            setData?.(data => {
                var datacopy = data.map(x => ({...x}));
                datacopy[row][aConfig.keyInData] = ev.target.value;
                return datacopy;
            });
        } else if (aConfig.type == "number") {
            if (isNaN(parseFloat(ev.target.value))) return ev.target.value = line[aConfig.keyInData];
            ev.target.value = parseFloat(ev.target.value);
            setData?.(data => {
                var datacopy = data.map(x => ({...x}));
                datacopy[row][aConfig.keyInData] = ev.target.value;
                return datacopy;
            });
        } else return;
    };

    const columnMapper = (line: Record<string, any>,row: number) => {
        return config.map((aConfig,column)=>{
            return <td
                key={aConfig.headName + column}
                className={!aConfig.type ? "" : "td-textarea"}
            >{
                !aConfig.type
                ? (aConfig.render ? aConfig.render({
                    cell:line[aConfig.keyInData],
                    line,
                    row,
                    keyInData: aConfig.keyInData
                }) : line[aConfig.keyInData])
                : <>
                    <div className="td-background-container"></div>
                    <div className="textarea-container">
                        <textarea
                            defaultValue={line[aConfig.keyInData]}
                            readOnly={aConfig.type=="readonly"}
                            onBlur={ev => handleEdit(ev, line, row, aConfig)}
                        ></textarea>
                    </div>
                </>
            }</td>
        })
    }

    return <TableStyled style={{ ...style }}>
        <thead>
            <tr>
                {
                    config.map((aConfig, index) => <td key={aConfig.headName + index}>{aConfig.headName}</td>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data?.map((line, row) => 
                    <tr key={row}>{
                        columnMapper(line,row)
                    }</tr>
                )
            }
        </tbody>
    </TableStyled>
}