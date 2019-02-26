import React, { createContext } from 'react';

const SliderContext = createContext({
    currentIndex: null,
    nextIndex: null,
    setCurrentIndex: () => {},
    setNextIndex: () => {},
    slideCount: null,
});

export function withSliderContext(Component: any) {
    return function SliderComponent(props: any) {
        return (
            <SliderContext.Consumer>
                {({
                    currentIndex,
                    nextIndex,
                    setCurrentIndex,
                    setNextIndex,
                    slideCount,
                }) => (
                    <Component
                        {...props}
                        slideCount={slideCount}
                        currentIndex={currentIndex}
                        nextIndex={nextIndex}
                        setCurrentIndex={setCurrentIndex}
                        setNextIndex={setNextIndex}
                    />
                )}
            </SliderContext.Consumer>
        );
    };
}

export default SliderContext;
