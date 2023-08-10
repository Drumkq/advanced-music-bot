import React from 'react';
import { Widget } from './Widget';

interface QueueWidget {
    classes?: string
}

export function QueueWidget({ classes }: QueueWidget) {
    return (
        <Widget classes={classes} label='QUEUE'>
                
        </Widget>
    );
}