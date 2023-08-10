import React from 'react';
import { Button } from '../components/Button';
import { GuildsWidget } from '../components/GuildsWidget';
import { FavoriteTracksWidget } from '../components/FavoriteTracksWidget';
import { QueueWidget } from '../components/QueueWidget';
import LinkIcon from '../assets/link.png';

export function DashboardPage () {
    return (
        <>
            <div className='bg-bacground w-full h-screen flex'>
                { /* MENU */ }
                <div className='bg-darker-background h-full w-fit flex flex-col justify-between'>
                    <div className='flex flex-col items-center gap-5'>
                        <header className='px-16 py-8 m-0 text-primary text-6xl font-bold'>VSIXA</header>
                        <Button>AUDIO PLAYER</Button>
                        <Button>PERMISSIONS</Button>
                    </div>
                    <div className='flex flex-col items-center mb-8'>
                        <Button><img src={LinkIcon}/> INVITE</Button>
                    </div>
                </div>
                <div className='m-10 gap-10 grid grid-rows-2 w-full grid-flow-col'>
                    <GuildsWidget classes='row-span-3'/>
                    <FavoriteTracksWidget classes='col-span-2'></FavoriteTracksWidget>
                    <QueueWidget classes='col-span-2'></QueueWidget>
                </div>
            </div>
        </>
    );
}