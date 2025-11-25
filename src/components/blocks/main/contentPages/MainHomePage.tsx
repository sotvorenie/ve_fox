import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../../../store";
import {connectToServer} from "../../../../store/websocket-server/connectionThunk.ts";
import {sendMessageToServer} from "../../../../store/websocket-server/sendMessageThunk.ts";

function MainHomePage() {
    const dispatch = useDispatch<AppDispatch>();
    const { isConnected, isConnecting, connectionError } = useSelector(
        (state: RootState) => state.connection
    )

    useEffect(() => {
        dispatch(connectToServer())

    }, [])

    return(
        <>
            {isConnecting && <p>Подключение...</p>}
            {isConnected && <p>Соединение установлено</p>}
            {connectionError && <p>Ошибка: {connectionError}</p>}

            <button onClick={() => dispatch(sendMessageToServer({command: 'get_all_videos'}))}>
                получить видео
            </button>
        </>
    )
}

export default MainHomePage;