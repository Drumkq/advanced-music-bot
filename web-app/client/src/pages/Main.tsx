import React from 'react';
import { Button } from '../components/Button';

export function MainPage () {
    return (
        <>
            <div className='bg-bacground w-full h-screen flex flex-col items-center justify-center'>
                <header className='text-primary text-9xl font-bold self-center my-6'>VSIXA</header>
                <Button>OPEN DASHBOARD</Button>
            </div>
        </>
    );
}