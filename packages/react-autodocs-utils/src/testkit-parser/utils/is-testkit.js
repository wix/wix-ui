const isTestkit = path => (path.includes('.private') ? false : /\.driver\.(js|ts)x?$/.test(path));

module.exports = isTestkit;
