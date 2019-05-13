const load = module => {
  const MODULE_META_KEYS = ['__esModule'];

  const moduleFields = Object.keys(module).reduce((total, key) => {
    if (!MODULE_META_KEYS.includes(key)) {
      return total.concat(module[key]);
    }
    return total;
  }, []);

  let defaultOrFirstExport;
  if (module.default) {
    defaultOrFirstExport = module.default;
  } else if (moduleFields.length === 1) {
    defaultOrFirstExport = moduleFields[0];
  } else {
    defaultOrFirstExport = module;
  }
  return defaultOrFirstExport;
};
