import React, {useEffect} from 'react';
import {Button, Image, message, Modal, Upload, UploadFile} from "antd";
import ajax from "../../../../ts/ajax.ts";
import {RcFile} from "antd/es/upload";

const ModalContent: React.FC<{
    id?: string;
    num?: number;
}> = ({id}) => {
    const getFileList = async (): Promise<UploadFile[]> => {
        if (id === undefined) {
            return [];
        }

        const list = await fetch(ajax.SERVER_URL + '/api/desc/list?id=' + id, {
            method: 'GET',
        }).then((response) => response.json()).then((data) => {
            if (data.status === '200') {
                return data.data;
            } else {
                message.error(data.message);
                return 0;
            }
        }).catch((error) => {
            console.log(error);
        });

        const fileList: UploadFile[] = [];
        for (let i = 0; i < list.length; i++) {
            fileList.push({
                uid: list[i],
                name: 'image',
                status: 'done',
                url: ajax.SERVER_URL + '/img/desc?id=' + id + '&index=' + list[i],
            });
            // console.log(fileList)
        }
        return fileList;
    }
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    useEffect(() => {
        getFileList().then((fileList) => {
            setFileList([...fileList]);
        });
    }, []);

    const removeDescImg = (index: number, ix: number) => {
        fileList[index].status = 'removed';

        fetch(ajax.SERVER_URL + '/api/desc/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('e-shop-usertoken'),
                id: id,
                index: ix,
            }),
        }).then((response) => {
            if (response.status === 200) {
                message.success('删除成功');
                getFileList().then(setFileList);
            } else {
                message.error('删除失败: ' + response.status + ' ' + response.statusText);
                fileList[index].status = 'done';
            }
        }).catch((error) => {
            message.error(error.message);
        })
    }
    const uploadDescImg = (file: string | Blob | RcFile) => {
        const formData = new FormData();
        if (typeof file === 'string') {
            message.error('文件类型错误');
            return;
        }
        formData.append('pic', file);
        formData.append('id', id as string);
        formData.append('index', fileList.length.toString());

        fetch(ajax.SERVER_URL + '/api/desc/upload', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json();
        }).then(async (data) => {
            if (data.status !== '200') {
                message.error(data.message);
            } else {
                message.success('上传成功');
                getFileList().then(setFileList);
            }
        }).catch((error) => {
            message.error(error.message);
        });
    }

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onRemove={(file) => {
                    const index = fileList.indexOf(file);
                    const ix = fileList[index].url?.split('index=')[1];
                    removeDescImg(index, parseInt(ix ?? 'undefined'));
                }}

                onPreview={(file) => {
                    Modal.info({
                        title: null,
                        content: (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image
                                    width={200}
                                    src={ajax.SERVER_URL + '/img/desc?id=' + id + '&index=' + fileList.indexOf(file)
                                    }/>
                            </div>
                        ),
                        icon: null,
                        okText: '确定',
                    });
                }
                }
                customRequest={({file}) => {
                    uploadDescImg(file);
                }}
            >
                {'+ Upload'}
            </Upload>
        </>
    );
}


export const DescImgList: React.FC<{
    value?: { id: string; num: number; };
    onChange?: (value: { id: string; num: number; }) => void;
}> = ({value}) => {
    return (
        <Button type="primary" onClick={() => {
            // Show modal
            Modal.info({
                title: '商品详情编辑',
                content: (
                    <ModalContent id={value?.id} num={value?.num}/>
                ),
                icon: null,
                okText: '确定',
            });
        }}>编辑</Button>
    );
}