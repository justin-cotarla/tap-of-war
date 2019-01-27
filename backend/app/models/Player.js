export default class Player {
    constructor(socketId, name, socket) {
        this.socketId = socketId;
        this.name = name;
        this.socket = socket;
        this.tapCount = 0;
    }

    updateTapCount() {
        this.tapCount++;
    }
}
