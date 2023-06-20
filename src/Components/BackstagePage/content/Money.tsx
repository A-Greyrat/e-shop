import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ColorfulBlock from './ColorfulBlock';

export default function Money() {
    const [moneyInfo, setMoneyInfo] = useState({currMoney: 30.5, currUseMoney: 16.2});

    // useEffect(() => {
    //     user.getMoneyInfo().then(setMoneyInfo);
    // },[]);

    const DivStyled = styled.div`
        display: flex;
        flex-wrap: wrap;
        transition: 0.2s;
        > * {
            margin: 20px;
        }
        button {
            font-family: inherit;
            width: 80px;
            line-height: 30px;
            text-align: center;
            font-size: 15px;
            background: var(--important-btn-color);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            user-select: none;
            border: none;
            transition: 0.2s;
            box-shadow: 0 0 10px var(--important-btn-color);
            :hover {
                background-color: var(--important-btn-focus-color);
            }
        }
    `

    return (
        <DivStyled>
            <ColorfulBlock
                bg="#e75a5a"
                hoverBg="#c14c4c"
                hoverComp={
                    <div style={{height: "inherit", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <button>充值</button>
                    </div>
                }
                icon={
                    <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>
                }
                title="当前余额"
                value={moneyInfo.currMoney}
            />
            <ColorfulBlock
                bg="#f6cf66"
                hoverBg="#d8b65a"
                icon={
                    <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>
                }
                title="近期消费"
                value={moneyInfo.currUseMoney}
            />
            {/* <SimpleBlock
                bg="#44d88c"
                icon={
                    <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>
                }
                title="当前余额"
                value={moneyInfo.currMoney}
            /> */}
        </DivStyled>
    )
}