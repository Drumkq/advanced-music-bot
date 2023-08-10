import React from 'react';
import { Widget } from './Widget';

interface GuildWidget {
    classes?: string
}

export function GuildsWidget({ classes }: GuildWidget) {
    return (
        <Widget classes={classes} label='GUILDS'>
            { /* GUILD INFO */ }
            <div className='flex items-center gap-5'>
                <img className='w-[50px] h-[50px] bg-white rounded-full'/>
                <span>Топовая нычка</span>
            </div>
        </Widget>
    );
}