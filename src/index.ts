import { useState, useEffect, useRef } from 'react';

export default function useRerenderInterval(interval: number = 1000, predicate?: boolean | ((count: number) => boolean)) {
    const intervalRef = useRef<any>(false);
    const [count, setCount] = useState<number>(0);

    const standardPredicate =
        predicate === true || predicate === false
            ? predicate
            : predicate instanceof Function
                ? predicate(count)
                : true;

    useEffect(() => {
        if (standardPredicate) {
            intervalRef.current = setInterval(() => {
                setCount(pulse => pulse + 1);
            }, interval);
        }

        return () => {
            if (!!intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [standardPredicate, setCount]);

    return count;
}
