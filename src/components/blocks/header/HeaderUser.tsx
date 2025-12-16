import {useState} from "react";

import avatarImage from "../../../assets/images/аватар.webp";
import Modal from "../../common/Modal.tsx";
import HeaderUpload from "./HeaderUpload.tsx";

function HeaderUser() {

    const [settingsModalVisible, setSettingsModalVisible] = useState(false);

    return (
        <div className="header__avatar">
            <div className="img-container cursor-pointer"
                 title="user"
            >
                <img src={avatarImage} alt="user"/>
            </div>

            <ul className="header__list position-absolute">
                <li className="header__item text-center">
                    <HeaderUpload/>
                </li>
                <li className="header__item text-center">
                    <Modal visible={settingsModalVisible} setVisible={setSettingsModalVisible}>
                        <Modal.Trigger open={() => setSettingsModalVisible(true)}>
                            <button className="hover-color-accent" type="button">
                                Настройки
                            </button>
                        </Modal.Trigger>

                        {settingsModalVisible && (
                            <Modal.Content close={() => setSettingsModalVisible(false)}>
                                Контент модалки
                            </Modal.Content>
                        )}
                    </Modal>
                </li>
            </ul>
        </div>
    )
}

export default HeaderUser;