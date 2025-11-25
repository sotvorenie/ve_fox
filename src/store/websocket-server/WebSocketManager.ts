type WSDispatch = (action: { type: string; payload?: any }) => void;

class WebSocketManager {
    socket: WebSocket | null = null
    dispatch: WSDispatch | null = null

    init(dispatch: WSDispatch) {
        this.dispatch = dispatch
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                if (this.socket) {
                    this.socket.close();
                }

                this.socket = new WebSocket("ws://localhost:5557");

                this.socket.onopen = () => {
                    this.dispatch?.({ type: "connectionStore/connected" });
                    resolve(true);
                };

                this.socket.onerror = () => {
                    this.dispatch?.({ type: "connectionStore/error", payload: "Ошибка соединения" });
                    reject("Ошибка соединения");
                };

                this.socket.onclose = () => {
                    this.dispatch?.({ type: "connectionStore/disconnected" });
                };

                this.socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    this.dispatch?.({
                        type: "connectionStore/message",
                        payload: data
                    });
                };
            } catch (e) {
                reject(e);
            }
        });
    }

    send(data: any) {
        if (this.socket && this.socket.readyState === 1) {
            this.socket.send(JSON.stringify(data));
        }
    }
}

export const wsManager = new WebSocketManager();