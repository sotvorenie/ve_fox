
import avatarImage from "../../../assets/images/аватар.webp";

function HeaderUser() {

    return (
        <div className="header__avatar">
            <div className="img-container cursor-pointer position-relative">
                <img src={avatarImage} alt=""/>
            </div>
        </div>
    )
}

export default HeaderUser;