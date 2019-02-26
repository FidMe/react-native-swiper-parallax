/* @flow */

/**
 *    Module dependencies
 */

import React, { Component } from 'react';
import styled from '@emotion/native';
import SliderContext from '../context/SliderContext';

type SwiperPagingProps = {
    slideCount: number,
    currentControlColor: string,
    defaultControlColor: string,
};

class Paging extends Component<SwiperPagingProps> {
    renderPagingControl = (count: number, current: number): any => {
        const { currentControlColor, defaultControlColor } = this.props;
        const pagingControls = [];
        for (let i = 0; i < count; i += 1) {
            const color =
                i === current ? currentControlColor : defaultControlColor;
            const size = i === current ? 8 : 6;
            pagingControls.push(
                <PagingControl
                    key={i}
                    color={color}
                    width={size}
                    height={size}
                />,
            );
        }
        return pagingControls;
    };
    render() {
        const { slideCount } = this.props;
        return (
            <SliderContext.Consumer>
                {(value) => (
                    <SwiperPagingStyled>
                        {this.renderPagingControl(slideCount, value.nextIndex)}
                    </SwiperPagingStyled>
                )}
            </SliderContext.Consumer>
        );
    }
}

const PagingControl = styled.View`
    margin: 8px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.color};
    border-radius: 6px;
`;

const SwiperPagingStyled = styled.View`
    align-self: center;
    align-items: center;
    flex-direction: row;
`;

export default Paging;
