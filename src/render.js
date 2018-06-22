import mainTemplate from './src/templates/main.html!text'
import headerTemplate from './src/templates/header.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'

var partialTemplates = {
	"header": headerTemplate
};

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1AEhtpkEcq5qVl2R9xvgC1wPjOtMrBHcdlWl5u2n3kvI.json',
        json: true
    }).then((data) => {
        var sheets = data;
        var chapters = data.chapters.length;
        var html;
        for(var i = 0; i < chapters; i++) {
            console.log(sheets.chapters[i].copy);
        }

        var html = Mustache.render(mainTemplate, sheets, partialTemplates);
        return html;
    });
}
