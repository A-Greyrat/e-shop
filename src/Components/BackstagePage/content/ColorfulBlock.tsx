import { useEffect, useRef } from "react";
import styled from "styled-components";

const ColorfulBlockStyled = styled.div`
    width: 150px;
    height: 120px;
    border-radius: 10px;
    padding: 15px;
    transition: 0.2s;
    position: relative;

    > :nth-child(1) {
        width: inherit;
        height: inherit;
        cursor: default;
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
`

function ColorfulBlock({bg,hoverBg,icon,title,value,style}: {
    bg: string;
    hoverBg: string;
    icon: any;
    title: string;
    value: any;
    style?: React.CSSProperties;
}) {
    const id = useRef("tag"+Math.floor(Math.random()*100000)+new Date().getTime());
    const sheet = useRef(document.createElement('style'));

    useEffect(() => {
        sheet.current.textContent=`
            #${id.current}:hover {
                background-color: ${hoverBg}!important;
            }
        `;
        document.head.appendChild(sheet.current);
        return ()=>{document.head.removeChild(sheet.current)};
    },[]);

    return <ColorfulBlockStyled id={id.current} style={{
        backgroundColor: bg,
        boxShadow: `0 0 5px ${bg}`,
        ...style
    }}>
        <div>
            <div>{title}</div>
            <div>{value}</div>
            <div>{icon}</div>
        </div>
    </ColorfulBlockStyled>
}

var ColorfulBlockWithCompStyled = styled(ColorfulBlockStyled)`
    :hover {
        > :nth-child(1) {
            pointer-events: none;
            filter: blur(2px);
        }
        > :nth-child(2) {
            pointer-events: initial;
            opacity: 1;
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
`;

function ColorfulBlockWithComp({bg,hoverBg,hoverComp,icon,title,value,style}: {
    bg: string;
    hoverBg: string;
    hoverComp: any;
    icon: any;
    title: string;
    value: any;
    style?: React.CSSProperties;
}) {
    const id = useRef("tag"+Math.floor(Math.random()*100000)+new Date().getTime());
    const sheet = useRef(document.createElement('style'));

    useEffect(() => {
        sheet.current.textContent=`
            #${id.current}:hover {
                background-color: ${hoverBg}!important;
            }
        `;
        document.head.appendChild(sheet.current);
        return ()=>{document.head.removeChild(sheet.current)};
    },[]);

    return <ColorfulBlockWithCompStyled id={id.current} style={{
        backgroundColor: bg,
        boxShadow: `0 0 5px ${bg}`,
        ...style
    }}>
        <div>
            <div>{title}</div>
            <div>{value}</div>
            <div>{icon}</div>
        </div>
        <div>
            {hoverComp}
        </div>
    </ColorfulBlockWithCompStyled>
}

export {
    ColorfulBlock,
    ColorfulBlockWithComp
}