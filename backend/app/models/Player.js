export default class Player {
    constructor(socketId, name) {
        this.socketId = socketId;
        this.name = name;
        this.tapCount = 0;
    }

    updateTapCount = () => {
        this.tapCount++;
    }
}
