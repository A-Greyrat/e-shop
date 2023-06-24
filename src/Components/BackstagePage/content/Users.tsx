import { useEffect, useRef, useState } from 'react'
import Table, { TableCellRenderArgs, TableColumnConfig } from './Table'
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
    const [userTable, setUserTable] = useState<{
        uid: number,
        account: string,
        name: string,
        permission: "CUSTOMER" | "BUSINESS" | "ROOT",
        avatar: string,
        password: string,
    }[]>([]);
    const [userTableConfig, setUserTableConfig] = useState<TableColumnConfig[]>([]);
    const oldUserTable = useRef(userTable);
    const [saving, setSaving] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        ajax.getUserTable(user.token).then((retObj: any)=>{
            for (let n of retObj.data) {
                n.avatar = ajax.SERVER_URL + n.avatar;
            }

            addExtraColumn(retObj.key,retObj.data);

            var tempConfig: TableColumnConfig[] = [];
            for (let key in retObj.key) {
                tempConfig.push(configGenerator(key,retObj.key[key]));
            }

            oldUserTable.current = retObj.data;
            setUserTableConfig(tempConfig);
            setUserTable(retObj.data);
        });
    },[refresh]);

    const configGenerator = (originKey: string,headName: string): TableColumnConfig => {
        if (originKey=="uid") {
            return {
                headName,
                keyInData: originKey,
                type: "readonly",
            };
        } else if (originKey=="account") {
            return {
                headName,
                keyInData: originKey,
                type: "string",
            }
        } else if (originKey=="name") {
            return {
                headName,
                keyInData: originKey,
                type: "string",
            }
        } else if (originKey=="permission") {
            return {
                headName,
                keyInData: originKey,
                render: renderSelection,
            }
        } else if (originKey=="avatar") {
            return {
                headName,
                keyInData: originKey,
                render: renderAvatar,
            }
        } else if (originKey=="password") {
            return {
                headName,
                keyInData: originKey,
                type: "string",
            }
        } else if (originKey=="__del") {
            return {
                headName,
                keyInData: originKey,
                render: renderDel,
            }
        }
        return {
            headName,
            keyInData: originKey,
        }
    }

    const addExtraColumn = (key: Record<string,string>,data: Record<string,any>[]) => {
        key["__del"] = "操作";
        data.forEach(obj => {
            obj["__del"] = "";
        });
    }

    const permissionOptions = ["CUSTOMER","BUSINESS","ROOT"];
    const renderSelection = ({cell,line,row,keyInData}: TableCellRenderArgs) => {
        return <select onChange={ev=>{
            setUserTable(table=>{
                var tc = table?.map(x=>({...x}));
                tc[row][keyInData] = ev.target.value;
                return tc;
            });
        }} defaultValue={cell} disabled={line["uid"]!=-1}>{
            permissionOptions.map(x=><option key={x} value={x}>{x}</option>)
        }</select>;
    };

    const renderAvatar = ({cell,row,keyInData}: TableCellRenderArgs) => {
        return <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <img onClick={async ()=>{
                var file = (await requestFile());
                if (!file.type.startsWith("image")) return;
                var fileAb = file.arrayBuffer;
                setUserTable(table=>{
                    var tc = table?.map(x=>({...x}));
                    URL.revokeObjectURL(tc[row][keyInData]);
                    var tmpUrl = URL.createObjectURL(new Blob([fileAb]))
                    tc[row][keyInData] = tmpUrl;
                    return tc;
                });
            }} width="50px" height="50px" src={cell+(cell.startsWith("http")?`&temp=${Math.random()}`:"")} style={{objectFit: "cover"}}></img>
        </div>
    };

    const renderDel = ({row}: TableCellRenderArgs) => {
        return <div style={{display: "flex",justifyContent: "center"}}>
            <button onClick={()=>{
                setUserTable(table=>{
                    var tc = table?.map(x=>({...x}));
                    tc.splice(row,1);
                    return tc;
                });
            }}>删除</button>
        </div>
    };

    const addFn = () => {
        setUserTable(table=>{
            var tc = table?.map(x=>({...x}));
            tc.push({
                uid: -1,
                account: "",
                name: "",
                permission: "CUSTOMER",
                avatar: "",
                password: ""
            });
            return tc;
        });
    };

    const cancelFn = () => {
        setUserTable(oldUserTable.current);
    };

    const isObjectEqual = (source: any, comparison: any) => {
        const _source = JSON.stringify(source);
        const _comparison = JSON.stringify({...source,...comparison});
        return _source == _comparison;
    }

    var saveFn = async () => {
        setSaving(true);

        var oldT = oldUserTable.current;
        var newT = userTable;

        var filterOld = oldT.filter(x=>!newT.find(y=>isObjectEqual(x,y)));
        var filterNew = newT.filter(x=>!oldT.find(y=>isObjectEqual(x,y)));

        var updateLines = filterNew.filter(x=>filterOld.find(y=>y["uid"]==x["uid"]));
        var oldLines = filterOld.filter(x=>!updateLines.find(y=>y["uid"]==x["uid"]));
        var newLines = filterNew.filter(x=>!updateLines.find(y=>y["uid"]==x["uid"]));

        console.log(oldLines,updateLines,newLines)
        var needDelete = oldLines.map(x=>x["uid"]);
        Promise.all([
            needDelete.length && ajax.deleteUserTableLines(user.token,needDelete).then(x=>x.status=="200"),
            ...updateLines.map(x=>ajax.updateUserTableLine(user.token,x).then(y=>y.status=="200")),
            ...newLines.map(x=>ajax.addUserTableLine(user.token,x).then(y=>y.status=="200")),
        ]).then(ansArr=>{
            if (!ansArr.includes(false)) {
                alert("保存成功。");
                oldUserTable.current = userTable.map(x=>({...x}));
                setRefresh(x=>!x);
            } else {
                if (ansArr.includes(true)) {
                    alert("部分保存失败，请检查列表项是否完整。");
                    setRefresh(x=>!x);
                } else {
                    alert("保存失败，请检查列表项是否完整。");
                }
            }
            setSaving(false);
        });
    }

    return (
        <UsersStyled>
            <Table
                data={userTable}
                setData={setUserTable}
                config={userTableConfig}/>
            <div>
                <button onClick={addFn}>添加</button>
                <button onClick={cancelFn}>取消</button>
                <button onClick={saveFn}>{saving?"保存中...":"保存"}</button>
            </div>
        </UsersStyled>
    )
}
