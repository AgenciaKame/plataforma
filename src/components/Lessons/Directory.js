import { Link } from "react-router-dom";

const Directory = ({ title, unitTitle }) => {
  return (
    <section className="directory">
      <div>
        <Link to={`/dash/categorias`}>Categorias /</Link>
      </div>
      <div>
        <Link to={`/dash/categorias/${title}`}>{title}{unitTitle !== undefined && ' /'}</Link>
      </div>
      {unitTitle !== undefined && (
        <div>
          <Link>{unitTitle}</Link>
        </div>
      )}
    </section>
  );
};

export default Directory;
