/* @flow */

/**
 *    Module dependencies
 */

import React, { Component } from 'react';
import SliderRoot from './components/Slider';
import SliderProvider from './context/SliderProvider';
import {withSliderContext} from './context/SliderContext';

import { SliderProps } from './type';

class Slider extends Component<SliderProps> {
    render() {
        return (
            <SliderProvider slideCount={this.props.slides.length}>
                <SliderRoot {...this.props} />
            </SliderProvider>
        );
    }
}

export {withSliderContext}
export default Slider;
