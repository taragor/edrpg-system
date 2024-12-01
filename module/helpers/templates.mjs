/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/edrpg-system/templates/actor/parts/actor-features.hbs',
    'systems/edrpg-system/templates/actor/parts/actor-items.hbs',
    'systems/edrpg-system/templates/actor/parts/actor-spells.hbs',
    'systems/edrpg-system/templates/actor/parts/actor-karma.hbs',
    'systems/edrpg-system/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/edrpg-system/templates/item/parts/item-effects.hbs',
  ]);
};
