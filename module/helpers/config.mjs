export const EDRPG_SYSTEM = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */

EDRPG_SYSTEM.abilityGroups = {};
EDRPG_SYSTEM.abilityGroupAbbreviations = {};

EDRPG_SYSTEM.abilityGroups.personalCombat = {
  dodge:    'EDRPG_SYSTEM.Ability.Dodge.long',
  enWeap:   'EDRPG_SYSTEM.Ability.EnWeap.long',
  fighting: 'EDRPG_SYSTEM.Ability.Fighting.long',
  grenade:  'EDRPG_SYSTEM.Ability.Grenade.long',
  hvyWeap:  'EDRPG_SYSTEM.Ability.HvyWeap.long',
  kinWeap:  'EDRPG_SYSTEM.Ability.KinWeap.long',
  melWeap:  'EDRPG_SYSTEM.Ability.MelWeap.long',
  parry:    'EDRPG_SYSTEM.Ability.Parry.long',
};

EDRPG_SYSTEM.abilityGroupAbbreviations.personalCombat = {
  dodge:    'EDRPG_SYSTEM.Ability.Dodge.abbr',
  enWeap:   'EDRPG_SYSTEM.Ability.EnWeap.abbr',
  fighting: 'EDRPG_SYSTEM.Ability.Fighting.abbr',
  grenade:  'EDRPG_SYSTEM.Ability.Grenade.abbr',
  hvyWeap:  'EDRPG_SYSTEM.Ability.HvyWeap.abbr',
  kinWeap:  'EDRPG_SYSTEM.Ability.KinWeap.abbr',
  melWeap:  'EDRPG_SYSTEM.Ability.MelWeap.abbr',
  parry:    'EDRPG_SYSTEM.Ability.Parry.abbr',
};

EDRPG_SYSTEM.abilityGroups.intelligence = {
  comp:     'EDRPG_SYSTEM.Ability.Comp.long',
  cultLaw:  'EDRPG_SYSTEM.Ability.CultLaw.long',
  cyber:    'EDRPG_SYSTEM.Ability.Cyber.long',
  med:      'EDRPG_SYSTEM.Ability.Med.long',
  planKnow: 'EDRPG_SYSTEM.Ability.PlanKnow.long',
  science:  'EDRPG_SYSTEM.Ability.Science.long',
  tact:     'EDRPG_SYSTEM.Ability.Tact.long',
  trad:     'EDRPG_SYSTEM.Ability.Trad.long'
};

EDRPG_SYSTEM.abilityGroupAbbreviations.intelligence = {
  comp:     'EDRPG_SYSTEM.Ability.Comp.abbr',
  cultLaw:  'EDRPG_SYSTEM.Ability.CultLaw.abbr',
  cyber:    'EDRPG_SYSTEM.Ability.Cyber.abbr',
  med:      'EDRPG_SYSTEM.Ability.Med.abbr',
  planKnow: 'EDRPG_SYSTEM.Ability.PlanKnow.abbr',
  science:  'EDRPG_SYSTEM.Ability.Science.abbr',
  tact:     'EDRPG_SYSTEM.Ability.Tact.abbr',
  trad:     'EDRPG_SYSTEM.Ability.Trad.abbr'
};