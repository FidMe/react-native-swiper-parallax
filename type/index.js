export type SlideType = {
    content: any,
    delayedContent: any,
};

export type SliderProps = {
    slides: Array<SlideType>,
    renderContent: Function,
    renderDelayedContent: Function,
    delayFactor: number,
    triggeringThreshold: number,
    children: (
        slideCount: number,
        currentIndex: number,
        nextIndex: number,
        requestSlideIndex: Function,
    ) => any,
};
