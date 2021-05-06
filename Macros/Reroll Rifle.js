let confirmed = false;
let actorData = actor ? actor : canvas.tokens.controlled[0];
let Musket = actorData ? actorData.items.find(i => i.name==="Musket") : null
if(actorData == null|| Musket == null ) 
    ui.notifications.warn(`I have a bad feeling about this`);
  else{
  let damage=Musket.data.damage.parts.0[0];
  
  const card = BetterRolls.rollItem(actorData);
     card.addField(["damage", { formula:`${damage}` }]);
     card.toMessage();}
