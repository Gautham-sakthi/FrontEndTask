import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import TrackForm from "../Forms/trackForm";
import { LoaderContext } from "../Provider/LoaderProvider";
import { trackService } from "../Services/tracks";
import "../Styles/table.css";

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
        toast.dark(result.message);
        setChange((prev) => !prev);
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const handleEditShow = async (id) => {
    try {
      setLoader(true);
      const result = await trackService.getTrackDetail(id);
      if (result) {
        setDetail(result.data);
        setLoader(false);
        setShowEdit(true);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const handleAddClose = () => {
    setShowAdd(false);
  };
  const handleAddShow = async () => {
    setShowAdd(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const result = await trackService.getTracks();
        if (result) setTracks(result.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    };
    getData();
  }, [change]);

  return (
    <div className="container ">
      <button
        className="btn btn-outline-success my-5"
        onClick={() => handleAddShow()}
      >
        Add Tracks
      </button>
      <div style={{ overflowX: "auto" }}>
        <table className="content-table ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks?.length
              ? tracks.map((track, index) => {
                  return (
                    <tr key={track._id}>
                      <td valign="middle">
                        <div className="d-flex align-items-center">
                          <div className="track-img">
                            <img
                              src={`https://picsum.photos/60?random=${index}&grayscale`}
                            />
                          </div>
                          <p className="m-0 pl-3">{track?.title}</p>
                        </div>
                      </td>
                      <td>{track?.artist}</td>
                      <td>{track?.length}</td>
                      <td>
                        <tr>
                          <td>
                            <i
                              className="far fa-edit text-white table-action-button"
                              onClick={() => handleEditShow(track._id)}
                            ></i>
                          </td>
                          <td>
                            <i
                              className="ml-3 far fa-trash-alt text-white ml-2 table-action-button"
                              onClick={() => removeTrack(track._id)}
                            ></i>
                          </td>
                        </tr>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <Modal
        show={showEdit}
        onHide={() => handleEditClose()}
        dialogClassName="modal-form"
        size="md"
      >
        <TrackForm
          type="edit"
          close={handleEditClose}
          trackDetail={trackDetail}
          title="Edit Track"
          setChange={setChange}
        />
      </Modal>

      <Modal
        show={showAdd}
        onHide={() => handleAddClose()}
        dialogClassName="modal-form"
        size="md"
      >
        <TrackForm
          type="add"
          close={handleAddClose}
          title="Add Track"
          setChange={setChange}
        />
      </Modal>
    </div>
  );
};

export default Tracks;
