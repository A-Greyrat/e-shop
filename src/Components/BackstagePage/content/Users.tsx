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
    const userTableColumnTypes: ("string" | "number" | "readonly" | "")[] = ["string","string"];
    const [saving, setSaving] = useState(false);

    const permissionOptions = ["customer","business","manager"];

    useEffect(() => {
        user.getUserTable().then(x=>{
            oldUserTable.current = x;
            setUserTable(x);
        });
    },[]);

    const copyTable = (table: any[][]) => {
        if (!table.length) return table;
        return table.map(x=>x.slice());
    }

    const renderSelection = (table: any[][]) => {
        if (!table.length) return table;
        const selectionIndex = table[0].indexOf("permission");
        if (!selectionIndex) return table;
        for (let row=1;row<table.length;row++) {
            table[row][selectionIndex] = <select onChange={ev=>{
                setUserTable(table=>{
                    var tc = table.map(x=>x.slice());
                    tc[row][selectionIndex] = ev.target.value;
                    return tc;
                });
            }}>{
                permissionOptions.map(x=><option key={x}>{x}</option>)
            }</select>;
        }
        return table;
    };

    const renderDelWithoutCp = (table: any[][]) => {
        if (!table.length) return table;
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
        setSaving(true);
        var oldT = oldUserTable.current.slice(1);
        var newT = userTable.slice(1);
        var filterOld = oldT.filter(x=>!newT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
        var filterNew = newT.filter(x=>!oldT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
        Promise.all([
            filterOld.length && user.deleteUserTableLines(filterOld),
            filterNew.length && user.addUserTableLines(filterNew)
        ]).then(ansArr=>{
            if (!ansArr.includes(false)) {
                alert("保存成功。");
                oldUserTable.current = userTable.map(x=>x.slice());
            } else {
                alert("保存失败。");
            }
            setSaving(false);
        });
    };

    return (
        <UsersStyled>
            <div>用户管理</div>
            <Table arr={renderDelWithoutCp(renderSelection(copyTable(userTable)))} setArr={setUserTable} editableTypes={userTableColumnTypes}/>
            <div>
                <button onClick={addFn}>添加</button>
                <button onClick={cancelFn}>取消</button>
                <button onClick={saveFn}>{saving?"保存中...":"保存"}</button>
            </div>
        </UsersStyled>
    )
}
