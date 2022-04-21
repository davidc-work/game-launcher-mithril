const parseACF = acf => {
    const spl = acf.split('"').reduce((a, b, i) => {
        if (i % 2) a.push(b);

        return a;
    }, []);

    const a = spl.findIndex(e => e == 'InstalledDepots'), b = spl.findIndex(e => e == 'UserConfig');
    spl.splice(a, b - a + 1);

    let result = {};

    spl.splice(0, 1);
    while (spl.length) {
        result[spl[0]] = spl[1];
        spl.splice(0, 2);
    }

    return result;
}

module.exports = parseACF;