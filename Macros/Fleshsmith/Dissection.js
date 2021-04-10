let actorData = actor ? actor : canvas.tokens.controlled[0];
let IntMod = actorData.data.data.abilities.int.mod;
let ProfBonus=2*actorData.data.data.attributes.prof;

const card = BetterRolls.rollItem(actorData);
card.addField(["header", { img: actorData.img, title: "Dissection" }]);
let rollExpr = `1d20+${IntMod}+${ProfBonus}`;
let damage = `1d4+${IntMod}`;
const title = `Dissection`;
const rollState = BetterRolls.getRollState();
card.addField(["attack", { formula: rollExpr, rollState, title }]);
card.addField(["damage", { formula: `${damage}` }]);
card.toMessage();
