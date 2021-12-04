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
| interval       | number                                    | 1000          | no       | The interval (in milliseconds) at which the calling component should re-render.                                                                                                                                                                                                                                                                        |
| predicate      | `boolean \| ((count: number) => boolean)` |               | no       | This is an optional predicate parameter, you can either pass in a boolean everytime or you may pass in a function that accepts a count number and returns a boolean.  The boolean that you pass, or the boolean that is returned from your predicate function determines in the interval will continue to exist, or should the interval be cleaned up. |

### Return Type

The hook returns a `number` called count. This is the number of times, the component has been re-rendered due to
this hook.

## Usage

### Re-render every second, forever

```JavaScript
import useRenderInterval from 'use-render-interval';

export default function Forever() {
    const count = useRenderInterval();
    return <p>This will re-render every second, forever. [{count}]</p>;
}
```

### If you hate default vales

```JavaScript
import useRenderInterval from 'use-render-interval';

export default function Forever() {
    const count = useRenderInterval(1000);
    return <p>This will re-render every second, forever. [{count}]</p>;
}
```


### Re-render every second, for 30 seconds after first render

```JavaScript
import useRenderInterval from 'use-render-interval';

export default function JustTenTimes() {
    const limit = useRef(Date.now() + 30*1000);

    // Note: We didn't use a predicate function, because re-rendering
    //       runs the entire component function.
    const count = useRenderInterval(1000, Date.now() <= limit.current);
    return <p>This will re-render every second, 30 seconds after first render. [{count}]</p>;
}
```



### Re-render every 2 seconds, 10 times.

```JavaScript
import useRenderInterval from 'use-render-interval';

export default function JustTenTimes() {
    // Note: it says less than 10, because the 10th time the interval logic is
    //       executed, the interval counter is still 9. (Ala for loops)
    const count = useRenderInterval(2000, count => count < 10);

    return <p>This will re-render every 2 seconds, 10 times. [{count}]</p>;
}
```

