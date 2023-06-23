import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ajax from '../ts/ajax';
import RecommendList from '../Components/MainPage/RecommendList';
import SearchBar from '../Components/SearchBar';
import styled from 'styled-components';

const SearchPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > :nth-child(2) {
        margin-top: 100px;
    }
`

export default function SearchPage() {
    const [searchPramas] = useSearchParams();
    const keyword = searchPramas.get("keyword") || "null";
    const [list, setList] = useState<{
        id: number,
        name: string,
        price: number,
        cover: string,
    }[]>([]);

    useEffect(() => {
        ajax.search(keyword,20).then(setList);
    },[])

    return (
        <SearchPageStyled>
            <SearchBar onSearch={keyword=>location.href = `/search?keyword=${keyword}`}/>
            <RecommendList title='搜索结果' listData={list}/>
        </SearchPageStyled>
    )
}
