import { useEffect, useState } from 'react'
import SideBar from '../Components/BackstagePage/SideBar'
import styled from 'styled-components'
import TopBar from '../Components/BackstagePage/TopBar'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import Home from '../Components/BackstagePage/content/Home'
import user from '../ts/user'
import Money from '../Components/BackstagePage/content/Money'
import Goods from '../Components/BackstagePage/content/Goods'
import Users from '../Components/BackstagePage/content/Users'

const routeMapper: Record<string,any> = {
    "home": <Home/>,
    "money": <Money/>,
    "goods": <Goods/>,
    "users": <Users/>
};

const DivStyled = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    background-color: var(--background-color);
    > :nth-child(1) {
        max-width: 30vw;
        width: 260px;
        display: flex;
        flex-direction: column;
        position: relative;
        > :nth-child(1) {
            > .toggle-btn {
                position: absolute;
                left: 20px;
                top: 25px;
                z-index: 2;
                cursor: pointer;
                transition: 0.2s;
                > svg {
                    margin: 0 auto;
                }
                :hover {
                    transform: scale(1.2);
                }
            }
            text-align: center;
            margin-top: 5px;
            padding: 20px;
            font-size: 18px;
        }
    }
    > :nth-child(2) {
        width: 0.8px;
        height: 100vh;
        background-color: #00000026;
        align-self: center;
    }
    > :nth-child(3) {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        > :nth-child(2) {
            flex: 1 0;
            margin: 30px;
            padding: 30px;
            overflow: auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 5px #00000022;
        }
    }
`

const sideBarIconsMapper: Record<string,any> = {
    "home": <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1682"><path d="M694.83 592.92l-2.41-1.38c0.79 0.46 1.58 0.94 2.41 1.38zM731.26 521.59c1.28 0.72 2.56 1.44 3.82 2.17a40.88 40.88 0 0 0-3.82-2.17z" p-id="1683"></path><path d="M694.83 592.92a40 40 0 0 0 40.25-69.16c-1.26-0.73-2.54-1.45-3.82-2.17a444.83 444.83 0 0 0-68.19-31.11A239.54 239.54 0 0 0 752 304c0-132.55-107.45-240-240-240S272 171.45 272 304a239.49 239.49 0 0 0 88.91 186.46C187.83 552.46 64 717.93 64 912.34v7.58c0 1.06 0 2.1 0.13 3.13a40 40 0 0 0 80-2.85v-0.28c0-0.71 0-1.41-0.06-2.11v-5.48c0-203.24 164.76-368 368-368a366.28 366.28 0 0 1 180.42 47.2zM512 464a160 160 0 1 1 160-160 160 160 0 0 1-160 160zM923.33 880H644.67c-20.25 0-36.67 17.91-36.67 40s16.42 40 36.67 40h278.66c20.25 0 36.67-17.91 36.67-40s-16.42-40-36.67-40zM608 808.5c0 22.09 16.42 40 36.67 40h214.66c20.25 0 36.67-17.91 36.67-40s-16.42-40-36.67-40H644.67c-20.25 0-36.67 17.91-36.67 40z" p-id="1684"></path><path d="M608 680c0 22.09 16.42 40 36.67 40h150.66c20.25 0 36.67-17.91 36.67-40s-16.42-40-36.67-40H644.67c-20.25 0-36.67 17.91-36.67 40z" p-id="1685"></path></svg>,
    "money": <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3338"><path d="M884.419048 786.456381a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857V268.190476a121.904762 121.904762 0 0 1 121.904762-121.904762h419.888762a73.142857 73.142857 0 0 1 73.142857 73.142857l-0.024381 49.834667h74.459428a73.142857 73.142857 0 0 1 73.142858 73.142857v444.050286z m-73.142858-444.050286H195.047619v444.050286h616.228571l-0.02438-123.63581H540.062476v-196.754285l271.189334-0.024381v-123.611429z m0 196.778667H613.180952v50.492952h198.070858v-50.468571zM663.698286 219.428571H243.809524a48.761905 48.761905 0 0 0-48.761905 48.761905l-0.024381 1.072762h468.650667V219.428571z" p-id="3339"></path></svg>,
    "goods": <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4910"><path d="M960 253.184l-448-192-448 192v547.392l448 190.72 38.688-16.48h8.192v-3.488L960 800.608V253.184z m-448 163.424l-113.536-48.32 318.944-147.2c0.736-0.352 1.216-0.992 1.92-1.408l127.232 54.528L512 416.608z m128.704-230.624l-321.696 148.48-141.568-60.288L512 130.816l128.704 55.168zM128 322.688l128 54.496V576a32 32 0 1 0 64 0v-171.52l0.064-0.032 174.816 74.432v435.584L128 758.272V322.688z m430.88 579.104V466.208L896 322.688v435.616l-337.12 143.488z" p-id="4911"></path></svg>,
    "users": <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6190"><path d="M767.23 482.61c35.1-31.02 57.35-75.93 57.35-126 0-86.84-65.08-158.94-151.38-167.72-17.47-1.77-33.28 11.03-35.08 28.61-1.78 17.58 11.03 33.28 28.61 35.06 53.5 5.45 93.84 50.17 93.84 104.05 0 53.31-39.88 97.98-92.75 103.92-11.64 1.3-20.63 8.96-25.12 18.91-0.04 0.08-0.08 0.15-0.12 0.22-1.24 2.8-1.94 5.7-2.33 8.82-0.2 1.16-0.82 2.15-0.88 3.35-0.05 0.89 0.35 1.66 0.37 2.53 0.03 0.53-0.19 1-0.13 1.53 0.09 0.8 0.53 1.44 0.68 2.21 2.18 14.73 13.84 26.58 29.28 27.44 119.3 6.59 216.69 101.45 226.55 220.66 1.38 16.72 15.38 29.36 31.86 29.36 0.88 0 1.77-0.03 2.67-0.11 17.61-1.45 30.7-16.91 29.25-34.53-9.75-117.84-87.27-216.63-192.67-258.31z" p-id="6191"></path><path d="M536.12 499.11c44.15-35.34 72.55-89.57 72.55-150.39 0-106.25-86.44-192.69-192.67-192.69s-192.67 86.44-192.67 192.69c0 60.81 28.4 115.05 72.55 150.39C170 545.37 75.68 661.55 64.11 801.33c-1.45 17.61 11.64 33.08 29.25 34.53 18.06 1.56 33.08-11.66 34.53-29.25C140.19 657.89 266.75 541.39 416 541.39s275.81 116.5 288.11 265.22c1.38 16.72 15.38 29.36 31.86 29.36 0.88 0 1.77-0.03 2.67-0.11 17.61-1.45 30.7-16.92 29.25-34.53C756.32 661.55 662 545.37 536.12 499.11zM287.33 348.72c0-70.95 57.72-128.69 128.67-128.69s128.67 57.73 128.67 128.69S486.95 477.39 416 477.39s-128.67-57.72-128.67-128.67z" p-id="6192"></path></svg>, 
};

export default function BackstagePage() {
    const [permissionArr, setPermissionArr] = useState<{
        type: "item" | "folder";
        text: string;
        icon?: any;
        url?: string;
        children?: any[];
    }[]>([]);
    const [router, setRouter] = useState<any[]>([]);
    const [hideSideBar, setHideSideBar] = useState(false);
    const [title, setTitle] = useState("");

    const withSideIcon = (permissionArr: {
        type: "item" | "folder";
        text: string;
        icon?: any;
        url?: string;
        children?: any[];
    }[]) => {
        return permissionArr.map(elem => {
            if (elem.type=="item" && elem.url) {
                elem.icon = sideBarIconsMapper[elem.url];
            } else if (elem.type=="folder" && elem.children) {
                elem.children = withSideIcon(elem.children);
            }
            return elem;
        });
    };

    const routerMapperFn = (list: {
        url?: string;
        children?: any[];
    }[]): any[] => {
        var newList = list.map(x=>{
            if (x.url) {
                return {
                    path: x.url,
                    element: routeMapper?.[x.url],
                } as RouteObject;
            } else if (x.children) {
                return routerMapperFn(x.children);
            } else return null;
        }).filter(x=>!!x);
        var arrs = newList.filter(x=>x instanceof Array);
        newList = newList.filter(x=>!(x instanceof Array));
        arrs.forEach(elem => newList = newList.concat(elem));
        return newList;
    }

    useEffect(() => {
        user.getBackstagePermissionList().then(list => {
            setPermissionArr(list);
            setTitle(list.filter(obj=>obj.url=="home")?.[0].text);
            var newRouter = routerMapperFn(list);
            newRouter.push({path: "*",element: <Navigate to="home"/>})
            setRouter(newRouter);
        });
    },[]);

    return (
        <DivStyled>
            <div style={hideSideBar?{width: "50px"}:{}}>
                <div>
                    <div className='toggle-btn' onClick={()=>setHideSideBar(x=>!x)} style={hideSideBar?{left: "16px"/* todo */}:{}}>
                        <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6812"><path d="M776.533333 448l-46.933333-46.933333L789.333333 341.333333l149.333334 149.333334-149.333334 149.333333-59.733333-59.733333 46.933333-46.933334H554.666667v-85.333333h221.866666z m-529.066666 0H469.333333v85.333333H247.466667l46.933333 46.933334L234.666667 640 85.333333 490.666667 234.666667 341.333333l59.733333 59.733334-46.933333 46.933333z" p-id="6813"></path></svg>
                    </div>
                    <span style={hideSideBar?{opacity:0,pointerEvents:'none'}:{}}>{hideSideBar?".":"购物系统后台"}</span>
                </div>
                <SideBar
                    onItemClick={(text)=>setTitle(text)}
                    hide={hideSideBar}
                    objArr={withSideIcon(permissionArr) as any}
                    highlightFn={n=>new URL(location.href).pathname=="/backstage/"+n.url}/>
            </div>
            <div/>
            <div>
                <TopBar title={title}/>
                <div>
                    {useRoutes(router)}
                </div>
            </div>
        </DivStyled>
    )
}
