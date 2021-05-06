let confirmed = false;
let actorData = actor ? actor : canvas.tokens.controlled[0];
if(actorData == null ) 
    ui.notifications.warn(`I have a bad feeling about this`);
