import React, { HTMLAttributes } from 'react';

interface Widget extends HTMLAttributes<HTMLElement> {
    label: string,
    classes?: string
}

export function Widget({label, classes, children}: Widget) {
    return (
        <div className={`bg-darker-background rounded-xl p-4 text-white font-bold ${classes}`}>
            { /* WIDGET */ }
            { label }
            <div className='my-5'>
                {children}
            </div>
        </div>
    );
}