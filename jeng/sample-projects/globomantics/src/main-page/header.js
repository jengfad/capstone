import logo from "./GloboLogo.png";

const Header = ({subtitle}) => (
    <header className="d-flex justify-content-center">
        <div>
            <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="mt-5 subtitle">
            {subtitle}
        </div>
    </header>
);

export default Header;