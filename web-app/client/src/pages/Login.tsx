import React from 'react';
import { Button } from '../components/Button';
import linkIcon from '../assets/link.png';

export function LoginPage () {
    return (
        <>
            <div className='bg-bacground w-full h-screen flex flex-col items-center justify-center'>
                <header className='p-0 m-0 text-primary text-9xl font-bold self-center'>VSIXA</header>
                <span className='text-4xl font-bold text-white mb-6'>LOGGING IN</span>
                <Button><img src={linkIcon}/>LOG IN USING DISCORD</Button>
            </div>
        </>
    );
}