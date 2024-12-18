import edrpgSystemDataModel from "./base-model.mjs";

export default class edrpgSystemActorBase extends edrpgSystemDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.endurance = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 20, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 20 })
    });
    schema.shield = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });
    schema.karma = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}