import avatarImage from "../../../../assets/images/аватар.webp";

function MainHeaderUser() {

    return (
        <div className="header__avatar img-container position-absolute cursor-pointer"
             title="user"
        >
            <img src={avatarImage} alt="user"/>
        </div>
    )
}

export default MainHeaderUser;