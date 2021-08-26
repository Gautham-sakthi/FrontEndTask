import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { trackService } from "../Services/tracks";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "*Required";
  }

  if (!values.artist) {
    errors.artist = "*Required";
  }

  if (values.minutes <= 0) {
    errors.minutes = "*Required";
  }

  if (values.seconds <= 0) {
    errors.seconds = "*Required";
  }

  return errors;
};

const TrackForm = ({ title, type, trackDetail, close, setChange }) => {
  //add form value initialized
  const addFormik = useFormik({
    initialValues: {
      title: "",
      minutes: "00",
      seconds: "00",
      artist: "",
    },
    validate,
    onSubmit: (values) => {
      addTracks(values);
    },
  });
  //edit form value initialized
  const editFormik = useFormik({
    initialValues: {
      title: trackDetail ? trackDetail.title : "",
      minutes: trackDetail ? trackDetail?.length.split(":")[0] : "0",
      seconds: trackDetail ? trackDetail?.length.split(":")[1] : "0",
      artist: trackDetail ? trackDetail.artist : "",
    },
    validate,
    onSubmit: (values) => {
      editTracks(values);
    },
  });
  let formik;
  //choose form operation
  if (type === "add") {
    formik = addFormik;
  } else {
    formik = editFormik;
  }
  //handle add track
  const addTracks = async (data) => {
    if (data.minutes < 10) {
      data.minutes = "0" + data.minutes;
    }
    if (data.seconds < 10) {
      data.seconds = "0" + data.seconds;
    }
    const payload = {
      title: data.title,
      length: `${data.minutes}:${data.seconds}`,
      artist: data.artist,
    };
    try {
      const data = await trackService.createTrack(payload);

      if (data) {
        toast.success(data.message);
        close();
        setChange((prev) => !prev);
      }
    } catch (err) {
      toast.error(err.message);
      close();
      setChange((prev) => !prev);
    }
  };
  //handle update track
  const editTracks = async (data) => {
    if (data.minutes < 10) {
      data.minutes = "0" + data.minutes;
    }
    if (data.seconds < 10) {
      data.seconds = "0" + data.seconds;
    }
    const payload = {
      title: data.title,
      length: `${data.minutes}:${data.seconds}`,
      artist: data.artist,
    };
    try {
      const data = await trackService.updateTrack(trackDetail._id, payload);
      if (data) {
        toast.success(data.message);
        close();
        setChange((prev) => !prev);
      }
    } catch (err) {
      toast.error("Could not update track");
      close();
      setChange((prev) => !prev);
    }
  };
  return (
    <div className="container d-flex px-5 py-3 justify-content-center modal-custom-class">
      <form onSubmit={formik.handleSubmit} className="login-form">
        <h1 className="form-title my-3">{title}</h1>
        <label htmlFor="title">
          Title
          <input
            placeholder="Title"
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </label>
        {formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}

        <label className="mt-2" htmlFor="artist">
          Artist
          <input
            placeholder="Artist"
            id="artist"
            name="artist"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.artist}
          />
        </label>
        {formik.errors.artist ? (
          <div className="text-danger">{formik.errors.artist}</div>
        ) : null}

        <label className="mt-2" htmlFor="minutes">
          Minutes
          <input
            id="minutes"
            name="minutes"
            type="number"
            min={0}
            max={59}
            onChange={formik.handleChange}
            value={formik.values.minutes}
          />
        </label>
        {formik.errors.minutes ? (
          <div className="text-danger">{formik.errors.minutes}</div>
        ) : null}

        <label className="mt-2" htmlFor="seconds">
          Seconds
          <input
            placeholder="Seconds"
            id="seconds"
            name="seconds"
            type="number"
            max={59}
            min={0}
            onChange={formik.handleChange}
            value={formik.values.seconds}
          />
        </label>

        {formik.errors.seconds ? (
          <div className="text-danger">{formik.errors.seconds}</div>
        ) : null}
        <div className="row d-flex my-5 justify-content-center">
          <button type="submit" className="btn btn-lg btn-outline-success mr-3">
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-lg btn-outline-secondary"
            onClick={() => {
              close();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackForm;
