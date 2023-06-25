import React, {useEffect, useState} from "react";
import {Button, Image, Modal} from "antd";
import ajax from "../../../../ts/ajax.ts";


export const DescImgListPrev: React.FC<{
    id: string;
    num: number;
}> = ({id}) => {
    const [fileList, setFileList] = useState<number[]>([]);
    useEffect(() => {
        fetch(ajax.SERVER_URL + '/api/desc/list?id=' + id, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => {
            if (data.status === '200') {
                // console.log(data.data)
                setFileList(data.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <Button type="primary" onClick={() => {
            // modal
            Modal.info({
                title: '商品详情预览',
                content: (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}>
                        {
                            fileList.map((value, index) => {
                                return <Image
                                    key={index}
                                    width={200}
                                    src={ajax.SERVER_URL + '/img/desc?id=' + id + '&index=' + value}
                                />
                            })
                        }
                    </div>
                ),
                icon: null,
                okText: '确定',
            });
        }}
        >预览</Button>


    );
}