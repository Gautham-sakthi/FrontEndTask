import API from './config';

const getTracks = () => {
    return API({
        method: 'GET',
        url: '/tracks',
    }, true);
};


const getTrackDetail = (id) => {
    console.log('add')
    return API({
        method: 'GET',
        url: `/tracks/${id}`,
    }, true);
};

const updateTrack = (id, data) => {
    return API({
        method: 'PATCH',
        url: `/tracks/update/${id}`,
        data:{
            title: data.title,
            length : data.length,
            artist: data.artist
        }
    })
}

const createTrack = (data)=>{
    return API({
        method: 'POST',
        url: `/tracks/add/`,
        data:{
            title: data.title,
            length : data.length,
            artist: data.artist
        }
    })
}

const removeTrack = (id)=>{
    return API({
        method: 'DELETE',
        url: `/tracks/delete/${id}`,
    })
}

export const trackService = { getTracks, getTrackDetail, updateTrack, removeTrack, createTrack };