import API from './config';

const getAlbums = () => {
    return API({
        method: 'GET',
        url: '/albums',
    }, true);
};

const createAlbum = (data)=>{
    const tracks = [];
    tracks.push(data.tracks);
    const payload = {
        name : data.name,
        trackID: tracks
    }
    return API({
        method: 'POST',
        url: `/albums/add`,
        data: payload
    }, true);
}

const albumDetail = (id) => {
    return API({
        method: 'GET',
        url: `/albums/${id}`,
    }, true);
}

const addTracksToAlbums = (id, data) => {
    const tracks = [];
    tracks.push(data);
    const payload = {
        trackID: tracks
    }
    return API({
        method: 'PATCH',
        url: `/albums/addtracks/${id}`,
        data: payload
    })
}

const removeTracks = (id, trackID) => {
    return API({
        method: 'PATCH',
        url: `/albums/removetrack/${id}`,
        data: {
            trackID: trackID
        }
    }, true)
}

const deleteAlbum = (id)=>{
    return API({
        method: 'DELETE',
        url: `/albums/delete`,
        data: {
            albumID: id
        }
    }, true)
}

export const albumService = { getAlbums, addTracksToAlbums, removeTracks, albumDetail, createAlbum, deleteAlbum };