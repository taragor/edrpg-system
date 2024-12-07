const fields = foundry.data.fields;

export default function itemSkillModifier(){
    return {
        id: new fields.StringField({initial: ''}),
        value: new fields.NumberField({initial: 0}),
        skill: new fields.StringField({initial: ''}),
        useBonus: new fields.BooleanField({initial: true})
    }
}