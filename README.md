# webtorrentify-github-release ALPHA
Generate a .torrent file corresponding to a particular Github Release

## Why?

Distributing your application over WebTorrent/BitTorrent is cool!

It can improve reliability and save money:

- Your application can still be downloaded if Github gets blocked, goes down, or kicks you off\*
- You save Github money by placing less demand on Github's AWS storage servers! :heart: Github

\* as long as the torrent is being seeded

## How

This tool makes it easy to add a .torrent file to your *existing* Github Releases!

You don't even have to add any new code or change your CI deployment process.
You can try it first and see if you like it, and only automate it later.

It works by downloading the files associated with a particular [Github Release](https://help.github.com/articles/about-releases/) and create a torrent file for them.
If you provide a Github OAuth token in the environment variable, it will add the torrent file to your release for you.

## Installation

```sh
npm install webtorrentify-github-release --global
```

## Usage

```sh
PUTASSET_TOKEN=$GITHUB_TOKEN webtorrentify-github-release [owner] [repo] [version]
```

If you don't specify `owner`, `repo`, or `version` it will try to obtain them from `package.json` in the current working directory.
If you specify a `PUTASSET_TOKEN` then it will upload the torrent file to Github. Otherwise it will just be saved locally.

Otherwise

- `owner` is the Github username or name.
- `repo` is the repository name.
- `version` is the release to use. It must exactly match the git tag.
- `PUTASSET_TOKEN` is the Github OAuth token that [putasset](https://www.npmjs.com/package/putasset) uses to upload the `.torrent` file to your release.

The Github Release files are downloaded to a temporary directory and deleted afterwards.
The torrent file is saved in the current working directory and named `\`${repo}-${version}.torrent\``.

## License

Copyright 2017 William Hilton.
Licensed under [The Unlicense](http://unlicense.org/).
