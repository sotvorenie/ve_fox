import {useState} from "react";

import ButtonUi from "../../ui/ButtonUi.tsx";
import Modal from "../../common/Modal.tsx";
import SettingsChannels from "./settingsChannels.tsx";
import SettingsSections from "./settingsSections.tsx";

function SettingsUpload1() {
    const [isVisibleChannels, setIsVisibleChannels] = useState<boolean>(false)
    const [isVisibleSections, setIsVisibleSections] = useState<boolean>(false)

    return (
        <>
            <p className="mb-10 text-w500">Выберите канал:</p>
            <ButtonUi func={() => setIsVisibleChannels(true)} className="w-100 mb-20">Выбрать..</ButtonUi>
            <Modal visible={isVisibleChannels} setVisible={setIsVisibleChannels}>
                <SettingsChannels/>
            </Modal>

            <p className="mb-10 text-w500">Выберите раздел:</p>
            <ButtonUi func={() => setIsVisibleSections(true)} className="w-100">Выбрать..</ButtonUi>
            <Modal visible={isVisibleSections} setVisible={setIsVisibleSections}>
                <SettingsSections/>
            </Modal>
        </>
    )
}

export default SettingsUpload1;