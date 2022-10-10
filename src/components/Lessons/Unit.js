import { useParams, Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import Directory from "./Directory";
/* import ReactPlayer from "react-player"; */

const Unit = () => {
  const { title, unitTitle } = useParams();

  return (
    <>
      <Directory title={title} unitTitle={unitTitle} />
      <div className="unit-video">
        <iframe
          src="https://www.youtube.com/embed/NbyPbcRM1oY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="unit-section">
        <div className="unit-title">
          <h2>{unitTitle}</h2>
        </div>
        <div className="unit-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            in quos nisi officia id nam provident incidunt animi?.
          </p>
        </div>
        <div className="unit-buttons">
          <div className="options">
            <button>Siguiente Video</button>
            <Link>
              <Unicons.UilAngleRight color={"#FFF"} size={30} />
            </Link>
          </div>
          <div className="options">
            <button>Categorias</button>
            <Link to="/dash/categorias">
              <Unicons.UilAngleRight color={"#FFF"} size={30} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unit;
