import React from "react";
import {Button, Image, Modal} from "antd";
import ajax from "../../../../ts/ajax.ts";


export const DescImgListPrev: React.FC<{
    id: string;
    num: number;
}> = ({id, num}) => {
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
                            Array.from(Array(num).keys()).map((_, index) => {
                                return <Image
                                    key={index}
                                    width={200}
                                    src={ajax.SERVER_URL + '/img/desc?id=' + id + '&index=' + index}
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