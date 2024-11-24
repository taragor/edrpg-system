import edrpgSystemActorBase from "./base-actor.mjs";

export default class edrpgSystemCharacter extends edrpgSystemActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.EDRPG_SYSTEM.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    // Iterate over ability names and create a new SchemaField for each.
    schema.personalCombat = new fields.SchemaField(Object.keys(CONFIG.EDRPG_SYSTEM.abilityGroups.personalCombat).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    //NOTE - This is only for reference from boilerplate
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilities[key]) ?? key;
    }

    
    for (const key in this.personalCombat) {
      // Calculate the bonus using edrpg rules.
      this.personalCombat[key].mod = Math.floor(this.personalCombat[key].value/10);
      // Handle ability label localization.
      this.personalCombat[key].label = game.i18n.localize(CONFIG.EDRPG_SYSTEM.abilityGroups.personalCombat[key]) ?? key;
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