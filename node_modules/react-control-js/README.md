
# ControlJS

ControlJS is a react library allowing you to create animations on components with possibility to trigger them on scroll.


## Installation

Install ControlJS with npm

```bash
  npm install react-control-js
```
    
## Usage/Examples

```javascript
import Control from 'react-control-js'

function App() {
  return <Control element={<p>Hello World!</p>} x={20} onScroll={true} />
}
```

## API Reference

### element
Passed as a property to the Control component. Defines element that would be rendered to the DOM and controlled with animations.
```javascript
  <Control element={<div>Hello World</div>} />
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `element` | `JSX.Element` | **Required**. Animated element. |

### duration

Defines duration of the animation. Takes a number value which is compiled to ms units.

```javascript
  <Control element={<div>Hello World</div>} duration={200} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `duration`      | `number` | *Optional.* Duration of the animation. |

### delay

Defines delay of the animation. Takes a number value which is compiled to ms units.

```javascript
  <Control element={<div>Hello World</div>} delay={200} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `delay`      | `number` | *Optional.* Delay of the animation. |

### ease

Provides easing for animation and has a default value of `cubic-bezier(0, 0, 1, 1)`. You can pass it four values: `ease`, `ease-in`, `ease-out`, `ease-in-out`.

```javascript
  <Control element={<div>Hello World</div>} ease='ease-out' />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ease`      | `string` | *Optional.* Easing of the animation. |

### opacity
Used to animate opacity, if it exists on Control component it will transition element's opacity from the value of 0 to the one passed in the property. 

```javascript
  <Control element={<div>Hello World</div>} opacity={0.42} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `opacity`      | `number` | *Optional.* Opacity element would be transformed to. |

### x, y

X and y are properties passed to the Control component which define the position that controlled element would be transformed to relative  to its position in DOM.

You can either pass a number which will work as px unit or a string if you'd need something like percentage value.


```javascript
  <Control element={<div>Hello World</div>} x={-10} />
```
```javascript
  <Control element={<div>Hello World</div>} x={20} y={'40%'} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x, y`      | `number / string` | *Optional.* Translating element. |

### rotate

Rotate defines if controlled element should be rotated. You can pass it a number which will act as a deg unit.


```javascript
  <Control element={<div>Hello World</div>} rotate={90} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `rotate`      | `number` | *Optional.* Rotation of the element. |

### backgroundColor

Changes background color of animated element.


```javascript
  <Control element={<div>Hello World</div>} backgroundColor={'blue'} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `backgroundColor`      | `string` | *Optional.* Background of the element. |

### color

Changes text color of animated element.

```javascript
  <Control element={<div>Hello World</div>} color='blue' />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `color`      | `string` | *Optional.* Text color of the element. |

### onScroll

Boolean value which tells Control if the animation should occur as animated component enters the viewport or directly after its render.


```javascript
  <Control element={<div>Hello World</div>} onScroll={true} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `onScroll`      | `boolean` | *Optional.* Enter viewport animation. |

### viewPort

Related to onScroll, passed as a number which defines at what point of viewport, which element enters, should the animation occur.


```javascript
  <Control element={<div>Hello World</div>} onScroll={true} viewPort={0.4} />
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `onScroll`      | `boolean` | *Optional.* Enter viewport animation. |

## Controller
You have an access to Controller component which can wrap multiple Control components giving each of them passed properties.
For example you  can provide onScroll property only once with respect to all components.
Notice you can pass other viewPort values to each of wrapped components and every of them would respect its own value.

Using Controller is recommended if you'd like to perform actions on a group of elements.


```javascript
  import Control, { Controller } from 'react-control-js'

  function App() {
      return (
          <Controller>
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.2} />
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.6} />
          </Controller>
      )
  }
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Controller`      | `Component` | Perform actions on multiple elements |

### className

You can pass className property to Controller component which acts exactly as normal className React property.

```javascript
  import Control, { Controller } from 'react-control-js'

  function App() {
      return (
          <Controller className="flex flex-col">
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.2} />
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.6} />
          </Controller>
      )
  }
```
### stagger

Stagger is a property for Controller component which defines delay for every component in a group.
For example if you pass it a value of 100, each subsequent component will start its animation every 100ms.

```javascript
  import Control, { Controller } from 'react-control-js'

  function App() {
      return (
          <Controller stagger={100}>
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.2} />
            <Control element={<p>Hello World!</p>} opacity={1} viewPort={0.6} />
          </Controller>
      )
  }
```
### Possible Properties

You can pass every property that Control component has available except `element` to the Controller component and it will spread it around all Controls in a wrapped group.

```javascript
  import Control, { Controller } from 'react-control-js'

  function App() {
      return (
          <Controller x={20} y={'-40%'} opacity={1} rotate={180} stagger={300}>
            <Control element={<p>Hello World!</p>} />
            <Control element={<p>Hello World!</p>} />
          </Controller>
      )
  }
```
## Issues

If you'd like to position controlled element absolutely,
don't put that style on the element but rather wrap
the whole Control component in a div and put the style on it.

```javascript

function WrongAbsolute() {
  return <Control element={<p style={{ position: absolute }}>Hello World!</p>} />
}

function GoodAbsolute() {
  return (
      <div style={{ position: absolute }}>
        <Control element={<p>Hello World!</p>} />
      </div>
  )
}
```
