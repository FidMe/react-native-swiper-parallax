/* @flow */

/**
 *    Module dependencies
 */

import React, { Component } from 'react';
import SliderContext from './SliderContext';

type Props = { slideCount: number };
type State = {
    currentIndex: number,
    nextIndex: number,
    setCurrentIndex: Function,
    setNextIndex: Function,
    slideCount: number,
};

class SliderProvider extends Component<Props, State> {
    state = {
        currentIndex: 0,
        nextIndex: 0,
        setCurrentIndex: (index) => this.setState({ currentIndex: index }),
        setNextIndex: (index) => this.setState({ nextIndex: index }),
        slideCount: this.props.slideCount,
    };

    render() {
        return (
            <SliderContext.Provider value={this.state}>
                {this.props.children}
            </SliderContext.Provider>
        );
    }
}

export default SliderProvider;
