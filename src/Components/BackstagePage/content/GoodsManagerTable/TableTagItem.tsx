import React, {useRef, useState} from "react";
import {Input, Space, Tag} from "antd";

export const TagList: React.FC<{
    value?: {
        key: string;
        label: string;
    }[];
    onChange?: (
        value: {
            key: string;
            label: string;
        }[],
    ) => void;
}> = ({value, onChange}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ref = useRef<Input | null>(null);
    const [newTags, setNewTags] = useState<
        {
            key: string;
            label: string;
        }[]
    >([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        let tempsTags = [...(value || [])];
        if (
            inputValue &&
            tempsTags.filter((tag) => tag.label === inputValue).length === 0
        ) {
            tempsTags = [
                ...tempsTags,
                {key: `new-${tempsTags.length}`, label: inputValue},
            ];
        }
        onChange?.(tempsTags);
        setNewTags([]);
        setInputValue('');
    };

    return (
        <Space>
            {(value || []).concat(newTags).map((item) => (
                <Tag key={item.key} closable={true} onClose={
                    () => {
                        onChange?.(value?.filter((tag) => tag.key !== item.key) || []);
                    }
                }> {item.label} </Tag>
            ))}
            <Input
                ref={ref}
                type="text"
                size="small"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}

            />
        </Space>
    );
};