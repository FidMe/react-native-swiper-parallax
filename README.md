# react-native-swiper-parallax

react-native-swiper-parallax is a swiper component for React Native featuring paging and parallax effect. Compatible with Android & iOS

## Getting started

`$ npm install react-native-swiper-parallax --save`

## Usage

```javascript
import Slider from 'react-native-swiper-parallax';

class MyComponent extends Component {
  render() {
    return (
      <Slider
        slides={slides}
        renderContent={this.renderSwiperContent}
        renderDelayedContent={this.renderSwiperDelayedContent}
        delayFactor={0.3}
        triggeringThreshold={0}>
        {(slideCount, currentIndex, nextIndex, requestSlideIndex) => (
          <Fragment>
            <PagingContainer>
              <Paging
                slideCount={slideCount}
                currentSlideIndex={currentIndex}
                currentControlColor={colors.mainOrange}
                defaultControlColor="rgba(46, 43, 43, 0.25)"
              />
            </PagingContainer>

            <BottomBar
              swipe={() => requestSlideIndex(currentIndex, currentIndex + 1)}
            />
          </Fragment>
        )}
      </Slider>
    );
  }
}
```

## Methods

| Prop                 |           Params           | Returns | Description                                           |
| :------------------- | :------------------------: | :-----: | :---------------------------------------------------- |
| slides               | `content` `delayedContent` |  none   | Array of slides with a content and a delayed content  |
| renderContent        |         `content`          |  `jsx`  | Render all slides main content                        |
| renderDelayedContent |         `content`          |  `jsx`  | Render all slides delayed content for parallax effect |
| delayFactor          |            none            |  null   | Number to delay the sliding animation                 |
