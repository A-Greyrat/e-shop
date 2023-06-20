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
        > :nth-child(1) {
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
            box-shadow: 0 0 5px #00000022;// todo
        }
    }
`

export default function BackstagePage() {
    const [permissionArr, setPermissionArr] = useState<{
        type: "item" | "folder";
        text: string;
        url?: string;
        children?: any[];
    }[]>([]);
    const [router, setRouter] = useState<any[]>([]);

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
            var newRouter = routerMapperFn(list);
            newRouter.push({path: "*",element: <Navigate to="home"/>})
            setRouter(newRouter);
        });
    },[]);

    return (
        <DivStyled>
            <div>
                <div>购物系统后台</div>
                <SideBar
                    objArr={permissionArr as any}
                    highlightFn={n=>new URL(location.href).pathname=="/backstage/"+n.url}/>
            </div>
            <div/>
            <div>
                <TopBar/>
                <div>
                    {useRoutes(router)}
                </div>
            </div>
        </DivStyled>
    )
}
