/* @flow */

/**
 *    Module dependencies
 */

import React, { Component, Fragment } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import styled, { css } from '@emotion/native';
import { withSliderContext } from '../context/SliderContext';
import { SlideType, SliderProps } from '../type';

type OwnProps = SliderProps & {
    setCurrentIndex: Function,
    currentIndex: number,
    setNextIndex: Function,
    nextIndex: number,
};

type State = {
    translate: any,
};

const getWindowWidth = () => Dimensions.get('window').width;
const getAnimatedStyle = (
    slideCount: number,
    width: number,
    slideIndex: number,
    translate: number,
) => ({
    flex: 1,
    flexDirection: 'row',
    width: slideCount * width,
    left: slideIndex * -1 * width,
    transform: [
        {
            translateX: translate,
        },
    ],
});

class Slider extends Component<OwnProps, State> {
    state = {
        translate: new Animated.Value(0),
    };

    shouldComponentUpdate(nextProps: OwnProps) {
        return this.props.nextIndex === nextProps.nextIndex;
    }

    setValueForAnimatedSpring = (
        currentIndex: number,
        destIndex: number,
    ): number => this.width * (currentIndex - destIndex);

    slideCount: number = this.props.slides.length;
    delayFactor: number = this.props.delayFactor;
    triggeringThreshold: number = this.props.triggeringThreshold;
    width: number = getWindowWidth();

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) =>
            Math.abs(gestureState.dx) > 7,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderMove: (evt, gestureState) => {
            Animated.event([null, { dx: this.state.translate }])(
                evt,
                gestureState,
            );
        },
        onPanResponderRelease: (evt, gestureState) => {
            this.endGesture(evt, gestureState);
        },
        onPanResponderTerminate: () => {},
        onShouldBlockNativeReponser: () => true,
    });

    endGesture = (evt: any, gestureState: any) => {
        const { currentIndex } = this.props;
        const { dx } = gestureState;

        const userIsSwipingLeft = dx < 0;
        const destIndex = userIsSwipingLeft
            ? currentIndex + 1
            : currentIndex - 1;

        this.requestSlideIndex(currentIndex, destIndex);
    };

    requestSlideIndex = (currentIndex: number, destIndex: number) => {
        if (destIndex > this.slideCount - 1) {
            this.animate(
                this.slideCount - 1,
                this.setValueForAnimatedSpring(
                    currentIndex,
                    this.slideCount - 1,
                ),
            );
        } else if (destIndex < 0) {
            this.animate(0, this.setValueForAnimatedSpring(currentIndex, 0));
        } else {
            this.props.setNextIndex(destIndex);
            this.animate(
                destIndex,
                this.setValueForAnimatedSpring(currentIndex, destIndex),
            );
        }
    };

    animate = (destIndex: number, toValue: number) => {
        const { translate } = this.state;
        const config = {
            toValue,
            overshootClamping: true,
            useNativeDriver: true,
        };

        Animated.spring(translate, config).start(() => {
            this.state.translate.setValue(0);
            this.props.setCurrentIndex(destIndex);
        });
    };

    translateX = (animation: any) => ({
        transform: [
            {
                translateX: animation,
            },
        ],
    });

    translateDelayedContent = (index: number, factor: number) => {
        const { translate } = this.state;
        const { currentIndex } = this.props;

        return this.translateX(
            Animated.divide(
                Animated.add(translate, this.width * (index - currentIndex)),
                factor,
            ),
        );
    };

    renderOneSlide = (slide: SlideType, index: number) => (
        <Fragment>
            <Content width={this.width}>
                {this.props.renderContent(slide.content)}
            </Content>
            <Animated.View
                style={[
                    { flex: 1 },
                    this.translateDelayedContent(index, this.delayFactor),
                ]}
            >
                <DelayedContent>
                    {this.props.renderDelayedContent(slide.delayedContent)}
                </DelayedContent>
            </Animated.View>
        </Fragment>
    );

    renderAllSlides = (slides: Array<SlideType>): any =>
        slides.map(
            (slide: SlideType, index: number): any => {
                const key = `${index}_${new Date().getTime()}`;
                return (
                    <Slide key={key} width={this.width}>
                        {this.renderOneSlide(slide, index)}
                    </Slide>
                );
            },
        );

    render() {
        const { slides } = this.props;
        const { translate } = this.state;
        const { currentIndex, nextIndex } = this.props;
        const style = getAnimatedStyle(
            this.slideCount,
            this.width,
            currentIndex,
            translate,
        );

        return (
            <SliderStyled width={this.width}>
                <Animated.View {...this.panResponder.panHandlers} style={style}>
                    {this.renderAllSlides(slides)}
                </Animated.View>
                {this.props.children &&
                    this.props.children(
                        this.slideCount,
                        currentIndex,
                        nextIndex,
                        this.requestSlideIndex,
                    )}
            </SliderStyled>
        );
    }
}

const FillViewport = () => css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`;

const DelayedContent = styled.View`
    flex: 1;
`;

const Content = styled.View`
    ${FillViewport};
`;

const Slide = styled.View`
    width: ${(props) => props.width};
`;

const SliderStyled = styled.View`
    flex: 1;
    width: ${(props) => props.width};
`;

export default withSliderContext(Slider);
