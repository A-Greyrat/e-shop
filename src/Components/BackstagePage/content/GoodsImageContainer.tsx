import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components';
import requestFile from '../../../ts/fileRequestor';
import ajax from '../../../ts/ajax';

const RootStyled = styled.div`
    width: 800px;
    max-width: 90vw;
    height: 75vh;
    padding: 20px;
    overflow: auto;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function GoodsImageContainer({shown=false,setShown,gid,onSubmit,delayTime=300}: {
    shown: boolean;
    setShown: React.Dispatch<React.SetStateAction<boolean>>;
    gid: number;
    onSubmit: (cover: string[],descImg: string[])=>void;
    delayTime?: number;
}) {
    var { exist, shouldRender } = useRenderTimeRemainer(shown,delayTime);
    const [cover, setCover] = useState<string[]>([]);
    const [descImg, setDescImg] = useState<string[]>([]);

    useEffect(() => {
        setCover([ajax.getCoverImgSrc(gid)]);
        ajax.getGoodsDetail(gid).then(x=>{
            setDescImg(Array(x.descCount).fill('').map((_,i)=>ajax.getDescImgSrc(gid,i)));
        });
    },[gid]);
    
    return <>{
        exist && <div>
            {/* mask */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                opacity: (shouldRender ? 1 : 0),
                transition: delayTime/1000+"s",
                zIndex: 1
            }} onClick={() => setShown(false)}/>
            
            <RootStyled style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: `translate(-50%,-50%) scale(${(shouldRender ? 1 : 0.9)})`,
                transition: delayTime/1000+"s",
                opacity: (shouldRender ? 1 : 0),
                zIndex: 1,
            }}>
                <div>封面</div>
                <PicsAdder imageArr={cover} setImageArr={setCover}/>
                <div>描述</div>
                <PicsAdder imageArr={descImg} setImageArr={setDescImg}/>
                <button onClick={()=>onSubmit(cover,descImg)}>提交</button>
            </RootStyled>
        </div>
    }</>
}

const PicsAdderStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    > * {
        margin: 20px;
    }
`

const AImgStyled = styled.div`
    width: 100px;
    height: 100px;
    position: relative;
    > img {
        width: 100%;
        height: 100%;
    }
    > div {
        position: absolute;
        top: 5px;
        right: 5px;
        color: var(--label-color);
    }
`

function PicsAdder({imageArr,setImageArr}: {
    imageArr: string[];
    setImageArr: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const removePic = (index: number) => {
        setImageArr(arr=>{
            var narr = arr.slice();
            URL.revokeObjectURL(narr.splice(index,1)[0]);
            return narr;
        });
    };

    const addPic = async ()=>{
        var file = (await requestFile());
        if (!file.type.startsWith("image")) return;
        var fileAb = file.arrayBuffer;
        setImageArr(arr=>{
            var newArr = arr.slice();
            newArr.push(URL.createObjectURL(new Blob([fileAb])));
            return newArr;
        });
    };

    return <PicsAdderStyled>
        {
            imageArr?.map((src,index)=><AImgStyled>
                <img src={src}></img>
                <div onClick={()=>removePic(index)}>
                    <svg style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3036"><path d="M684.6425 277.598412l-1.436722-1.467421c-12.489452-12.461823-32.730449-12.461823-45.159526 0L479.700875 434.510138l-158.286026-158.315702c-12.555967-12.524245-32.793894-12.524245-45.225017 0-12.555967 12.462846-12.555967 32.701796 0 45.223994l158.348448 158.317749L276.129456 638.049834c-12.495592 12.429077-12.495592 32.671097 0 45.163619l1.49812 1.434675c12.429077 12.494569 32.66905 12.494569 45.221948 0l158.287049-158.286026 158.283979 158.286026c12.491499 12.494569 32.731472 12.494569 45.220924 0 12.495592-12.493545 12.495592-32.731472 0-45.222971l-158.285003-158.285003 158.285003-158.314679C697.138092 310.299185 697.138092 290.060235 684.6425 277.598412M818.881854 140.522454c-187.332573-187.363272-491.033479-187.363272-678.364005 0-187.329503 187.329503-187.329503 491.032456 0 678.362982 187.330526 187.392948 491.031433 187.392948 678.364005 0C1006.274802 631.55491 1006.274802 327.851956 818.881854 140.522454M773.656837 773.660418c-162.344458 162.343435-425.569512 162.407903-587.914994 0-162.40688-162.344458-162.40688-425.602258 0-587.914994 162.344458-162.40688 425.569512-162.40688 587.914994 0C936.063717 348.059184 936.000272 611.31596 773.656837 773.660418" p-id="3037"></path></svg>
                </div>
            </AImgStyled>)
        }
        <AImgStyled onClick={addPic} style={{
            color: "var(--label-color)"
        }}>
            <svg style={{verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1569"><path d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z" p-id="1570"></path><path d="M256 544a32 32 0 0 1 0-64h512a32 32 0 0 1 0 64H256z" p-id="1571"></path><path d="M480 256a32 32 0 0 1 64 0v512a32 32 0 0 1-64 0V256z" p-id="1572"></path></svg>
        </AImgStyled>
    </PicsAdderStyled>
}

function useRenderTimeRemainer(shown: boolean,delayTime: number) {
    const [exist, setExist] = useState(shown);
    const [shouldRender, setShouldRender] = useState(shown);
    useLayoutEffect(() => {
        if (shown) {
            setExist(true);
            setTimeout(() => setShouldRender(true),0);
        } else {
            setShouldRender(false);
            setTimeout(() => setExist(false),delayTime);
        }
    },[shown,delayTime]);

    return { exist, shouldRender };
}