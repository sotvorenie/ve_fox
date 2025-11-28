
function MainChannelPage() {

    return (
        <div className="main-page__channel channel m-auto">
            <div className="channel__banner"></div>

            <div className="channel__info flex flex-align-center">
                <div className="channel__avatar img-container"></div>
                <p className="h3">Канал Не Витоса</p>
            </div>

            <ul className="channel__tabs flex flex-align-center">
                <li className="channel__tab is-active hover-color-accent">
                    <button type="button">Главная</button>
                </li>
                <li className="channel__tab hover-color-accent">
                    <button type="button">Видео</button>
                </li>
                <li className="channel__tab hover-color-accent">
                    <button type="button">О канале</button>
                </li>
            </ul>
        </div>
    )
}

export default MainChannelPage;