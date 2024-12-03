import edrpgSystemDataModel from "./base-model.mjs";

import itemSkillModifier from "./modifierData.mjs";

export default class edrpgSystemItemBase extends edrpgSystemDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    schema.modifiers = new fields.ArrayField(new fields.SchemaField(itemSkillModifier()));

    return schema;
  }

}