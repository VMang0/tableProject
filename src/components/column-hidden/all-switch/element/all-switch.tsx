import { forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import { Switch } from '@mui/material';

type AllSwitchProps = {
    indeterminate: boolean
}

export const AllSwitch = forwardRef<HTMLInputElement, AllSwitchProps>(
    ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        if (resolvedRef && 'current' in resolvedRef) {
            (resolvedRef as MutableRefObject<HTMLInputElement>).current.indeterminate = indeterminate;
        }
    }, [resolvedRef, indeterminate]);

    return (
        <Switch ref={resolvedRef} {...rest}  />
    );
});