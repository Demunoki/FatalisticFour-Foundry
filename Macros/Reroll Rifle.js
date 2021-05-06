let actorData = actor ? actor : canvas.tokens.controlled[0];
let Musket = actorData ? actorData.data.items.find(i => i.name==="Musket") : null;
let mod = actorData.data.data.abilities.dex.mod;
if(actorData == null|| Musket == null ) 
    ui.notifications.warn(`I have a bad feeling about this`);
  else{
    let damage=Musket.data.damage.parts[0][0];
damage=damage.replace('@mod', mod);
console.log(damage);
 const card = BetterRolls.rollItem(actorData);
     card.addField(["damage", { formula:damage}]);
     card.toMessage();
}
