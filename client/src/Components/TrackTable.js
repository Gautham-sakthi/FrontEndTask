import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TrackForm from '../Forms/trackForm';
import { LoaderContext } from '../Provider/LoaderProvider';
import { trackService } from '../Services/tracks';
import '../Styles/table.css';


const Tracks = () => {
    //spinner
    const { setLoader } = useContext(LoaderContext);
    //all tracks 
    const [tracks, setTracks] = useState({});
    //specific track
    const [trackDetail, setDetail] = useState({});
    //helper variable for modal
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    //use effect dependency
    const [change, setChange] = useState(false);

    const removeTrack = async (id) => {
        try {
            setLoader(true);
            const result = await trackService.removeTrack(id);
            if (result) {
                toast.success(result.message)
                setChange(prev => !prev)
                setLoader(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditClose = () => {
        setShowEdit(false);
    }

    const handleEditShow = async (id) => {
        try {
            setLoader(true);
            const result = await trackService.getTrackDetail(id);
            if (result) {
                setDetail(result.data);
                setLoader(false)
                setShowEdit(true);
            }
        } catch (err) {
            setLoader(false)
        }
    }

    const handleAddClose = () => {
        setShowAdd(false);
    }
    const handleAddShow = async () => {
        setShowAdd(true);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                setLoader(true);
                const result = await trackService.getTracks();
                if (result)
                    setTracks(result.data);
                setLoader(false)
            } catch (err) {
                setLoader(false)
            }

        };
        getData();
    }, [change])

    return (
        <div className="container mt-3" >
            <button className="btn btn-outline-info mt-3" onClick={() => handleAddShow()}>Add Tracks</button>
            <div style={{'overflowX':'auto'}}>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Artist
                        </th>
                        <th>
                            Length
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tracks?.length ? tracks.map((track, index) => {
                            return (

                                <tr key={track._id} >
                                    <td>{track?.title}</td>
                                    <td>{track?.artist}</td>
                                    <td>{track?.length}</td>
                                    <td><i className="far fa-edit text-success" onClick={() => handleEditShow(track._id)}></i><i className="ml-3 far fa-trash-alt text-danger ml-2" onClick={
                                        () => removeTrack(track._id)
                                    }></i></td>
                                </tr>
                            )
                        }) : null
                    }
                </tbody>
            </table>
            </div>
            <Modal
                show={showEdit}
                onHide={() => handleEditClose()}
                dialogClassName="login-form"
                size="md">
                <TrackForm type="edit" close={handleEditClose} trackDetail={trackDetail} title="Edit Track" setChange={setChange} />
            </Modal>

            <Modal
                show={showAdd}
                onHide={() => handleAddClose()}
                dialogClassName="login-form"
                size="md">
                <TrackForm type="add" close={handleAddClose} title="Add Track" setChange={setChange} />
            </Modal>
        </div>
    )
}

export default Tracks;