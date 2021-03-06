let confirmed = false;
let actorData = actor ? actor : canvas.tokens.controlled[0];
let featData = actorData ? actorData.items.find(i => i.name==="Lay on Hands Pool") : null;

if(actorData == null || featData == null) 
    ui.notifications.warn(`Selected hero must have "Lay on Hands" feat.`);
else
{
    let featUpdate = duplicate(featData);
    let maxHeal = Math.clamped(featUpdate.data.uses.value, 0, 
        100);

    let content = `<p><em>${actorData.name} lays hands on an ally.</em></p>
                    <p>How many HP do you want to restore?</p>
                    <form>
                        <div class="form-group">
                            <label for="num">HP to Restore: (Max = ${maxHeal})</label>
                            <input id="num" name="num" type="number" min="0" max="${maxHeal}"></input>
                        </div>
                        <div class="form-group">
                            <label for="flavor">Flavor:</label>
                            <input id="flavor" name="flavor" value="${featUpdate.data.chatFlavor}"></input>
                        </div>
                    </form>`;
    new Dialog({
        title: "Lay on Hands Healing",
        content: content,      
        buttons: {
            heal: { label: "Heal!", callback: () => confirmed = true },
            cancel: { label: "Cancel", callback: () => confirmed = false }
        },
        default: "heal",

        close: html => {
            if (confirmed) 
            {
                let number = Math.floor(Number(html.find('#num')[0].value));
                if (number < 1 || number > maxHeal){
                    ui.notifications.warn(`Invalid number of charges entered = ${number}. Aborting action.`);}
                else
                {
                    let flavor = `<strong>${html.find('#flavor')[0].value}</strong><br>`;
                 
                        // We need help applying the healing, so make a roll message for right-click convenience.
  const card = BetterRolls.rollItem(actorData);
card.addField(["header", {img: this.data.img, title: "Lay on Hands"}]);
   card.addField(["damage", { formula:`${number}` }]);

                        card.toMessage();
                    featUpdate.data.uses.value = featUpdate.data.uses.value - number;
                    actorData.updateEmbeddedEntity("OwnedItem", featUpdate);
                };
            }
        }
    }).render(true);
}
