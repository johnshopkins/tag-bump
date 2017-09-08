# tag-bump

Node module that reports what tag you should create next based on the given release type. Note: this module does not actually create the tag.

### Installation

```bash
git clone git@github.com:johnshopkins/tag-bump.git
cd tag-bump
npm install -g
```

### Usage
In a repository, run one of the following commands to figure out the new tag:

```bash
$ tagbump major
Your new tag is 5.0
Run `git tag -a v5.0 -m "Version 5.0"`

$ tagbump minor
Your new tag is 4.18
Run `git tag -a v4.18 -m "Version 4.18"`

$ tagbump bugfix
Your new tag is 4.17.3
Run `git tag -a v4.17.3 -m "Version 4.17.3"`
```
