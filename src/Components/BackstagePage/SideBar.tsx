import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './SideBar.css'

interface SideBarJSCell {
    type: "item" | "folder";
    text: string;
    url: string;
    children: SideBarJSCell[];
}

export default function SideBar({objArr,highlightFn=()=>false}: {
    objArr: SideBarJSCell[];
    highlightFn?: (a:SideBarJSCell)=>boolean;
}) {
    const nav = useNavigate();
    const mapComps = (level: number,objArr?: SideBarJSCell[]) => {
        return objArr?.map(n => {
            if (n.type=='item') {
                return <SideBarItem highlight={highlightFn(n)} key={n.text+level} level={level} content={n.text} clickFn={()=>nav(n.url)}/>;
            } else if (n.type=='folder') {
                return <SideBarFolder key={n.text+level} level={level} text={n.text}>{
                    mapComps(level+1,n.children)
                }</SideBarFolder>;
            }
        });
    };

    return (
        <div className='sidebar'>
            { mapComps(1,objArr) }
        </div>
    )
}

function SideBarItem({level,content,highlight,clickFn}: {
    level: number;
    content: any;
    highlight: boolean;
    clickFn: Function;
}) {
    return <div className={'sidebar-item'+(highlight?" highlight":"")} style={{paddingLeft: 10*level+"px"}} onClick={ev=>clickFn(ev)}>
        {content}
    </div>
}

function SideBarFolder({level,text,children,expanded=false}: {
    level: number;
    text: string;
    children: any;
    expanded?: boolean;
}) {
    const [expand, setExpand] = useState(expanded);

    return <div className={'sidebar-folder'+(expand?" expand":"")}>
        <SideBarItem
            level={level}
            content={
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>{text}</div>
                    <div className="sidebar-folder-arrow">
                        <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1452"><path d="M535.12 711.6L870.528 355.2a29.376 29.376 0 0 0 0-42.352 31.376 31.376 0 0 0-43.52 0l-315.2 334.912-315.2-334.912a31.376 31.376 0 0 0-43.52 0 29.376 29.376 0 0 0 0 42.352l335.408 356.4a36.272 36.272 0 0 0 46.624 0z" p-id="1453"></path></svg>
                    </div>
                </div>
            }
            highlight={false}
            clickFn={()=>setExpand(a=>!a)}/>
        <div className='sidebar-folder-children'>{children}</div>
    </div>
}