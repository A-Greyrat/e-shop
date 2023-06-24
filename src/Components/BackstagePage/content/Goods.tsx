import {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {ColorfulBlock} from './ColorfulBlock'
import ajax from '../../../ts/ajax'
import GoodsImageContainer from './GoodsImageContainer'
import GoodsManagerTable from "./GoodsManagerTable/GoodsManagerTable.tsx";

const GoodsManage = styled.div`
    display: flex;
    flex-direction: column;
    > :nth-child(3) {
        align-self: end;
        margin-right: 10px;
        > * {
            margin-right: 10px;
        }
    }
`

export default function Goods() {
    const [goodsTable, setGoodsTable] = useState<any[][]>([]);
    const oldGoodsTable = useRef(goodsTable);
    const originHeadRef = useRef<string[]>([]);
    const [incomes, setIncomes] = useState<number[]>([]);
    const [tagIndex, setTagIndex] = useState(-1);
    const goodsTableColumnTypes: ("string" | "number" | "readonly" | "")[] = ["string","number","number"];
    const [saving, setSaving] = useState(false);
    const [picAdderShown, setPicAdderShown] = useState(false);
    const [currEditGid, setCurrEditGid] = useState(-1);
    const [imagesRecord, setImagesRecord] = useState<Record<string,{cover: string[],descImg: string[]}>>({});

    useEffect(() => {
        // ajax.getIncomes(user.token).then(setIncomes);
        // ajax.getGoodsManageTable(user.token).then(x=>{
        //     [originHeadRef.current,x] = convertResultToTable(x);
        //     var tagIndex = originHeadRef.current.indexOf("tags") || -1;
        //     setTagIndex(tagIndex);
        //     var goodsTable = handleTags(x,tagIndex);
        //     oldGoodsTable.current = goodsTable;
        //     setGoodsTable(goodsTable);
        // });
    },[]);

    const copyTable = (table: any[][]) => {
        if (!table.length) return table;
        return table?.map(x=>x.slice());
    };

    const handleTags = (table: any[][],tagIndex: number) => {
        if (tagIndex==-1 || !table.length) return table;
        var tc = table.map(x=>x.slice());
        tc.shift();
        for (var line of tc) {
            line[tagIndex] = line[tagIndex].split(";").filter((x: any)=>x);
        }
        return [table[0],...tc];
    };

    const renderTags = (table: any[][],tagIndex: number) => {
        if (tagIndex==-1 || !table.length) return table;
        var tc = table.map(x=>x.slice());
        for (let row=1;row<tc.length;row++) {
            tc[row][tagIndex] = <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                alignContent: 'center',
            }}>
            {
                tc[row][tagIndex].map((text: string,i: number)=>
                    <Tag
                        key={text}
                        text={text}
                        onClick={()=>{
                            setGoodsTable(table=>{
                                var tc = table.map(x=>x.slice());
                                tc[row][tagIndex].splice(i,1);
                                return tc;
                            });
                        }}
                    />
                ).concat([
                    <IncreaseTag
                        key="IncreaseTag"
                        onClick={()=>{addTag(row,tagIndex)}}
                    />
                ])
            }
            </div>;
        }
        return tc;
    };

    const renderImageContainer = (table: any[][]) => {
        var gidIndex = originHeadRef.current.indexOf("gid");
        if (gidIndex==-1 || !table.length) return table;
        for (let row=1;row<table.length;row++) {
            let gid = table[row][gidIndex];
            table[row][gidIndex] = <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                <img
                    onClick={()=>{
                        setCurrEditGid(gid);
                        setPicAdderShown(true);
                    }}
                    width="50px"
                    height="50px"
                    src={ajax.getCoverImgSrc(gid)}/>
            </div>
        }
        return table;
    }

    const renderDelWithoutCp = (table: any[][]) => {
        if (tagIndex==-1 || !table.length) return table;
        table[0].push("操作");
        for (let i=1;i<table.length;i++) {
            table[i].push(
                <div style={{display: "flex",justifyContent: "center"}}>
                    <button onClick={()=>setGoodsTable(table=>{
                        var tc = table.slice();
                        tc.splice(i,1);
                        return tc;
                    })}>删除</button>
                </div>
            )
        }
        return table;
    };

    const addTag = (row: number,tagIndex: number) => {
        var txt = prompt("请输入标签名称：") || "";
        if (!txt) return;
        if (txt.length>10) return alert("标签不能超过10个字符");
        setGoodsTable(table=>{
            var tc = table.map(x=>x.map(x=>x instanceof Array?x.slice():x));
            tc[row][tagIndex].push(txt);
            return tc;
        });
    };

    const addFn = () => {
        setGoodsTable(table=>{
            var tc = table.slice();
            tc.push(Array(table?.[0].length).fill('').map((x,i)=>i==tagIndex?[]:x));
            return tc;
        })
    };

    const cancelFn = () => {
        setGoodsTable(oldGoodsTable.current);
    };

    // var saveFn = async () => {
    //     setSaving(true);
    //     var gidIndex = originHeadRef.current.indexOf("gid");
    //     if (gidIndex==-1) return;

    //     var oldT = oldGoodsTable.current.slice(1).map(line=>[...line,imagesRecord[line[gidIndex]]]);
    //     var newT = goodsTable.slice(1).map(line=>[...line,imagesRecord[line[gidIndex]]]);

    //     var filterOld = oldT.filter(x=>!newT.find(y=>JSON.stringify(y)==JSON.stringify(x)));
    //     var filterNew = newT.filter(x=>!oldT.find(y=>JSON.stringify(y)==JSON.stringify(x)));

    //     var updateLines = filterNew.filter(x=>filterOld.find(y=>y[gidIndex]==x[gidIndex]));
    //     var oldLines = filterOld.filter(x=>!updateLines.find(y=>y[gidIndex]==x[gidIndex]));
    //     var newLines = filterNew.filter(x=>!updateLines.find(y=>y[gidIndex]==x[gidIndex]));

    //     console.log(oldLines,updateLines,newLines)
    //     var needDelete = oldLines.map(x=>x[gidIndex]);
    //     Promise.all([
    //         needDelete.length && user.deleteUserTableLines(needDelete),
    //         ...(updateLines).map(line=>{
    //             var obj = convertLineToObject(line);
    //             [obj["cover"],obj["descImg"]] = line[originHeadRef.current.length];
    //         }).map(obj=>user.updateGoodsManageTableLine(obj)),
    //         ...(newLines).map(line=>{
    //             var obj = convertLineToObject(line);
    //             [obj["cover"],obj["descImg"]] = line[originHeadRef.current.length];
    //         }).map(obj=>user.addGoodsManageTableLine(obj)),
    //     ]).then(ansArr=>{
    //         if (!ansArr.includes(false)) {
    //             alert("保存成功。");
    //             oldGoodsTable.current = goodsTable.map(x=>x.slice());
    //             history.go(0);
    //         } else {
    //             alert("保存失败，请检查列表项是否完整。");
    //         }
    //         setSaving(false);
    //     });
    // };

    const convertLineToObject = (line: any) => {
        var obj: Record<string,any> = {};
        for (let n of originHeadRef.current) {
            obj[n] = line.shift();
        }
        return obj;
    }

    return (
        <div>
            <div>收入状况</div>
            <Blocks incomes={incomes}/>
            <GoodsManage>
                <div>商品状况</div>
                {/*<Table arr={*/}
                {/*    renderDelWithoutCp(*/}
                {/*    renderImageContainer(*/}
                {/*    renderTags(goodsTable,tagIndex)*/}
                {/*    ))*/}
                {/*} setArr={setGoodsTable} editableTypes={goodsTableColumnTypes}/>*/}
                {/*<div>*/}
                {/*    <button onClick={addFn}>添加</button>*/}
                {/*    <button onClick={cancelFn}>取消</button>*/}
                {/*    <button onClick={saveFn}>{saving?"保存中...":"保存"}</button>*/}
                {/*</div>*/}
                <GoodsManagerTable/>

            </GoodsManage>
            <GoodsImageContainer shown={picAdderShown} setShown={setPicAdderShown} gid={currEditGid}
                                 onSubmit={(cover, descImg) => setImagesRecord(record => {
                                     var newObj = {...record};
                                     if (!record[currEditGid]) newObj[currEditGid] = {cover, descImg};
                                     return newObj;
                                 })}/>
        </div>
    )
}

const BlocksStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    transition: 0.2s;
    > * {
        margin: 20px;
    }
`

function Blocks({incomes}: {
    incomes: number[];
}) {
    return <BlocksStyled>
        <ColorfulBlock
            style={{width: "120px", height: "100px"}}
            bg="#3fce84"
            hoverBg="#39b776"
            icon={<svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4087"><path d="M576.2048 229.7856l76.8-85.6064a31.9488 31.9488 0 0 0-23.808-53.3504H394.8544a32 32 0 0 0-23.808 53.3504l76.288 84.8896a384 384 0 0 0-321.0752 378.4192v217.344A104.448 104.448 0 0 0 230.4 929.1264h558.6944a104.448 104.448 0 0 0 104.2944-104.2944v-217.344a384 384 0 0 0-317.184-377.7024z m-18.688-74.9568L512 205.4144l-45.4656-50.5856z m68.1984 457.472a28.5696 28.5696 0 1 1 0 57.088h-86.2208v92.6208a28.5696 28.5696 0 1 1-57.088 0v-92.6208H396.1856a28.5696 28.5696 0 0 1 0-57.088h86.2208v-50.688H396.1856a28.5696 28.5696 0 0 1 0-57.088H468.992l-41.3184-41.3696a28.416 28.416 0 0 1 40.192-40.192l43.6736 43.7248 43.6736-43.7248a28.416 28.416 0 1 1 40.192 40.192l-41.3184 41.3696h71.68a28.5696 28.5696 0 1 1 0 57.088h-86.272v50.688z" fill="#2c2c2c" p-id="4088"></path></svg>}
            title="总收入"
            value={incomes?.[0]} />
        <ColorfulBlock
            style={{width: "120px", height: "100px"}}
            bg="#798dff"
            hoverBg="#6778dc"
            icon={<svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5206"><path d="M567.8269631999999 135.7748149333334c-92.23585173333332 0-177.1899264 24.272593066666666-177.1899264 24.272592s-143.20829653333334-67.96325973333333-216.0260736-53.399703466666665c-75.2450368 41.26340693333333-4.8545184 92.23585173333332 29.1271104 128.64474133333334-72.81777813333333 63.10874026666667-118.93570346666667 148.06281493333333-126.21748053333334 237.87140693333333-16.990814933333333 41.26340693333333-26.699851733333333 9.7090368-46.1179264 33.981629866666665-9.7090368 12.136296533333333-31.554370133333336 111.6539264-2.427259733333333 148.06281493333333 46.1179264 41.26340693333333 72.81777813333333-4.8545184 123.79022293333334 50.97244373333333 24.272593066666666 31.554370133333336 55.8269632 58.25422186666666 92.23585173333332 82.52681493333333 9.7090368 9.7090368-26.699851733333333 26.699851733333333-9.7090368 80.09955626666667 9.7090368 19.4180736 97.09037013333334 21.845333333333333 121.36296213333333 12.136295466666667 14.5635552-12.136296533333333 0-26.699851733333333 9.709037866666668-29.1271104 7.281778133333333 2.427259733333333 12.136296533333333 4.8545184 19.4180736 7.281777066666667 9.7090368 7.281778133333333-12.136296533333333 60.6814816 29.127111466666666 58.25422293333333 14.5635552 2.427259733333333 46.1179264 2.427259733333333 80.0995552 0 19.4180736-4.8545184 12.136296533333333-33.981629866666665 19.418074666666666-33.981629866666665 19.4180736 2.427259733333333 38.83614826666667 2.427259733333333 58.25422186666666 2.427259733333333 55.8269632 0 89.80859306666666-2.427259733333333 138.35377813333335-14.563556266666666 29.127111466666666-4.8545184-12.136296533333333 36.40888853333333 12.136295466666667 43.690666666666665 9.7090368-4.8545184 97.09037013333334 12.136296533333333 114.08118506666666-9.7090368 29.127111466666666-24.272593066666666 0-99.51762986666665 24.272593066666666-111.6539264 114.08118506666666-70.3905184 145.6355552-160.19911146666666 145.6355552-283.9893333333333C1012.0154069333333 303.25570346666666 829.9709631999999 135.7748149333334 567.8269631999999 135.7748149333334zM266.84681493333335 383.35525973333336c-19.4180736 0-36.40888853333333-16.990814933333333-36.40888853333333-36.408889599999995s16.990814933333333-36.40888853333333 36.40888853333333-36.40888853333333 36.40888853333333 16.990814933333333 36.40888853333333 36.40888853333333-16.990814933333333 36.40888853333333-36.40888853333333 36.408889599999995z m611.6693333333334 0c-7.281778133333333 9.7090368-16.990814933333333 14.5635552-29.127111466666666 14.5635552-7.281778133333333 0-14.5635552-2.427259733333333-21.845333333333333-7.281778133333333-46.1179264-33.981629866666665-101.94488853333334-58.25422186666666-165.05362986666665-70.3905184-19.4180736-2.427259733333333-38.83614826666667-4.8545184-60.681480533333335-7.281778133333333-19.4180736 0-36.40888853333333-16.990814933333333-33.981629866666665-38.8361472 0-19.4180736 16.990814933333333-36.40888853333333 38.83614826666667-33.981629866666665 24.272593066666666 0 46.1179264 4.8545184 67.96325866666666 7.281777066666667 72.81777813333333 12.136296533333333 140.7810368 41.26340693333333 196.608 84.95407466666667 16.990814933333333 12.136296533333333 19.4180736 36.40888853333333 7.281778133333333 50.9724448z" fill="" p-id="5207"></path></svg>}
            title="上笔收入"
            value={incomes?.[1]} />
    </BlocksStyled>
}

const TagStyled = styled.div`
    margin: 2px;
    line-height: 20px;
    padding: 3px 6px;
    border-radius: 5px;
    transition: 0.2s;
    cursor: default;
    display: flex;
    align-items: center;
    svg {
        transition: 0.2s;
        border-radius: 3px;
        padding: 1px;
        margin-left: 3px;
        margin-right: -2px;
        color: #666666;
        :hover {
            cursor: pointer;
            background-color: #00000066;
            color: black;
        }
    }
`;

function Tag({text,onClick}: {
    text: string;
    onClick: Function;
}) {
    const color = useRef({
        r: Math.floor(Math.random()*45+160),
        g: Math.floor(Math.random()*45+160),
        b: Math.floor(Math.random()*45+160),
    });

    const [hover, setHover] = useState(false);
    const root = useRef<any>();

    useEffect(() => {
        root.current.addEventListener('mouseenter',()=>setHover(true));
        root.current.addEventListener('mouseleave',()=>setHover(false));
    },[]);

    return <TagStyled ref={root} style={{
        backgroundColor: 
            hover
            ? `rgb(${color.current.r-30},${color.current.g-30},${color.current.b-30})`
            : `rgb(${color.current.r},${color.current.g},${color.current.b})`,
        border: `2px solid rgb(${color.current.r+50},${color.current.g+50},${color.current.b+50})`,
    }}>
        <span>{text}</span>
        <svg onClick={ev=>onClick(ev)} style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1035 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1734"><path d="M972.550494 326.095636c-24.872645-58.823304-60.482966-111.631728-105.828482-156.977244-45.345516-45.345516-98.15394-80.944698-156.977244-105.828482-60.917374-25.763738-125.599617-38.829396-192.253405-38.829396S386.155332 37.526172 325.22682 63.28991c-58.812166 24.872645-111.631728 60.482966-156.977244 105.828482s-80.944698 98.15394-105.828482 156.977244c-25.763738 60.917374-38.829396 125.599617-38.829396 192.253405s13.065657 131.336031 38.829396 192.264543c24.872645 58.812166 60.482966 111.631728 105.828482 156.977244s98.15394 80.944698 156.977244 105.828482c60.917374 25.763738 125.599617 38.829396 192.264543 38.829396s131.336031-13.065657 192.253405-38.829396c58.823304-24.872645 111.631728-60.482966 156.977244-105.828482 45.345516-45.345516 80.944698-98.15394 105.828482-156.977244 25.763738-60.917374 38.829396-125.599617 38.829395-192.264543s-13.065657-131.336031-38.829395-192.253405zM517.491363 923.139364c-223.196624 0-404.779185-181.582561-404.779184-404.779185s181.571422-404.790323 404.779184-404.790323 404.779185 181.582561 404.779185 404.779185-181.582561 404.779185-404.779185 404.779184z m218.62977-560.40865L580.491668 518.360179l155.629465 155.629466c17.398599 17.398599 17.398599 45.612844 0 63.011443-8.699299 8.699299-20.105295 13.054519-31.500152 13.054518s-22.800853-4.355219-31.500153-13.054518L517.491363 581.371623 361.861898 737.001088c-8.699299 8.699299-20.105295 13.054519-31.500152 13.054518s-22.800853-4.355219-31.500153-13.054518c-17.398599-17.398599-17.398599-45.612844 0-63.011443l155.629466-155.629466-155.629466-155.629465c-17.398599-17.398599-17.398599-45.612844 0-63.011443s45.612844-17.398599 63.011444 0L517.502502 455.348736l155.629465-155.629465c17.398599-17.398599 45.612844-17.398599 63.011443 0s17.398599 45.612844 0 63.011443z" p-id="1735"></path></svg>
    </TagStyled>
}

const IncreaseTagStyled = styled.div`
    margin: 1px;
    line-height: 20px;
    height: 20px;
    padding: 3px 6px;
    border-radius: 5px;
    transition: 0.2s;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
`;

function IncreaseTag({onClick}: {
    onClick: Function;
}) {
    const color = useRef({
        r: Math.floor(Math.random()*45+160),
        g: Math.floor(Math.random()*45+160),
        b: Math.floor(Math.random()*45+160),
    });

    const [hover, setHover] = useState(false);
    const root = useRef<any>();

    useEffect(() => {
        root.current.addEventListener('mouseenter',()=>setHover(true));
        root.current.addEventListener('mouseleave',()=>setHover(false));
    },[]);

    return <IncreaseTagStyled onClick={ev=>onClick(ev)} ref={root} style={{
        backgroundColor: 
            hover
            ? `rgb(${color.current.r-30},${color.current.g-30},${color.current.b-30})`
            : `rgb(${color.current.r},${color.current.g},${color.current.b})`,
        border: `2px solid rgb(${color.current.r+50},${color.current.g+50},${color.current.b+50})`,
        cursor: hover?"pointer":"default",
    }}>
        <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2506"><path d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z m32-394.666667h128a32 32 0 0 1 0 64H544v128a32 32 0 0 1-64 0V544H352a32 32 0 0 1 0-64h128V352a32 32 0 0 1 64 0v128z" fill="#000000" p-id="2507"></path></svg>
    </IncreaseTagStyled>
}