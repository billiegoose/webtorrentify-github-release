# webtorrentify-github-release ALPHA
Generate a .torrent file corresponding to a particular Github Release

## Why?

Distributing your application over WebTorrent/BitTorrent is cool! 😎

It can improve reliability and save money:

- Your application can still be downloaded if Github gets blocked, goes down, or kicks you off\*
- You save Github 💲 by placing less demand on Github's AWS storage servers! ❤️

\* as long as the torrent is being seeded

## How?

This tool makes it easy to add a .torrent file to your *existing* Github Releases!

It downloads the files associated with a particular [Github Release](https://help.github.com/articles/about-releases/) and creates a torrent file for them.
If you provide a Github OAuth token in the environment variable, it will add the torrent file to your release for you.

You don't even have to add any new code or change your CI deployment process.
You can try it first and see if you like it, and only automate it later.

TODO: Simplify seeding the result.

## Installation

```sh
npm install webtorrentify-github-release --global
```

## Usage

```sh
webtorrentify-github-release [owner] [repo] [version] [--upload]
```

If you don't specify `owner`, `repo`, or `version` it will try to obtain them from `package.json` in the current working directory.

Otherwise

- `owner` is the Github username or name.
- `repo` is the repository name.
- `version` is the release to use. It must exactly match the git tag.

If `--upload` is used, it will create a Github OAuth token using [`ghauth`](https://npmjs.com/package/ghauth) or reuse one previously saved by [`gh-release`](https://npmjs.com/package/gh-release), and use [putasset](https://www.npmjs.com/package/putasset) to upload the `.torrent` file to your release.

The Github Release files are downloaded to a temporary directory and deleted afterwards.
The torrent file is saved in the current working directory and named `${repo}-${version}.torrent`.
If there was a problem it will exit with a non-zero exit code.

## Examples


```sh
> cd mymodule
> webtorrentify-github-release
Downloading wmhilton/mymodule@v0.0.1...
RELEASES                 ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
Skipping upload to Github because the --upload flag wasn\'t used.
> ls
mymodule-v0.0.2.torrent
```

Publishing torrent to Github the first time:

```
> webtorrentify-github-release --upload
Downloading wmhilton/mymodule@v0.0.2...
RELEASES                 ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
Your GitHub username: wmhilton
Your GitHub password: ✔✔✔✔✔✔✔✔✔

Your GitHub OTP/2FA Code (optional): ******
Uploaded .torrent to Github.
```

Subsequent usage:

```sh
> webtorrentify-github-release --upload
Downloading wmhilton/mymodule@v0.0.3...
RELEASES                 ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 0.0s
Uploaded .torrent to Github.
```

## Automated usage

Install it as a dev dependency and add a script in your package.json

```json
"devDependencies": {
  "webtorrentify-github-release": "1.x"
},
"scripts": {
  "deploy:torrent": "webtorrentify-github-release"
}
```

Then you can run it using "npm run deploy:torrent".

## License

Copyright 2017 William Hilton.
Licensed under [The Unlicense](http://unlicense.org/).
