import { EDRPG_SYSTEM } from '../helpers/config.mjs';
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { preloadHandlebarsTemplates } from '../helpers/templates.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class edrpgSystemActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['edrpg-system', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/edrpg-system/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toPlainObject();

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Adding a pointer to CONFIG.EDRPG_SYSTEM
    context.config = CONFIG.EDRPG_SYSTEM;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const karma = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
      // Append to karma.
      else if (i.type === 'karma_capability') {
        karma.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.spells = spells;
    context.karma_capability = karma;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));
    html.on('click', '.skillRoll', this._rollSkillCheck.bind(this));

    // Use Karma abilities.
    html.on('click', '.use_karma', this._onUseKarma.bind(this));

    // changed item equipped
    html.on('click', '.itemEquipped', this._onItemEquiped.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  _onItemEquiped(event){
    event.preventDefault();
    const item = this.actor.items.get(event.target.dataset.itemId);
    item.update({"system.equipped": event.target.checked});
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  async _rollSkillCheck(skillToRoll){
    let context =  {}
    context.skill = skillToRoll.target.dataset.skill;

    //register handlebar helper for skill display
    Handlebars.registerHelper("ifEquals", function(arg1, arg2, options){
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    });


    //filter the items to get only items that are equipped and have modifiers for the skill we want to roll
    const relevantItems = this.actor.items.filter(item => {
      const hasRelevantBonus = (item.system.modifiers.find(mod => {
        return (mod.skill === context.skill);
      }) !== undefined);
      return (hasRelevantBonus && item.system.equipped);
    });

    //write the items we just filtered into the context
    context.equippedItems = relevantItems;

    //create HTML from Template
    const dialogContent = await renderTemplate("systems/edrpg-system/templates/actor/dialogs/skill-check.hbs", context);

    new Dialog({
      title: game.i18n.localize(context.skill),
      content: dialogContent,
      buttons: {
        confirm: {
          label: "Confirm",
          callback: (html) => this._executeRoll(html, context.skill)
        }
      }
    }).render(true);

  }

  _onModifierUse(event){
    event.preventDefault();
    
  }

  _executeRoll(html, skill){
    console.log("executing roll");
    
    //First we look through the HTML of the dialog to get all the checkboxes to find out which items to actually use for this roll
    const useBonusControls = html.find(".itemModifierUse");

    //iterate through checboxes and update database
    //this first loop iterates through the checkboxes and gets the item for the checkbox
    for(let i = 0; i < useBonusControls.length; i++){
      const itemId = useBonusControls[i].dataset.itemId;
      const modifierId = useBonusControls[i].dataset.modifierId;
      const item = this.actor.items.get(itemId);
      let itemModifiers = item.system.modifiers;
      //this loop goes through the modifiers of the item corresponding to the current checkbox
      for(let mod in itemModifiers){
        if(itemModifiers[mod].id === modifierId){
          //When we have found the correct modifier, set its useBonus according to the checkboxes checked state
          itemModifiers[mod].useBonus = useBonusControls[i].checked;
        }
      }
      //write the updates to the DB
      item.update({"system.modifiers": itemModifiers});
    }

    //this unfortunate block of code loops through all skills until we find the group and ability key for the ability identifier string. 
    //this code sucks and should be deleted but I haven't found a better solution
    let targetAbilityGroup;
    let targetAbility;
    for(let abilityGroup in EDRPG_SYSTEM.abilityGroups){
      let found = false;
      for(let ability in EDRPG_SYSTEM.abilityGroups[abilityGroup]){
        if(EDRPG_SYSTEM.abilityGroups[abilityGroup][ability] === skill){
          targetAbility = ability;
          targetAbilityGroup = abilityGroup;
          found = true;
          break;
        }
      }
      if(found){
        break;
      }
    }

    //We roll d10s
    let rollFormula = "1d10";

    //get the skill score of the actor for the current skill
    let baseBonus = this.actor.system[targetAbilityGroup][targetAbility].value;

  
    let rollModifiers = []
 
    //loop through the actors items and find all aplicable modifiers
    this.actor.items.forEach((item) => {
      item.system.modifiers.forEach((mod) => {
        if(item.system.equipped && mod.skill == skill && mod.useBonus){
          rollModifiers.push({"name": item.name, "value": mod.value});
        }
      });
    });

    //get and process the custom modifier
    let customModifier = html.find(".rollCustomBonus")[0].value;
    if(!isNaN(customModifier) && customModifier != ""){
      customModifier = parseInt(customModifier);
    } else {
      customModifier = 0;
    }
    rollModifiers.push({"name": "Custom", "value": customModifier});

    //calculate sum of modifiers for rolling
    let itemBonusScore = baseBonus;
    rollModifiers.forEach((mod) => {
      itemBonusScore += mod.value;
    });

    let itemBonus = Math.floor(itemBonusScore/10);

    //create table for roll mesage
    let label = "<h1>" + game.i18n.localize(skill) + "</h1><br/><table><tr><th>Modifier</th><th>Value</th></tr><tr style='border-bottom:1px solid black'> <td colspan='100%'></td></tr>"; 
    label += "<tr><td><b>" + game.i18n.localize(skill) + "</b></td><td><b>" + this.actor.system[targetAbilityGroup][targetAbility].value + "</b></td></tr>";
    rollModifiers.forEach((mod) => {
      label += "<tr><td>" + mod.name + "</td><td>" + mod.value + "</td></tr>";
    });
    label += "<tr style='border-bottom:1px solid black'> <td colspan='100%'></td></tr>";
    label += "<tr><td>Total</td><td>" + itemBonusScore + " &rarr; <b>" + itemBonus + "</b></td></tr>"
    label += "</table>" ;


    //do the actual roll
    let roll = new Roll(rollFormula + "+" + itemBonus);
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: label,
      rollMode: game.settings.get("core", "rollMode")
    });

    return roll;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  //Handle Rolls and Description for Karma
  _onUseKarma(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    const itemId = element.closest('.item').dataset.itemId;
    const item = this.actor.items.get(itemId);

    //Object to show description
    let mesg_data = {speaker: ChatMessage.getSpeaker({actor: this.actor})};

    let roll_formular = "";

    mesg_data.flavor = "<b>" + item.name + "</b><br/>" + "<img src='" + item.img + "' width='40' height='40'/>" + "<br/><i>Karma Cost: " + item.system.karma_cost.toString() + "</i><br/>";

    //Enough Karma?
    if (this.actor.system.karma.value >= item.system.karma_cost){
      //display description
      mesg_data.flavor += item.system.description;

      //Decide if foundry needs to roll
      if (item.system.roll.diceNum > 0){
        roll_formular = item.system.roll.diceNum.toString() + item.system.roll.diceSize;
        if (item.system.roll.diceBonus !== ""){
          roll_formular += "+" + item.system.roll.diceBonus;
        }
      }

      //calculate new karma and reload char sheet
      this.actor.update({'system.karma.value': this.actor.system.karma.value - item.system.karma_cost});
    }else{
      //display dödel message
      mesg_data.flavor += "Nicht genug Karma! Du Dödel.";
    }

    if (item.system.roll.diceNum > 0){
      //execute roll
      let roll = new Roll(roll_formular);
      roll.toMessage({...mesg_data});
    
      return roll;
    }
    let mesg = ChatMessage.create(mesg_data);
    return mesg;
  }
}
