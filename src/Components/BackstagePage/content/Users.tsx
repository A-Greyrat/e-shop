import { useEffect, useRef, useState } from 'react'
import Table from './Table'
import user from '../../../ts/user';
import styled from 'styled-components';

const UsersStyled = styled.div`
    display: flex;
    flex-direction: column;
    > :nth-child(3) {
        display: flex;
        justify-content: end;
        margin-right: 10px;
        > * {
            margin-right: 10px;
        }
    }
`

export default function Users() {
    const [userTable, setUserTable] = useState<string[][]>([]);
    const oldUserTable = useRef(userTable);
    const userTableColumnTypes: ("string" | "number" | "readonly" | "")[] = ["string","string","readonly"];

    useEffect(() => {
        user.getUserTable().then(x=>{
            oldUserTable.current = x;
            setUserTable(x);
        });
    },[]);

    const renderDelWithoutCp = (table: any[][]) => {
        if (!table.length) return table;
        table = table.map(x=>x.slice());
        table[0].push("操作");
        for (let i=1;i<table.length;i++) {
            table[i].push(
                <div style={{display: "flex",justifyContent: "center"}}>
                    <button onClick={()=>setUserTable(table=>{
                        var tc = table.slice();
                        tc.splice(i,1);
                        return tc;
                    })}>删除</button>
                </div>
            )
        }
        return table;
    };

    const addFn = () => {
        setUserTable(table=>{
            var tc = table.slice();
            tc.push(Array(table?.[0].length).fill(''));
            return tc;
        })
    };

    const cancelFn = () => {
        setUserTable(oldUserTable.current);
    };

    const saveFn = () => {
        oldUserTable.current = userTable.map(x=>x.slice());
        user.setUserTable(userTable);
    };

    return (
        <UsersStyled>
            <div>用户管理</div>
            <Table arr={renderDelWithoutCp(userTable)} setArr={setUserTable} editableTypes={userTableColumnTypes}/>
            <div>
                <button onClick={addFn}>添加</button>
                <button onClick={cancelFn}>取消</button>
                <button onClick={saveFn}>保存</button>
            </div>
        </UsersStyled>
    )
}
