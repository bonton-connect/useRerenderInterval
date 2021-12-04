# useRerenderInterval

Sometimes, however bad or _antipattern-y_ it feels. You jsut have to rerender a component
on an interval. This hook makes it easy to do it efficiently.

## Installation

```bash
npm install --save use-rerender-interval
```

or for yarn masterrace ...

```bash
yarn add use-rerender-interval
```

## API

### Parameters

| Parameter Name | Type                                      | Default Value | Required | Description                                                                                                                                                                                                                                                                                                                                            |
|----------------|-------------------------------------------|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| interval       | `number`                                    | 1000          | no       | The interval (in milliseconds) at which the calling component should re-render.                                                                                                                                                                                                                                                                        |
| predicate      | `boolean | Function` |               | no       | **Optional.** Pass true to enable interval, pass false to clear interval. Pass function that returns a boolean as a function of count (or any other external variable) |

### Return Type

The hook returns a `number` called count. This is the number of times, the component has been re-rendered due to
this hook.

## Examples

### Re-render Every Second; Forever.

```JavaScript
import useRenderInterval from 'use-render-interval';

export default function Forever() {
    const count = useRenderInterval();
    return <p>This will re-render every second, forever. [{count}]</p>;
}
```

### POV: You Hate Default Vales
> I get it, default values are less readable.

```JavaScript
export default function Forever() {
    const count = useRenderInterval(1000);
    return <p>{count}</p>;
}
```


### Re-render Every Second, For 30 Seconds

```JavaScript
export default function JustTenTimes() {
    const limit = useRef(Date.now() + 30*1000);

    // Note: We didn't use a predicate function, because re-rendering
    //       runs the entire component function.
    const count = useRenderInterval(1000, Date.now() <= limit.current);
    return <p>{count}</p>;
}
```



### Re-render Every 2 Seconds, 10 Times

```JavaScript
function JustTenTimes() {
    // Note: it says less than 10, because the 10th time the interval logic is
    //       executed, the interval counter is still 9. (Ala for loops)
    const count = useRenderInterval(2000, count => count < 10);
    return <p>{count}</p>;
}
```

