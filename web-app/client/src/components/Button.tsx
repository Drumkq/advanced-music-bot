import React, { HTMLAttributes } from 'react';

export function Button({children}: HTMLAttributes<HTMLElement>) {
    return (
        <button className='transition-all hover:bg-hovered-primary active:bg-active-primary rounded-full px-8 py-4 font-bold text-white border-primary border-2 flex items-center'>
            { children }
        </button>
    );
}