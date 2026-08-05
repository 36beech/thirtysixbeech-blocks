#!/usr/bin/env node

/**
 * Symlinks the plugin and theme in this repo into a WordPress install's
 * wp-content/plugins and wp-content/themes folders (macOS).
 *
 * Usage:
 *   node tools/create-symlink.js /path/to/site-root
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

const LINKS = [
	{
		source: path.join(REPO_ROOT, 'plugins', 'thirtysixbeech-blocks'),
		destDir: 'wp-content/plugins',
		name: 'thirtysixbeech-blocks',
	},
	{
		source: path.join(REPO_ROOT, 'themes', 'thirtysixbeech-base'),
		destDir: 'wp-content/themes',
		name: 'thirtysixbeech-base',
	},
];

function fail(message) {
	console.error(`Error: ${message}`);
	process.exit(1);
}

function createSymlink({ source, destDir, name }, siteRoot) {
	if (!fs.existsSync(source)) {
		fail(`Source not found: ${source}`);
	}

	const targetDir = path.join(siteRoot, destDir);
	if (!fs.existsSync(targetDir)) {
		fail(`Destination folder not found: ${targetDir}`);
	}

	const linkPath = path.join(targetDir, name);
	const stats = fs.lstatSync(linkPath, { throwIfNoEntry: false });

	if (stats) {
		if (stats.isSymbolicLink()) {
			const currentTarget = fs.realpathSync(linkPath);
			if (currentTarget === fs.realpathSync(source)) {
				console.log(`Already linked: ${linkPath}`);
				return;
			}
			fail(`${linkPath} is already a symlink pointing elsewhere (${currentTarget}). Remove it manually and re-run.`);
		}
		fail(`${linkPath} already exists and is not a symlink. Remove it manually and re-run.`);
	}

	fs.symlinkSync(source, linkPath, 'dir');
	console.log(`Linked: ${linkPath} -> ${source}`);
}

function main() {
	const siteRootArg = process.argv[2];
	if (!siteRootArg) {
		fail('Missing site root path.\nUsage: node tools/create-symlink.js /path/to/site-root');
	}

	const siteRoot = path.resolve(siteRootArg);
	if (!fs.existsSync(siteRoot)) {
		fail(`Site root not found: ${siteRoot}`);
	}

	for (const link of LINKS) {
		createSymlink(link, siteRoot);
	}
}

main();
