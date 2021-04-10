const actorData = actor ? actor : canvas.tokens.controlled[0];
if(actorData == null) 
    ui.notifications.warn(`No token selected`);
else{
    if(actorData.data.data.attributes.hd==0){
            ui.notifications.warn(`No Hitdice available`);}
    else{
actorData.data.data.attributes.hd--;
  ChatMessage.create({
                            speaker: ChatMessage.getSpeaker(),
                            content: `${actorData.name} spent 1 Hitdice`
                        });
}
}
