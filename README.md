# Swiper parallax

_react-native-swiper-parallax_ is a swiper component for React Native featuring paging and an optional parallax effect. Compatible with Android & iOS.

![](swiper.gif)

## Getting started

```bash
npm install react-native-swiper-parallax --save
```

## Usage

Content and delayed content are being passed as _render props_.

```javascript
import Slider from 'react-native-swiper-parallax';

class MyComponent extends Component {
  renderContent = content => {
    return (
      <Content>
        <Text>content</Text>
      </Content>
    );
  };

  renderDelayedContent = content => {
    return (
      <DelayedContent>
        <Text>{content.title}</Text>
      </DelayedContent>
    );
  };

  render() {
    return (
      <Slider
        slides={slides}
        renderContent={this.renderContent}
        renderDelayedContent={this.renderDelayedContent}
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

## In depth

The `Slider` component is using React context api. It has a provider and every child which uses the HOC `withSliderContext` has access to the Slider store which is shown below.

```javascript
const SliderContext = createContext({
  currentIndex: null,
  nextIndex: null,
  setCurrentIndex: () => {},
  setNextIndex: () => {},
  slideCount: null,
});
```

The `Slider` itself is inside the provider and has therefore access to an action which sets the next index before the animation is triggered. The `Paging` component while being connected to the `Slider` store is aware of any index change in real time. `Slider` has a `shouldComponentUpdate` method which prevents the component from re rendering when the `nextIndex` is set:

```javascript
shouldComponentUpdate(nextProps: OwnProps) {
		return this.props.nextIndex === nextProps.nextIndex;
}
```

## Props

| Props                |           Params           | Returns | Description                                           |
| :------------------- | :------------------------: | :-----: | :---------------------------------------------------- |
| slides               | `content` `delayedContent` |  none   | Array of slides with a content and a delayed content  |
| renderContent        |         `content`          |  `jsx`  | Render all slides main content                        |
| renderDelayedContent |         `content`          |  `jsx`  | Render all slides delayed content for parallax effect |
| delayFactor          |            none            |  none   | Number to delay the sliding animation                 |

## OwnProps (withSliderContext HOC)

| OwnProps        | Params  | Returns | Description                                     |
| :-------------- | :-----: | :-----: | :---------------------------------------------- |
| currentIndex    |  none   |  none   | Slider current index                            |
| nextIndex       |  none   |  none   | Slider next index before animation is triggered |
| setCurrentIndex | `index` |  none   | Set current index                               |
| setNextIndex    | `index` |  none   | Set next index                                  |
| slideCount      |  none   |  none   | Number of slides                                |
