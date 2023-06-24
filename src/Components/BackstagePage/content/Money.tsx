import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ColorfulBlock, ColorfulBlockWithComp } from './ColorfulBlock';
import user from '../../../ts/user';
import ajax from '../../../ts/ajax';

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

export default function Money() {
    const [moneyInfo, setMoneyInfo] = useState<number[]>([]);

    useEffect(() => {
        ajax.getMoneyInfo(user.token).then(setMoneyInfo);
    },[]);

    const recharge = () => {
        // todo
        history.go(0);
    };

    return (
        <DivStyled>
            <ColorfulBlockWithComp
                bg="#e75a5a"
                hoverBg="#c14c4c"
                hoverComp={
                    <div style={{height: "inherit", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <button onClick={recharge}>充值</button>
                    </div>
                }
                icon={<svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m96.060952 120.441904l51.687619 51.687619L563.736381 438.857143H694.857143v73.142857h-146.285714v60.952381h146.285714v73.142857h-146.285714v97.52381h-73.142858v-97.52381h-146.285714v-73.142857h146.285714V512h-146.285714v-73.142857h131.145143l-96.060952-96.060953 51.736381-51.687619L512 387.120762l96.060952-96.060952z" p-id="2381"></path></svg>}
                title="当前余额"
                value={moneyInfo[0]}
            />
            <ColorfulBlock
                bg="#b869fd"
                hoverBg="#a15cdd"
                icon={<svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6002"><path d="M835.98 932.97H185.92c-40.42 0-73.31-32.88-73.31-73.31V457.22c0-40.42 32.88-73.31 73.31-73.31h650.05c40.42 0 73.31 32.88 73.31 73.31v402.43c0.01 40.43-32.88 73.32-73.3 73.32zM185.92 432.79c-13.48 0-24.44 10.96-24.44 24.44v402.43c0 13.48 10.96 24.44 24.44 24.44h650.05c13.47 0 24.44-10.96 24.44-24.44V457.22c0-13.48-10.97-24.44-24.44-24.44H185.92zM276.19 528.58h469.52v48.87H276.19zM276.19 648.06h469.52v48.87H276.19zM282.09 435.64l-42.32-24.43 146.47-253.69 392.85 226.82-26.55 46.01-42.33-24.44 2.13-3.68-308.22-177.95zM761.7 429.11L570.36 157.62l-102.19 72.02-28.16-39.95L582.15 89.51l219.5 311.45z" p-id="6003"></path></svg>}
                title="近期消费"
                value={moneyInfo[1]}
            />
        </DivStyled>
    )
}