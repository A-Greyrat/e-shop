import React from 'react'
import styled from 'styled-components'
import ColorfulBlock from './ColorfulBlock'

export default function Goods() {
    const Blocks = styled.div`
        display: flex;
        flex-wrap: wrap;
        transition: 0.2s;
        > * {
            margin: 20px;
        }
    `

    return (
        <div>
            <div>收入状况</div>
            <Blocks>
                <ColorfulBlock
                    style='width: 120px; height: 100px;'
                    bg="#3fce84"
                    hoverBg="#39b776"
                    icon={
                        <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>
                    }
                    title="总收入"
                    value={3}
                />
                <ColorfulBlock
                    style='width: 120px; height: 100px;'
                    bg="#798dff"
                    hoverBg="#6778dc"
                    icon={
                        <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>
                    }
                    title="近三笔收入"
                    value={5}
                />
            </Blocks>
            <div>商品状况</div>
            <GoodsTable head={["a","b"]} contentArr={[['a','b'],['c','d']]}/>
        </div>
    )
}

const TableStyled = styled.table`
    margin: 20px;
    border-collapse: collapse;
    tr {
        :hover {
            background-color: var(--background-color);
        }
    }
    td {
        border: 1px solid #00000045;
        padding-left: 10px;
        min-width: 100px;
        line-height: 40px;
    }
    > :nth-child(1) {
        background-color: var(--background-color);
    }
`

function GoodsTable({head,contentArr}: {
    head: string[];
    contentArr: string[][];
}) {
    return <TableStyled>
        <thead>
        <tr>
            {
                head.map((x,index)=><td key={x+index}>{x}</td>)
            }
        </tr>
        </thead>
        <tbody>
        {
            contentArr.map((elem,index)=><tr key={index}>{elem.map((x,index2)=><td key={x+index2}>{x}</td>)}</tr>)
        }
        </tbody>
    </TableStyled>
}
