// Has - A Relationship (Weak Relationship)
// Team Has Players 
// Library has books


class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }
}


class Player {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const CSK = new Team("Chennai Super Kings");
const player1 = new Player("MS Dhoni", 40);
const player2 = new Player("Ravindra Jadeja", 32);
CSK.addPlayer(player1);
CSK.addPlayer(player2);