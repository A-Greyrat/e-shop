import React from "react";
import {Input, message, Space} from "antd";
import ajax from "../../../../ts/ajax.ts";

export const Cover: React.FC<{
    value?: string;
}> = ({value}) => {
    const uploadCover = (file: ArrayBuffer, id: string) => {
        const formData = new FormData();
        const blob = new Blob([file]);
        formData.append('pic', blob);
        formData.append('id', id);

        fetch(ajax.serverUrl + '/api/upload/cover', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status !== '200') {
                message.error(data.message);
            }
        }).catch((error) => {
            message.error(error.message);
        });

    }
    const [inputValue, setInputValue] = React.useState<ArrayBuffer>();
    const handleInputConfirm = () => {
        if (inputValue) {
            if (value) {
                const id = value.split('=')[1];
                uploadCover(inputValue, id);
            }
        }
    }


    return (
        <Space>
            <Input
                type="file"
                size="small"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            setInputValue(reader.result as ArrayBuffer);
                        };
                        reader.readAsArrayBuffer(file);
                    }
                }}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />

        </Space>
    );

}