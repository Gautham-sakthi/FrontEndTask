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
        toast.success("Album deleted");
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
                        onClick={() => {
                          history.push(`/albumDetail/${album._id}`);
                        }}
                      >
                        {album?.name}
                      </td>
                      <td>
                        <i
                          className="ml-3 far fa-trash-alt text-danger ml-2"
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
      <Modal show={show} dialogClassName="login-form" size="md">
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
