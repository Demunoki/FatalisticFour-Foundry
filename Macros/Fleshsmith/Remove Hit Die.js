const actorData = actor ? actor : canvas.tokens.controlled[0];
actorData.data.data.attributes.hd--;
  ChatMessage.create({
                            speaker: ChatMessage.getSpeaker(),
                            content: `${actorData.name} spent 1 Hitdice`
                        });
