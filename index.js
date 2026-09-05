let xp = 0;
let health = 100;
let gold = 50;
let CurrentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
    name: "Stick",
    power: 10
},
{
    name: "dagger",
    power:30
},
{
    name: "claw hammer",
    power: 50
},
{
    name: "sword",
    power: 100
}
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [{
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "you are in the town square. you see a sign that says \"store\"."
},
{
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "you enter the store."
},
{
    name: "cave",
    "button text":["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "you enter the cave. you see some monsters."
},
{
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "you are fighting a monster."
},
{ name:"lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [goTown, goTown, goTown],
    text: "You have been defeated. You lose."

},
{ name:"win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [goTown, goTown, goTown],
    text: "You have defeated the dragon. You win!"
},
{
    name:"easter egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: "You have found the easter egg! 28 is the answer to life, the universe, and everything."
}
];

// initialize buttons //

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() { 
    if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    }
    else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (CurrentWeapon < weapons.length - 1) {
    if (gold >= 30) {
        gold -= 30;
        CurrentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[CurrentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "You do not have enough gold to buy a weapon.";
    }
}
    else {
        text.innerText = "You already have the most powerful weapon.";}
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellweapon;
}

function sellweapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "You cannot sell your last weapon.";
    }
}

function fightSlime() {
    fighting = 0;
    gofight();
  
}

function fightBeast() {
    fighting = 1;
    gofight();
}

function fightDragon() {
    fighting = 2;
    gofight();
}

function gofight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterstats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[CurrentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    
    if (isMonsterHit()) {
        monsterHealth -= weapons[CurrentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += "you miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        CurrentWeapon--;
    }
    
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    CurrentWeapon = 0;
    inventory = ["Stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
 pick(2);
}

function pickEight() {
 pick(8);
}