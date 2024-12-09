import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class edrpgSystemItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['edrpg-system', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/edrpg-system/templates/item';
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toPlainObject();

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedDescription = await TextEditor.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );

    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Adding a pointer to CONFIG.EDRPG_SYSTEM
    context.config = CONFIG.EDRPG_SYSTEM;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    context.modifier = this.item.system.modifiers;

    // create list of skills for modifier dropdown
    let skills = [];
    for(let abilityGroup in CONFIG.EDRPG_SYSTEM.abilityGroups){
      for(let ability in CONFIG.EDRPG_SYSTEM.abilityGroups[abilityGroup]){
        skills.push({key: CONFIG.EDRPG_SYSTEM.abilityGroups[abilityGroup][ability], label: CONFIG.EDRPG_SYSTEM.abilityGroups[abilityGroup][ability]});
      }
    }
    context.skills = skills;

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );

    html.on("click", ".modifier-create", (ev) => 
      this._onCreateModifier(ev, this.item)
    );

    html.on("change", ".modifierSkillSelection", (ev) =>
      this._onEditSkillModifierSkill(ev, this.item)
    );

    html.on("change", ".skillModifierValue", (ev) =>
      this._onEditSkillModifierValue(ev, this.item)
    );

    html.on("change", ".skillModifierName", (ev) =>
      this._onEditSkillModifierName(ev, this.item)
    );

    html.on("change", ".itemModifierUse", (ev) =>
      this._onEditSkillModifierUse(ev, this.item)
    );

    html.on("click", ".modifier-delete", (ev) => 
      this._onDeleteSkillModifier(ev, this.item)
    );
  }

  _onCreateModifier(event, item){
    event.preventDefault();
    //item.system.modifiers.push({id: foundry.utils.randomID()});
    let newModifiers = item.system.modifiers;
    newModifiers.push({id:foundry.utils.randomID()});
    item.update({"system.modifiers": newModifiers});
  }

  _onEditSkillModifierSkill(event, item){
    event.preventDefault();
    let newSkill = event.target.selectedOptions[0].value;
    let modifiers = item.system.modifiers;
    let targetModifierId = event.target.dataset.modifierId;
    for(let mod in modifiers){
      if(modifiers[mod].id === targetModifierId){
        modifiers[mod].skill = newSkill;
        break;
      }
    }
    item.update({"system.modifiers": modifiers}); 
  }

  _onEditSkillModifierName(event, item){
    event.preventDefault();
    let newName = event.target.value;
    let modifiers = item.system.modifiers;
    let targetModifierId = event.target.dataset.modifierId;
    for(let mod in modifiers){
      if(modifiers[mod].id === targetModifierId){
        modifiers[mod].name = newName;
        break;
      }
    }
    item.update({"system.modifiers": modifiers}); 
  }

  _onEditSkillModifierUse(event, item){
    event.preventDefault();
    let checked = event.target.checked;
    let modifiers = item.system.modifiers;
    let targetModifierId = event.target.dataset.modifierId;
    for(let mod in modifiers){
      if(modifiers[mod].id === targetModifierId){
        modifiers[mod].useModifier = checked;
        break;
      }
    }
    item.update({"system.modifiers": modifiers}); 
  }  

  _onEditSkillModifierValue(event, item){
    event.preventDefault();
    let newValue = event.target.value;
    let modifiers = item.system.modifiers;
    let targetModifierId = event.target.dataset.modifierId;
    for(let mod in modifiers){
      if(modifiers[mod].id === targetModifierId){
        modifiers[mod].value = newValue;
        break;
      }
    }
    item.update({"system.modifiers": modifiers}); 
  }

  _onDeleteSkillModifier(event, item){
    let modifiers = item.system.modifiers;
    let targetModifierId = event.target.dataset.modifierId;
    let newModifiers = modifiers.filter(mod => {
      return mod.id !== targetModifierId;
    });
    item.update({"system.modifiers": newModifiers});
  }
}
