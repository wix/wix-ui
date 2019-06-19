module.exports = function(hex, opacity = 1) {
    let c;
    let hexRegExp = /^#([A-Fa-f0-9]{3}){1,2}$/;

    if(hexRegExp.test(hex)){
        c = hex.substring(1).split('');

        if(c.length === 3){

            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }

        c = '0x'+c.join('');

        return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
    }

    throw new Error('Bad Hex Color');
};