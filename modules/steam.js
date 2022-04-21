const getGames = () => {
    const libraryFoldersListPath = steamInstallDir + '\\steamapps\\libraryfolders.vdf';
    const vdf = fs.readFileSync(libraryFoldersListPath).toString();

    const folders = VDF.parse(vdf).libraryfolders;

    let i = 0, games = [];
    while (folders[i]) {
        let p = folders[i].path.replaceAll('\\\\', '\\') + '\\steamapps\\common';
        const gameDirectories = fs.readdirSync(p, { withFileTypes: true }).filter(file => file.isDirectory()).map(file => p + '\\' + file.name);

        gameDirectories.forEach(game => {
            games.push({
                name: path.basename(game),
                fullPath: game,
            });
        });

        p = folders[i].path.replaceAll('\\\\', '\\') + '\\steamapps';
        const files = fs.readdirSync(p).toString().split(',');

        files.forEach(file => {
            if (file.slice(0, 11) == 'appmanifest') {
                const fullPath = p + '\\' + file;
                const manifest = fs.readFileSync(fullPath).toString();

                let parsedManifest = parseACF(manifest);
                parsedManifest.fullPath = p + '\\common\\' + parsedManifest.installdir;

                const targetGame = games.find(game => game.fullPath == parsedManifest.fullPath);
                targetGame.appid = parsedManifest.appid;
                targetGame.name = parsedManifest.name;
            }
        });

        i++;
    }

    return games;
}

module.exports = {
    getGames
}