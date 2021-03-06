import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { albumService } from "../Services/album";
import Header from "./Header";
import { Modal } from "react-bootstrap";
import AddTrack from "../Forms/addtrackToAlbum";
import { toast } from "react-toastify";

function AlbumDetail() {
  const { id } = useParams();
  const [albumDetails, setalbumDetails] = useState({});
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);

  const removeTrack = async (trackId, albumId) => {
    try {
      const data = await albumService.removeTracks(albumId, trackId);
      if (data) {
        toast.dark(data.message);
        setChange((prev) => !prev);
      }
    } catch (err) {}
  };
  useEffect(() => {
    const getData = async () => {
      const data = await albumService.albumDetail(id);
      console.log(data);
      if (data) setalbumDetails(data.data);
    };
    getData();
  }, [change]);
  return (
    <>
      <Header />
      <div className="container">
        <button
          variant="success"
          className="btn btn-outline-success my-5"
          onClick={() => {
            setShow(true);
          }}
        >
          Add Tracks
        </button>
        <div style={{ overflowX: "auto" }}>
          <table className="content-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Duration</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {albumDetails.tracks?.length
                ? albumDetails.tracks.map((track, index) => {
                    return (
                      <tr key={track._id}>
                        <td>{track?.title}</td>
                        <td>{track?.artist}</td>
                        <td>{track?.length}</td>
                        <td>
                          <i
                            className="ml-3 far fa-trash-alt text-white table-action-button"
                            onClick={() => {
                              removeTrack(track._id, albumDetails._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <Modal show={show} dialogClassName="modal-form" size="md">
          <AddTrack details={albumDetails} close={setShow} change={setChange} />
        </Modal>
      </div>
    </>
  );
}

export default AlbumDetail;
