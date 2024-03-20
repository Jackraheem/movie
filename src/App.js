import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaArrowTurnDown } from "react-icons/fa6";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`)
      .then((response) => response.json())
      .then((value) => {
        setData(value.Search || []);
        setLoading(false);
      });
  };

  const download = (url) => {
    fetch(url)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      });
  };

  return (
    <div>
      <center>
        <h2 className="cc">Jack/raheem</h2>
        <h3>Search Your Favorite Movie <FaArrowTurnDown /></h3>
        <form onSubmit={submitHandler}>
          <span>
            <CiSearch style={{ fontSize: "1.7rem", color: "white" }} />
            <Input
              type="text"
              placeholder="Search your favourite movie poster....."
              className="ii"
              style={{ width: "50%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <input type="submit" value="search" title="Click me" className="ss" />
          </span>
        </form>
        <div className="row ">
          {loading ? (
            <p className="lod">Loading...</p>
          ) : data.length === 0 ? (
            <p className="lod">There are no movies.</p>
          ) : (
            data.map((movie, index) => (
              <div className="col-md-4" key={index}>
                <br />
                <div className="card" style={{ width: "13rem" }}>
                  <img
                    className="card-img-top ig"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <div className="card-body coo">
                    <h6 className="card-title">{movie.Title}</h6>
                    <button className="btn btn-primary" onClick={() => download(movie.Poster)}>
                      Download Poster
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </center>
    </div>
  );
};

export default App;
