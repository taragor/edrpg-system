import edrpgSystemActorBase from "./base-actor.mjs";

export default class edrpgSystemCharacter extends edrpgSystemActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      rankpoints: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.personalCombat = new fields.SchemaField(Object.keys(CONFIG.EDRPG_SYSTEM.abilityGroups.personalCombat).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    // Iterate over ability names and create a new SchemaField for each.
    schema.intelligence = new fields.SchemaField(Object.keys(CONFIG.EDRPG_SYSTEM.abilityGroups.intelligence).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }


  prepareDerivedData() {
    //Personal Combat
    for (const key in this.personalCombat) {
      // Calculate the bonus using edrpg rules.
      this.personalCombat[key].mod = Math.floor(this.personalCombat[key].value/10);
      // Handle ability label localization.
      this.personalCombat[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.personalCombat[key]) ?? key;
    }

    //Intelligence
    for (const key in this.intelligence) {
      // Calculate the bonus using edrpg rules.
      this.intelligence[key].mod = Math.floor(this.intelligence[key].value/10);
      // Handle ability label localization.
      this.intelligence[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.intelligence[key]) ?? key;
    }

    //Social Skills
    for (const key in this.socialSkills) {
      // Calculate the bonus using edrpg rules.
      this.socialSkills[key].mod = Math.floor(this.socialSkills[key].value/10);
      // Handle ability label localization.
      this.socialSkills[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.socialSkills[key]) ?? key;
    }

    //Vehicle Skills
    for (const key in this.vehicleSkills) {
      // Calculate the bonus using edrpg rules.
      this.vehicleSkills[key].mod = Math.floor(this.vehicleSkills[key].value/10);
      // Handle ability label localization.
      this.vehicleSkills[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.vehicleSkills[key]) ?? key;
    }

    //Espionage
    for (const key in this.espionage) {
      // Calculate the bonus using edrpg rules.
      this.espionage[key].mod = Math.floor(this.espionage[key].value/10);
      // Handle ability label localization.
      this.espionage[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.espionage[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}