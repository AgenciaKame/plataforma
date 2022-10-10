import { useParams, useLocation } from "react-router-dom";
import UnitBox from "./UnitBox";
import Directory from "./Directory";
import unitOne from "../../assets/Bitacora de recorrido.png";

const Lesson = () => {
  const { title } = useParams();
  const { pathname } = useLocation();

  let paths = pathname.split("/");
  paths.splice(0, 2);
  let content;
  if (pathname === "/dash/categorias/Bienvenida") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Tres" image={unitOne} pathname={pathname} />
        <UnitBox
          unitTitle="Título Cuatro"
          image={unitOne}
          pathname={pathname}
        />
        <UnitBox unitTitle="Título Cinco" image={unitOne} pathname={pathname} />
      </>
    );
  }
  if (pathname === "/dash/categorias/Tu modelo de trabajo") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
      </>
    );
  }
  if (pathname === "/dash/categorias/Contenido Audiovisual") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Tres" image={unitOne} pathname={pathname} />
        <UnitBox
          unitTitle="Título Cuatro"
          image={unitOne}
          pathname={pathname}
        />
      </>
    );
  }
  if (pathname === "/dash/categorias/Material digital") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Tres" image={unitOne} pathname={pathname} />
      </>
    );
  }
  if (pathname === "/dash/categorias/Monetización de tu trabajo") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Tres" image={unitOne} pathname={pathname} />
        <UnitBox
          unitTitle="Título Cuatro"
          image={unitOne}
          pathname={pathname}
        />
        <UnitBox unitTitle="Título Cinco" image={unitOne} pathname={pathname} />
      </>
    );
  }
  if (pathname === "/dash/categorias/Autenticidad y Creatividad") {
    content = (
      <>
        <UnitBox unitTitle="Título Uno" image={unitOne} pathname={pathname} />
        <UnitBox unitTitle="Título Dos" image={unitOne} pathname={pathname} />
      </>
    );
  }
  return (
    <>
      <Directory title={title} /> {/* paths={paths} pathname={pathname} */}
      <div className="lesson-section">
        <div className="lesson-title">
          <h2>{title}</h2>
        </div>
        <div className="units-grid">{content}</div>
      </div>
    </>
  );
};

export default Lesson;
