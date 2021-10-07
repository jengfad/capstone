import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

library.add(faShieldVirus);

const Header = () => {
    return (
        <header className="d-flex justify-content-center bg-primary p-3">
            <div className="d-flex align-items-center logo">
                <FontAwesomeIcon icon="shield-virus" />
            </div>
            <div className="d-flex align-items-center">
                <h1 className="title">CoviVaxx</h1>
            </div>
            
            
        </header>
    )
}
 
export default Header;