import "./Lessons.css";
import { Link, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import kame from "../../assets/logo-white.png";
import category2 from "../../assets/category-02.jpg";
import category3 from "../../assets/category-03.jpg";
import category4 from "../../assets/category-04.jpg";
import category5 from "../../assets/category-05.jpg";
import category6 from "../../assets/category-06.png";
import { useEffect, useState } from "react";

const CardLesson = ({ image, title, children }) => {
  const { pathname } = useLocation();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 300)
  }, []);
  return (
    <div className="lesson-card">
      {isLoaded ? (
        <Link to={`${pathname}/${title}`}>
          {image !== null ? (
            <>
              <img src={image} alt={title} loading="lazy" />
              <div className="lesson-box-transparence"></div>
            </>
          ) : (
            <div className="bg-image"></div>
          )}
          {children}
          <h3>{title}</h3>
        </Link>
      ) : (
        <div style={{width: 'inherit', height: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
          <ClipLoader color="#63c0bb"/>
        </div>
      )}
    </div>
  );
};

const Lessons = () => {
  return (
    <section className="section-lessons">
      <div className="lessons-title">
        <h2>Categorias</h2>
      </div>
      <div className="lessons-grid">
        <CardLesson image={null} title="Bienvenida">
          <img className="image-title" src={kame} alt="logo" />
        </CardLesson>
        <CardLesson image={category2} title="Tu modelo de trabajo" />
        <CardLesson image={category3} title="Contenido Audiovisual" />
        <CardLesson image={category4} title="Material digital" />
        <CardLesson image={category5} title="Monetización de tu trabajo" />
        <CardLesson image={category6} title="Autenticidad y Creatividad" />
      </div>
    </section>
  );
};

export default Lessons;
