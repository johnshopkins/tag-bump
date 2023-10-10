# tag-bump

Node module that reports what tag you should create next based on the given release type. Note: this module does not actually create the tag.

### Installation

```bash
cd <directory_to_keep_global_libs>
git clone git@github.com:johnshopkins/tag-bump.git
cd tag-bump
npm install
npm install -g
```

### Usage
In a repository, run one of the following commands to figure out the new tag:

```bash
$ tagbump <major|minor|bugfix>
```
