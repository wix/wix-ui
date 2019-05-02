// Extracted from
// https://github.com/wix/yoshi/blob/master/packages/create-yoshi-app/src/replaceTemplates.js

const templateRegex = /{%[\w-]+%}/g;

module.exports = (content, map) => {
  function replacer(match) {
    const key = match.slice(2, -2);

    if (!map.hasOwnProperty(key)) {
      throw new Error(`key '${key}' must be one of: [${Object.keys(map)}]`);
    }

    return map[key];
  }

  return content.replace(templateRegex, replacer);
};
