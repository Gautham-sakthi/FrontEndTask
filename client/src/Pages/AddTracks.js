import React from 'react';
import TrackForm from '../Forms/trackForm';
import { trackService } from '../Services/tracks';

function AddTracks() {
    return (
        <div>
            <TrackForm title="Add Track"/>
        </div>
    )
}

export default AddTracks
