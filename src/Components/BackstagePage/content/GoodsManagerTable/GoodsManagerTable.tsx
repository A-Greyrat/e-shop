import type {ProColumns} from '@ant-design/pro-components';
import {EditableProTable, ProFormRadio,} from '@ant-design/pro-components';
import React, {useState} from 'react';
import ajax from "../../../../ts/ajax.ts";
import {TagList} from "./TableTagItem.tsx";
import {Image, message, Modal, Tag} from "antd";
import {Cover} from "./TableCoverItem.tsx";
import {DescImgList} from "./TableDescImgItem.tsx";
import {DescImgListPrev} from "./TableDescImgPrev.tsx";

type DataSourceType = {
    id: string;
    name: string;
    price: number;
    stock: number;
    cover: string;
    tags: { key: number, label: string }[];
    desc: { id: string, num: number };
};

export default () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
    const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
        'bottom',
    );

    const handleRemove = async (id: string) => {
        const hide = message.loading('正在删除');
        try {
            await fetch(ajax.SERVER_URL + '/business/deleteGoods?id=' + id + '&token=' + encodeURIComponent(localStorage.getItem("e-shop-usertoken") || ""), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json()).then((data) => {
                if (data.status !== '200') {
                    throw new Error(data.message);
                }
            });

            hide();
            message.success('删除成功，即将刷新');
            return true;
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
            return false;
        }
    }
    const getGoodsTable = async () =>
        fetch(ajax.SERVER_URL + '/business/goodsTable?token=' +
            encodeURIComponent(localStorage.getItem("e-shop-usertoken") || ""), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((data) => {
            if (data.status !== '200') {
                message.error(data.message);
            }
            const res: DataSourceType[] = [];
            data.data.data.forEach((item: any) => {
                res.push({
                    id: item.gid,
                    name: item.name,
                    price: item.price,
                    stock: item.cnt,
                    cover: ajax.SERVER_URL + '/img/cover?id=' + item.gid,
                    //服饰内衣;内衣;休闲棉袜
                    tags: item.tags.split(';').map((item: string, index: number) => {
                        return {key: index, label: item}
                    }),
                    desc: {id: item.gid, num: item.descCnt},
                });
            });

            return res;
        });

    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '商品名称',
            dataIndex: 'name',
            width: 120,
            formItemProps: {
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            width: 120,
            valueType: 'money',
            formItemProps: {
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        },
        {
            title: '商品库存',
            dataIndex: 'stock',
            width: 120,
            valueType: 'digit',
            formItemProps: {
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        },
        {
            title: '商品封面',
            dataIndex: 'cover',
            width: 120,
            renderFormItem: () => <Cover/>,
            render: (_, row) =>
                (<div style={{width: 100, height: 100}}>
                    <Image width={100} height={100} src={row?.cover} placeholder/>
                </div>),
        },
        {
            title: '商品标签',
            dataIndex: 'tags',
            width: 120,
            renderFormItem: () => <TagList/>,
            render: (_, row) => row?.tags?.map((item) => <Tag key={item.key}>{item.label}</Tag>),

        },
        {
            title: '商品描述图',
            dataIndex: 'desc',
            width: 120,
            renderFormItem: () => <DescImgList/>,
            render: (_, row) => <DescImgListPrev id={row?.id} num={row?.desc?.num}/>,
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (_, record, __, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <a
                    key="delete"
                    onClick={() => {
                        Modal.confirm({
                            title: '删除商品',
                            content: '确定删除该商品吗？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: async () => {
                                await handleRemove(record.id);
                                setDataSource(dataSource.filter((item) => item.id !== record.id));
                                action?.reload();
                            },
                        });
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

    return (
        <>
            <EditableProTable<DataSourceType>
                rowKey="id"
                scroll={{
                    x: 960,
                }}
                title={() => (
                    <div style={{
                        width: '100%',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: 'red',
                        marginBottom: '10px'
                    }}>
                        注意：图片请在创建完商品后添加
                    </div>
                )}
                recordCreatorProps={
                    position !== 'hidden'
                        ? {
                            position: position as 'top',
                            record: () => ({id: (Math.random() * 1000000).toFixed(0)}),
                        }
                        : false
                }
                loading={false}
                toolBarRender={() => [
                    <ProFormRadio.Group
                        key="render"
                        fieldProps={{
                            value: position,
                            onChange: (e) => setPosition(e.target.value),
                        }}
                        options={[
                            {
                                label: '添加到顶部',
                                value: 'top',
                            },
                            {
                                label: '添加到底部',
                                value: 'bottom',
                            },
                            {
                                label: '隐藏',
                                value: 'hidden',
                            },
                        ]}
                    />,
                ]}
                columns={columns}
                request={async () => ({
                    data: await getGoodsTable(),
                    total: dataSource.length,
                    success: true,
                })}

                value={dataSource}
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(rowKey, data, row);
                        fetch(ajax.SERVER_URL + '/business/goodsTable/update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify({
                                token: localStorage.getItem("e-shop-usertoken") || "",
                                gid: data.id,
                                name: data.name,
                                price: data.price,
                                stock: data.stock,
                                tags: data.tags.map((item: any) => item.label).join(';'),
                            })
                        }).then((response) => response.json()).then((data) => {
                            if (data.status !== '200') {
                                message.error(data.message);
                            } else {
                                message.success('修改成功', .5);
                            }
                        }).then(async () => {
                            setDataSource(await getGoodsTable());
                        }).catch((e) => {
                            message.error(e);
                        });

                    }
                }}
            />

        </>
    );
};