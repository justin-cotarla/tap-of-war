class GameCache {
    static instance;

    constructor() {
        if (instance) {
            return instance;
        }

        this.games = [];
        this.instance = this;
    }

    addGameToCache = (game) => this.games.push(game);

    getGameFromCache = (id) => this.games.find(x => x.id === id);

    removeGameFromCache = (id) => this.games = this.games.filter(x => x.id != id);
}

export default new GameCache();