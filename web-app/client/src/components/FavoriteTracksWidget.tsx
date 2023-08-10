import React from 'react';
import { Widget } from './Widget';
import { Track } from './Track';

interface FavoriteTracksWidget {
    classes?: string
}

export function FavoriteTracksWidget({ classes }: FavoriteTracksWidget) {
    return (
        <Widget classes={classes} label='FAVORITE TRACKS'>
              <Track></Track>
        </Widget>
    );
}