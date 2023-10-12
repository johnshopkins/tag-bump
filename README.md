# tagbump

Bumps the version of a package, optionally creating the git tag and updating composer.json and/or package.json files.

## Installation

```bash
npm install -g @johnshopkins/tag-bump
```

## Usage
In the root of a project with a Git repository, run the following command to bump the version:

```bash
$ tagbump <major|minor|bugfix>
```

You will be prompted with a couple questions:
1. **Updated composer.json and/or package.json? (y):** Responding `y` (default) updates the composer.json and/or package.json files with the new version, but only if the `version` attribute is already present.
1. **Create the tag now? (y):** Responding `y` (default) creates the tag with Git.
1. **Tag message (Version x.y.z):** Optionally customize the tag message. The default is `Version x.y.z`.

### -y option

```bash
$ tagbump -y <major|minor|bugfix>
```

Pass the `-y` option to automatically use the defaults:
* Updates composer.json and/or package.json
* Creates the tag with the default tag message
