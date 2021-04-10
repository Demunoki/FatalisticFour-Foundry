let confirmed = false;
let actorData = actor ? actor : canvas.tokens.controlled[0];
let featData = actorData ? actorData.items.find(i => i.name==="Thesis of Flesh") : null;

if(actorData == null || featData == null) 
    ui.notifications.warn(`I have a bad feeling about this (Actor nicht gefunden)`);
else
{
    let featUpdate = duplicate(featData);
    let maxUses = Math.clamped(featUpdate.data.uses.value, 0, 
        actorData.data.data.attributes.prof);

    let content = `<p><em>TEAR IT APPART!</em></p>
                    <p>How many dice do you want to use?</p>
                    <form>
                        <div class="form-group">
                            <label for="num">Dice: (Max = ${maxUses})</label>
                            <input id="num" name="num" type="number" min="0" max="${maxUses}"></input>
                        </div>
                            </form>`;
    new Dialog({
        title: "Perfection of Mind",
        content: content,      
        buttons: {
            use: { label: "Dew It!", callback: () => confirmed = true },
            cancel: { label: "Cancel", callback: () => confirmed = false }
        },
        default: "use",

        close: html => {
            if (confirmed) 
            {
                let number = Math.floor(Number(html.find('#num')[0].value));
                if (number < 1 || number > maxUses){
                    ui.notifications.warn(`Invalid number of charges entered = ${number}. Aborting action.`);}
                else
                {
                    
       //BetterRolls:
  const card = BetterRolls.rollItem(actorData);
card.addField(["header", {img: this.data.img, title: "Perfection of Mind"}]);
   card.addField(["damage", { formula:`${number}d8` }]);

                        card.toMessage();
                    featUpdate.data.uses.value = featUpdate.data.uses.value - number;
                    actorData.updateEmbeddedEntity("OwnedItem", featUpdate);
                };
            }
        }
    }).render(true);
}
