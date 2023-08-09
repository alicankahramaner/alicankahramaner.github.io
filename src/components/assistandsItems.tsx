import React from 'react';
import styled from 'styled-components';

interface AssistandsItemsProps {
    data: {
        image: string;
        title: string;
    }[]
}

const AssistandWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    position: absolute;
    bottom:-20px;
    width: calc(100% - 185px - 185px);
    left: 185px;
    
`

const Assistand = styled.div`
    width: 44px;
    height:44px;
    border-radius:100%;
    background-color: ${props => props.theme.colors.darkBlue};
    padding:10px;
    margin: 0px 10px;
    img{
        width: 100%;
    }
`

export const AssistandsItems: React.FC<AssistandsItemsProps> = props => {
    return (
        <AssistandWrapper>
            {props.data.map(item => <Assistand><img src={item.image} alt={item.title} /></Assistand>)}
        </AssistandWrapper>
    )
}