const actorData = actor ? actor : canvas.tokens.controlled[0];
const IntMod = actorData.data.data.abilities.int.mod;
const ProfBonus=2*actorData.data.data.attributes.prof;

const card = BetterRolls.rollItem(actorData);
card.addField(["header", { img: actorData.img, title: "Dissection" }]);
const rollExpr = `1d20+${IntMod}+${ProfBonus}`;
const damage = `1d4+${IntMod}`;
const title = `Dissection`;
const rollState = BetterRolls.getRollState();
card.addField(["check", { formula: rollExpr, rollState, title }]);
card.addField(["check", { formula: `${damage}` }]);
card.toMessage();
