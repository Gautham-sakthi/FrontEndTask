import React, { useEffect, useState, useContext } from "react";
import { albumService } from "../Services/album";
import { LoaderContext } from "../Provider/LoaderProvider";
import { Modal } from "react-bootstrap";
import "../Styles/table.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AddTrack from "../Forms/addtrackToAlbum";

const Albums = () => {
  const history = useHistory();
  //spinner
  const { setLoader } = useContext(LoaderContext);
  //all albums
  const [albums, setAlbums] = useState();
  const [show, setShow] = useState(false);
  //use effect dependency
  const [change, setChange] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const result = await albumService.getAlbums();
        if (result) {
          setAlbums(result.data);
        }
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    };
    getData();
  }, [change]);

  const deleteAlbum = async (id) => {
    try {
      const data = await albumService.deleteAlbum(id);
      if (data) {
        toast.dark("Album deleted");
        setChange((prev) => !prev);
      }
    } catch (err) {
      toast.warning("*could not delete album");
    }
  };

  return (
    <div className="container mt-3">
      <button
        className="btn btn-outline-success my-5"
        onClick={() => {
          setShow(true);
        }}
      >
        Add Albums
      </button>
      <div style={{ overflowX: "auto" }}>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {albums?.length
              ? albums.map((album, index) => {
                  return (
                    <tr key={album._id}>
                      <td
                        valign="middle"
                        onClick={() => {
                          history.push(`/albumDetail/${album._id}`);
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="track-img">
                            <img
                              src={`https://picsum.photos/60?random=${index}&grayscale`}
                            />
                          </div>
                          <p className="m-0 pl-3">{album?.name}</p>
                        </div>
                        <div className="text-muted mt-3">{`List of tracks: ${album.tracks.length}`}</div>
                      </td>
                      <td>
                        <i
                          className="ml-3 far fa-trash-alt  text-white table-action-button"
                          onClick={() => {
                            deleteAlbum(album._id);
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
        <AddTrack
          close={setShow}
          change={setChange}
          save={albumService.createAlbum}
          type="add"
        />
      </Modal>
    </div>
  );
};

export default Albums;
