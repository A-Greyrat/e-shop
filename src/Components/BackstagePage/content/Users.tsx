import { useEffect, useRef, useState } from 'react'
import Table from './Table'
import user from '../../../ts/user';
import styled from 'styled-components';
import ajax from '../../../ts/ajax';
import requestFile from '../../../ts/fileRequestor';

const UsersStyled = styled.div`
    display: flex;
    flex-direction: column;
    > :nth-child(2) {
        display: flex;
        justify-content: end;
        margin-right: 10px;
        > * {
            margin-right: 10px;
        }
    }
`

export default function Users() {
    const [userTable, setUserTable] = useState<any[][]>([]);
    const oldUserTable = useRef(userTable);
    const [saving, setSaving] = useState(false);
    const avatarIndexRef = useRef(-1);

    const permissionOptions = ["CUSTOMER","BUSINESS","ROOT"];

    useEffect(() => {
        user.getUserTable().then((x: any)=>{
            for (let n of x.data) {
                n.avatar = ajax.serverUrl + n.avatar;
            }
            x = user.convertResultToTable(x) as any;
            avatarIndexRef.current = x[0].indexOf("头像") || -1;
            oldUserTable.current = x;
            setUserTable(x);
        });
    },[]);

    const copyTable = (table: any[][]) => {
        if (!table.length) return table;
        return table?.map(x=>x.slice());
    }

    const renderSelection = (table: any[][]) => {
        if (!table.length) return table;
        const selectionIndex = table[0].indexOf("权限");
        if (!selectionIndex) return table;
        for (let row=1;row<table.length;row++) {
            table[row][selectionIndex] = <select onChange={ev=>{
                setUserTable(table=>{
                    var tc = table.map(x=>x.slice());
                    tc[row][selectionIndex] = ev.target.value;
                    return tc;
                });
            }} defaultValue={table[row][selectionIndex]}>{
                permissionOptions.map(x=><option key={x} value={x}>{x}</option>)
            }</select>;
        }
        return table;
    };

    const renderAvatar = (table: any[][]) => {
        if (!table.length) return table;
        if (avatarIndexRef.current==-1) return table;
        for (let row=1;row<table.length;row++) {
            table[row][avatarIndexRef.current] = <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                <img onClick={async ()=>{
                    var file = (await requestFile());
                    if (!file.type.startsWith("image")) return;
                    var fileAb = file.arrayBuffer;
                    setUserTable(table=>{
                        var tc = table.map(x=>x.slice());
                        var tmpUrl = URL.createObjectURL(new Blob([fileAb]))
                        tc[row][avatarIndexRef.current] = tmpUrl;
                        // setTimeout(() => {URL.revokeObjectURL(tmpUrl)},1000);
                        return tc;
                    });
                }} width="50px" height="50px" src={table[row][avatarIndexRef.current]}></img>
            </div>
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
            var newLine = Array(table?.[0].length).fill('');
            const selectionIndex = table[0].indexOf("权限");
            if (!selectionIndex) return table;
            newLine[selectionIndex] = "CUSTOMER";// todo
            tc.push(newLine);
            return tc;
        })
    };

    const cancelFn = () => {
        setUserTable(oldUserTable.current);
    };

    const saveFn = async () => {
        setSaving(true);
        var oldT = oldUserTable.current.slice(1);
        var newT = userTable.slice(1);
        var filterOld = oldT.filter(x=>!newT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
        var filterNew = newT.filter(x=>!oldT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
        filterOld = await changeImageUrlToBlobInTable(filterOld);
        filterNew = await changeImageUrlToBlobInTable(filterNew);
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

    const changeImageUrlToBlobInTable = async (table: any[][]) => {
        if (!table.length) return table;
        if (avatarIndexRef.current==-1) return table;
        var tc = table.map(x=>x.slice());
        for (let row=0;row<tc.length;row++) {
            tc[row][avatarIndexRef.current] = await fetch(tc[row][avatarIndexRef.current]).then(x=>x.blob());
        }
        return tc;
    }

    return (
        <UsersStyled>
            <Table
                arr={
                    renderDelWithoutCp(
                    renderAvatar(
                    renderSelection(
                        copyTable(userTable)
                    )))}
                setArr={setUserTable}/>
            <div>
                <button onClick={addFn}>添加</button>
                <button onClick={cancelFn}>取消</button>
                <button onClick={saveFn}>{saving?"保存中...":"保存"}</button>
            </div>
        </UsersStyled>
    )
}
