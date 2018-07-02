/*import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

enableProdMode();

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

const languages = ['es', 'en'];
for (const language of languages) {
	app.get('/' + language + '/*.*', express.static(join(DIST_FOLDER, 'browser', language)));
	app.get('/' + language + '/*', (req, res) => {
		res.render(join(DIST_FOLDER, 'browser', language,  'index.html'), { req });
	});
}

app.listen(PORT, () => {
	console.log(`Node server listening on http://localhost:${PORT}`);
});
*/

import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const LOCALES = [
    {
        id: 'es',
        engine: ngExpressEngine({
            bootstrap: require('main.server.es').AppServerModuleNgFactory,
            providers: [provideModuleMap(require('main.server.es').LAZY_MODULE_MAP)]
        })
    },
    {
        id: 'en',
        engine: ngExpressEngine({
            bootstrap: require('main.server.en').AppServerModuleNgFactory,
            providers: [provideModuleMap(require('main.server.en').LAZY_MODULE_MAP)]
        })
    }
];

const app = express();

// HTML engine using a wrapper to get the correct ngExpressEngine by locale id
app.engine('html', (filePath, options, callback) => {
    options.engine(filePath, { req: options.req, res: options.res }, callback);
});

app.set('view engine', 'html');

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Locale endpoints
LOCALES.forEach(locale => {
    app.get(`/${locale.id}(/*)?`, (req, res) => {
        res.render(join(DIST_FOLDER, 'browser', locale.id, 'index.html'), { req, res, engine: locale.engine });
    });
});

// Redirect to default locale keeping requested path
app.get('*', (req, res) => {
    res.redirect(`/es${req.url}`.replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});
