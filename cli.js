import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { searchArtistByKeyboard, showKeywordHistory } from './app.js';

const cli = yargs(hideBin(process.argv));

cli.command(
    'search <keyboard>',
    'Search for an artist or band with a keyword(s)',
    (yargs) => {
        yargs.positional('keyword' , {
            desrcibe: 'The keyword to search for is: ',
            type: 'string',
    });
    },
    (argv) => {
        searchArtistByKeyboard(argv.keyword);
    }
);

cli.command(
    'history <type>',
    'View your history of searches and or selections',
    (yargs) => {
        yargs.positional('type', {
            desrcibe: 'Choose between keywords or selections',
            choices: ['keywords'],
        });
    },
    (argv) => {
        if (argv.type === 'keywords') {
            showKeywordHistory();
    }

}
);

cli.help().argv;