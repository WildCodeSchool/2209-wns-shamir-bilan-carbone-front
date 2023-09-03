import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div>
        <h4>Contact</h4>
        <p>17 Rue Delandine</p>
        <p>69002 Lyon, FRANCE</p>
      </div>
      <div>
        <h4>Pages Site</h4>
        <Link to="/">Accueil</Link>
      </div>
      <div>
        <h4>Informations</h4>
        <Link to="/mentions-legales">Mentions légales</Link>
      </div>
      <div className="copyright">
        <p>© Copyright Just Reduce 2023</p>
      </div>
    </div>
  );
};

export default Footer;
