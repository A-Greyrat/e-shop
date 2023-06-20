import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './SideBar.css'

interface SideBarJSCell {
    type: "item" | "folder";
    text: string;
    url: string;
    children: SideBarJSCell[];
}

export default function SideBar({objArr}: {
    objArr: SideBarJSCell[];
}) {
    const nav = useNavigate();
    const mapComps = (level: number,objArr?: SideBarJSCell[]) => {
        return objArr?.map(n => {
            if (n.type=='item') {
                return <SideBarItem level={level} text={n.text} clickFn={()=>nav(n.url)}/>;
            } else if (n.type=='folder') {
                return <SideBarFolder level={level} text={n.text}>{
                    mapComps(level+1,n.children)
                }</SideBarFolder>;
            }
        });
    };

    const components = useMemo(() => mapComps(1,objArr), [objArr])

    return (
        <div className='sidebar'>
            { components }
        </div>
    )
}

function SideBarItem({level,text,clickFn}: {
    level: number;
    text: any;
    clickFn: Function;
}) {
    return <div className='sidebar-item' style={{paddingLeft: 10*level+"px"}} onClick={ev=>clickFn(ev)}>
        {text}
    </div>
}

function SideBarFolder({level,text,children}: {
    level: number;
    text: string;
    children: any;
}) {
    const [expand, setExpand] = useState(false);

    return <div className={'sidebar-folder'+(expand?" expand":"")}>
        <SideBarItem
            level={level}
            text={
                <>
                <div>{text}</div>
                <div className={"sidebar-folder-arrow"+(expand?" expand":"")}>
                    <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1452"><path d="M535.12 711.6L870.528 355.2a29.376 29.376 0 0 0 0-42.352 31.376 31.376 0 0 0-43.52 0l-315.2 334.912-315.2-334.912a31.376 31.376 0 0 0-43.52 0 29.376 29.376 0 0 0 0 42.352l335.408 356.4a36.272 36.272 0 0 0 46.624 0z" p-id="1453"></path></svg>
                </div>
                </>
            }
            clickFn={()=>setExpand(a=>!a)}/>
        <div className='sidebar-folder-children'>{children}</div>
    </div>
}