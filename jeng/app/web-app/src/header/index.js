import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

library.add(faShieldVirus);

const Header = () => {
    return (
        <header className="d-flex bg-primary p-3">
            <div className="d-flex align-items-center logo">
                <FontAwesomeIcon icon="shield-virus" />
            </div>
            <div className="d-flex align-items-center">
                <h4 className="title">CoviVaxx</h4>
            </div>
            
            
        </header>
    )
}
 
export default Header;