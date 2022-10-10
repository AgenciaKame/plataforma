import { Link } from 'react-router-dom'
import * as Unicons from '@iconscout/react-unicons'

const UnitBox = ({ unitTitle, image, paragraph, time, pathname }) => {
  return (
    <div className="box-unit">
      <Link to={`${pathname}/${unitTitle}`}>
        <img src={image} alt={unitTitle} />
        <h3>{unitTitle}</h3>
        <p>
          {!paragraph ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          voluptatibus exercitationem?` : paragraph}
        </p>
        <span>
          <Unicons.UilClock size={15} color="#ffffff" />
          {!time ? '2:06' : time} minutos
        </span>
      </Link>
    </div>
  );
};

export default UnitBox;
