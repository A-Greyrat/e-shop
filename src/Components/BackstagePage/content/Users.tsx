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
    const tableHeadMapperRef = useRef<Record<string,string>>({});
    const originHeadRef = useRef<string[]>([]);
    const oldUserTable = useRef(userTable);
    const [saving, setSaving] = useState(false);

    const permissionOptions = ["CUSTOMER","BUSINESS","ROOT"];

    useEffect(() => {
        user.getUserTable().then((x: any)=>{
            for (let n of x.data) {
                n.avatar = ajax.serverUrl + n.avatar;
            }
            tableHeadMapperRef.current = x.key;
            [originHeadRef.current,x] = user.convertResultToTable(x);
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
        var avatarIndex = originHeadRef.current.indexOf("avatar");
        if (!table.length || avatarIndex==-1) return table;
        for (let row=1;row<table.length;row++) {
            table[row][avatarIndex] = <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                <img onClick={async ()=>{
                    var file = (await requestFile());
                    if (!file.type.startsWith("image")) return;
                    var fileAb = file.arrayBuffer;
                    setUserTable(table=>{
                        var tc = table.map(x=>x.slice());
                        URL.revokeObjectURL(tc[row][avatarIndex]);
                        var tmpUrl = URL.createObjectURL(new Blob([fileAb]))
                        tc[row][avatarIndex] = tmpUrl;
                        return tc;
                    });
                }} width="50px" height="50px" src={table[row][avatarIndex]}></img>
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

    var saveFn = async () => {
        setSaving(true);
        var uidIndex = originHeadRef.current.indexOf("uid");
        if (uidIndex==-1) return;

        var oldT = oldUserTable.current.slice(1);
        var newT = userTable.slice(1);

        var filterOld = oldT.filter(x=>!newT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
        var filterNew = newT.filter(x=>!oldT.find(y=>JSON.stringify(y)==JSON.stringify(x)));

        var updateLines = filterNew.filter(x=>filterOld.find(y=>y[uidIndex]==x[uidIndex]));
        var oldLines = filterOld.filter(x=>!updateLines.find(y=>y[uidIndex]==x[uidIndex]));
        var newLines = filterNew.filter(x=>!updateLines.find(y=>y[uidIndex]==x[uidIndex]));

        console.log(oldLines,updateLines,newLines)
        var needDelete = oldLines.map(x=>x[uidIndex]);
        Promise.all([
            needDelete.length && user.deleteUserTableLines(needDelete),
            ...(await changeImageUrlToBlobInTable(updateLines)).map(x=>user.updateGoodsManageTableLine(convertLineToObject(x))),
            ...(await changeImageUrlToBlobInTable(newLines)).map(x=>user.addUserTableLine(convertLineToObject(x))),
        ]).then(ansArr=>{
            if (!ansArr.includes(false)) {
                alert("保存成功。");
                oldUserTable.current = userTable.map(x=>x.slice());
                history.go(0);
            } else {
                alert("保存失败，请检查列表项是否完整。");
            }
            setSaving(false);
        });
    }

    const changeImageUrlToBlobInTable = async (table: any[][]) => {
        var avatarIndex = originHeadRef.current.indexOf("avatar");
        if (avatarIndex==-1 || !table.length) return table;
        var tc = table.map(x=>x.slice());
        for (let row=0;row<tc.length;row++) {
            tc[row][avatarIndex] = await fetch(tc[row][avatarIndex]).then(x=>x.blob());
        }
        return tc;
    }

    const convertLineToObject = (line: any) => {
        var obj: Record<string,any> = {};
        for (let n of originHeadRef.current) {
            obj[n] = line.shift();
        }
        return obj;
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
                setArr={setUserTable}
                editableTypes={["string","string","string","string","string","readonly"]}/>
            <div>
                <button onClick={addFn}>添加</button>
                <button onClick={cancelFn}>取消</button>
                <button onClick={saveFn}>{saving?"保存中...":"保存"}</button>
            </div>
        </UsersStyled>
    )
}
