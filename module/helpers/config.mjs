export const EDRPG_SYSTEM = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
EDRPG_SYSTEM.abilities = {
  str: 'EDRPG_SYSTEM.Ability.Str.long',
  dex: 'EDRPG_SYSTEM.Ability.Dex.long',
  con: 'EDRPG_SYSTEM.Ability.Con.long',
  int: 'EDRPG_SYSTEM.Ability.Int.long',
  wis: 'EDRPG_SYSTEM.Ability.Wis.long',
  cha: 'EDRPG_SYSTEM.Ability.Cha.long',
};

EDRPG_SYSTEM.abilityAbbreviations = {
  str: 'EDRPG_SYSTEM.Ability.Str.abbr',
  dex: 'EDRPG_SYSTEM.Ability.Dex.abbr',
  con: 'EDRPG_SYSTEM.Ability.Con.abbr',
  int: 'EDRPG_SYSTEM.Ability.Int.abbr',
  wis: 'EDRPG_SYSTEM.Ability.Wis.abbr',
  cha: 'EDRPG_SYSTEM.Ability.Cha.abbr',
};

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