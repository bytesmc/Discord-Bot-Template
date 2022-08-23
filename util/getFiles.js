const fs = require('fs');

/**
 * Recursively find all javascript files in a directory (and its subdirectories), passing them to @callback.
 * 
 * @param {string} path
 * @param {callback} callback
 */
const getFiles = (path, callback) => {
    fs
    .readdirSync(path)
    .forEach(file => {
        let filepath = `${path}/${file}`;
        if (fs.statSync(filepath).isDirectory()) return getFiles(filepath, callback);

        filepath = filepath.replace(/\\/g, '/');
        if (filepath.endsWith('.js')) callback(filepath.split('/').pop().split('.')[0], filepath);
    });
}

module.exports = getFiles;