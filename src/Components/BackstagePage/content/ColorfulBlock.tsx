import styled from "styled-components";

export default function ColorfulBlock({bg,hoverBg,hoverComp,icon,title,value,style}: {
    bg: string;
    hoverBg: string;
    hoverComp?: any;
    icon: any;
    title: string;
    value: any;
    style?: string;
}) {
    const DivStyled = styled.div`
        width: 150px;
        height: 120px;
        background-color: ${bg};
        border-radius: 10px;
        box-shadow: 0 0 5px ${bg};
        padding: 15px;
        transition: 0.2s;
        position: relative;

        :hover {
            background-color: ${hoverBg};
            ${
                hoverComp
                ? `
                > :nth-child(1) {
                    pointer-events: none;
                    filter: blur(2px);
                }
                > :nth-child(2) {
                    pointer-events: initial;
                    opacity: 1;
                }`
                : ""
            }
        }

        > :nth-child(1) {
            width: inherit;
            height: inherit;
            position: relative;
            > :nth-child(1) {
                font-size: 18px;
            }
            > :nth-child(2) {
                margin-top: 16%;
                font-size: 26px;
            }
            > :nth-child(3) {
                width: 80px;
                height: 80px;
                opacity: 0.2;
                position: absolute;
                right: -5px;
                bottom: -5px;
            }
        }

        > :nth-child(2) {
            opacity: 0;
            position: absolute;
            top: 15px;
            width: inherit;
            height: inherit;
            pointer-events: none;
            transition: 0.2s;
        }

        ${style}
    `

    return <DivStyled>
        <div>
            <div>{title}</div>
            <div>{value}</div>
            <div>{icon}</div>
        </div>
        <div>
            {hoverComp}
        </div>
    </DivStyled>
}
