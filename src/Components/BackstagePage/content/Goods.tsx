import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ColorfulBlock from './ColorfulBlock'
import Table from './Table'
import user from '../../../ts/user'

const GoodsManage = styled.div`
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

export default function Goods() {
    const [goodsTable, setGoodsTable] = useState<any[][]>([]);
    const oldGoodsTable = useRef(goodsTable);
    const [incomes, setIncomes] = useState<number[]>([]);
    const [tagIndex, setTagIndex] = useState(-1);

    useEffect(() => {
        user.getIncomes().then(setIncomes);
        user.getGoodsManageTable().then(x=>{
            var tagIndex = x?.[0].indexOf("tags") || -1;
            setTagIndex(tagIndex);
            var goodsTable = handleTags(x,tagIndex);
            oldGoodsTable.current = goodsTable;
            setGoodsTable(goodsTable);
        });
    },[]);

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

    const saveFn = () => {
        oldGoodsTable.current = goodsTable.map(x=>x.slice());
        user.setGoodsManageTable(goodsTable);
    };

    return (
        <div>
            <div>收入状况</div>
            <Blocks incomes={incomes}/>
            <GoodsManage>
                <div>商品状况</div>
                <Table arr={renderDelWithoutCp(renderTags(goodsTable,tagIndex))} setArr={setGoodsTable}/>
                <div>
                    <button onClick={addFn}>添加</button>
                    <button onClick={cancelFn}>取消</button>
                    <button onClick={saveFn}>保存</button>
                </div>
            </GoodsManage>
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
            style='width: 120px; height: 100px;'
            bg="#3fce84"
            hoverBg="#39b776"
            icon={<svg style={{ verticalAlign: "middle", fill: "currentColor", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>}
            title="总收入"
            value={incomes?.[0]} />
        <ColorfulBlock
            style='width: 120px; height: 100px;'
            bg="#798dff"
            hoverBg="#6778dc"
            icon={<svg style={{ verticalAlign: "middle", fill: "currentColor", overflow: "hidden" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>}
            title="近三笔收入"
            value={incomes?.[1]} />
    </BlocksStyled>
}

function Tag({text,onClick}: {
    text: string;
    onClick: Function;
}) {
    const color = useRef({
        r: Math.floor(Math.random()*45+160),
        g: Math.floor(Math.random()*45+160),
        b: Math.floor(Math.random()*45+160),
    });

    const TagStyled = styled.div`
        margin: 2px;
        line-height: 20px;
        padding: 3px 6px;
        border-radius: 5px;
        transition: 0.2s;
        cursor: default;
        display: flex;
        align-items: center;
        background-color: rgb(${color.current.r},${color.current.g},${color.current.b});
        border: 2px solid rgb(${color.current.r+50},${color.current.g+50},${color.current.b+50});
        :hover {
            background-color: rgb(${color.current.r-30},${color.current.g-30},${color.current.b-30});
        }
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

    return <TagStyled>
        <span>{text}</span>
        <svg onClick={ev=>onClick(ev)} style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1035 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1734"><path d="M972.550494 326.095636c-24.872645-58.823304-60.482966-111.631728-105.828482-156.977244-45.345516-45.345516-98.15394-80.944698-156.977244-105.828482-60.917374-25.763738-125.599617-38.829396-192.253405-38.829396S386.155332 37.526172 325.22682 63.28991c-58.812166 24.872645-111.631728 60.482966-156.977244 105.828482s-80.944698 98.15394-105.828482 156.977244c-25.763738 60.917374-38.829396 125.599617-38.829396 192.253405s13.065657 131.336031 38.829396 192.264543c24.872645 58.812166 60.482966 111.631728 105.828482 156.977244s98.15394 80.944698 156.977244 105.828482c60.917374 25.763738 125.599617 38.829396 192.264543 38.829396s131.336031-13.065657 192.253405-38.829396c58.823304-24.872645 111.631728-60.482966 156.977244-105.828482 45.345516-45.345516 80.944698-98.15394 105.828482-156.977244 25.763738-60.917374 38.829396-125.599617 38.829395-192.264543s-13.065657-131.336031-38.829395-192.253405zM517.491363 923.139364c-223.196624 0-404.779185-181.582561-404.779184-404.779185s181.571422-404.790323 404.779184-404.790323 404.779185 181.582561 404.779185 404.779185-181.582561 404.779185-404.779185 404.779184z m218.62977-560.40865L580.491668 518.360179l155.629465 155.629466c17.398599 17.398599 17.398599 45.612844 0 63.011443-8.699299 8.699299-20.105295 13.054519-31.500152 13.054518s-22.800853-4.355219-31.500153-13.054518L517.491363 581.371623 361.861898 737.001088c-8.699299 8.699299-20.105295 13.054519-31.500152 13.054518s-22.800853-4.355219-31.500153-13.054518c-17.398599-17.398599-17.398599-45.612844 0-63.011443l155.629466-155.629466-155.629466-155.629465c-17.398599-17.398599-17.398599-45.612844 0-63.011443s45.612844-17.398599 63.011444 0L517.502502 455.348736l155.629465-155.629465c17.398599-17.398599 45.612844-17.398599 63.011443 0s17.398599 45.612844 0 63.011443z" p-id="1735"></path></svg>
    </TagStyled>
}

function IncreaseTag({onClick}: {
    onClick: Function;
}) {
    const color = useRef({
        r: Math.floor(Math.random()*45+160),
        g: Math.floor(Math.random()*45+160),
        b: Math.floor(Math.random()*45+160),
    });

    const TagStyled = styled.div`
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
        background-color: rgb(${color.current.r},${color.current.g},${color.current.b});
        border: 2px solid rgb(${color.current.r+50},${color.current.g+50},${color.current.b+50});
        :hover {
            background-color: rgb(${color.current.r-30},${color.current.g-30},${color.current.b-30});
            cursor: pointer;
        }
    `;

    return <TagStyled onClick={ev=>onClick(ev)}>
        <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2506"><path d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z m32-394.666667h128a32 32 0 0 1 0 64H544v128a32 32 0 0 1-64 0V544H352a32 32 0 0 1 0-64h128V352a32 32 0 0 1 64 0v128z" fill="#000000" p-id="2507"></path></svg>
    </TagStyled>
}