export const EDRPG_SYSTEM = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */

EDRPG_SYSTEM.abilityGroups = {};
EDRPG_SYSTEM.abilityGroupAbbreviations = {};

//Personal Combat
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

//Intelligence
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

//Social Skills
EDRPG_SYSTEM.abilityGroups.socialSkills = {
  bar:      'EDRPG_SYSTEM.Ability.Bar.long',
  bluf:     'EDRPG_SYSTEM.Ability.Bluf.long',
  charm:    'EDRPG_SYSTEM.Ability.Charm.long',
  dipl:     'EDRPG_SYSTEM.Ability.Dipl.long',
  gamb:     'EDRPG_SYSTEM.Ability.Gamb.long',
  insi:     'EDRPG_SYSTEM.Ability.Insi.long',
  intim:    'EDRPG_SYSTEM.Ability.Intim.long',
  street:   'EDRPG_SYSTEM.Ability.Street.long'
};

EDRPG_SYSTEM.abilityGroupAbbreviations.socialSkills = {
  bar:      'EDRPG_SYSTEM.Ability.Bar.abbr',
  bluf:     'EDRPG_SYSTEM.Ability.Bluf.abbr',
  charm:    'EDRPG_SYSTEM.Ability.Charm.abbr',
  dipl:     'EDRPG_SYSTEM.Ability.Dipl.abbr',
  gamb:     'EDRPG_SYSTEM.Ability.Gamb.abbr',
  insi:     'EDRPG_SYSTEM.Ability.Insi.abbr',
  intim:    'EDRPG_SYSTEM.Ability.Intim.abbr',
  street:   'EDRPG_SYSTEM.Ability.Street.abbr'
};

//Vehicle Skills
EDRPG_SYSTEM.abilityGroups.vehicleSkills = {
  navi:     'EDRPG_SYSTEM.Ability.Navi.long',
  rep:      'EDRPG_SYSTEM.Ability.Rep.long',
  spacePilo:'EDRPG_SYSTEM.Ability.SpacePilo.long',
  spaceWeap:'EDRPG_SYSTEM.Ability.SpaceWeap.long',
  syst:     'EDRPG_SYSTEM.Ability.Syst.long',
  vehiPilo: 'EDRPG_SYSTEM.Ability.VehiPilo.long',
  vehiWeap: 'EDRPG_SYSTEM.Ability.VehiWeap.long'
};

EDRPG_SYSTEM.abilityGroupAbbreviations.vehicleSkills = {
  navi:     'EDRPG_SYSTEM.Ability.Navi.abbr',
  rep:      'EDRPG_SYSTEM.Ability.Rep.abbr',
  spacePilo:'EDRPG_SYSTEM.Ability.SpacePilo.abbr',
  spaceWeap:'EDRPG_SYSTEM.Ability.SpaceWeap.abbr',
  syst:     'EDRPG_SYSTEM.Ability.Syst.abbr',
  vehiPilo: 'EDRPG_SYSTEM.Ability.VehiPilo.abbr',
  vehiWeap: 'EDRPG_SYSTEM.Ability.VehiWeap.abbr'
};

//Espionage
EDRPG_SYSTEM.abilityGroups.espionage = {
  athl:     'EDRPG_SYSTEM.Ability.Athl.long',
  perc:     'EDRPG_SYSTEM.Ability.Perc.long',
  secur:    'EDRPG_SYSTEM.Ability.Secur.long',
  slOfHan:  'EDRPG_SYSTEM.Ability.SlOfHan.long',
  steal:    'EDRPG_SYSTEM.Ability.Steal.long',
  surv:     'EDRPG_SYSTEM.Ability.Surv.long'
};

EDRPG_SYSTEM.abilityGroupAbbreviations.espionage = {
  athl:     'EDRPG_SYSTEM.Ability.Athl.long',
  perc:     'EDRPG_SYSTEM.Ability.Perc.long',
  secur:    'EDRPG_SYSTEM.Ability.Secur.long',
  slOfHan:  'EDRPG_SYSTEM.Ability.SlOfHan.long',
  steal:    'EDRPG_SYSTEM.Ability.Steal.long',
  surv:     'EDRPG_SYSTEM.Ability.Surv.long'
};