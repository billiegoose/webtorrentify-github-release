#!/usr/bin/env node
var fs = require('fs')
var minimisted = require('minimisted')
var putasset = require('putasset')
var ghUrl = require('github-url-to-object')
var webtorrentifyGithubRelease = require('./index')

minimisted(function (args) {
  var _ = args._
  var owner, repo, version, torrentName
  
  // Read details from package.json
  if (_.length === 0 && fs.existsSync('package.json')) {
    try {
      var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    } catch (err) {
      exitWithError(new Error('Could not read ./package.json'))
    }
    var gh = ghUrl(pkg.repository)
    owner = gh.user
    repo = gh.repo
    version = 'v' + pkg.version
  } else if ((_.length === 3)) {
    owner = _[0]
    repo = _[1]
    version = _[2]
  } else {
    return console.log('Usage: PUTASSET_TOKEN=$GITHUB_TOKEN webtorrentify-github-release [user] [repo] [version]')
  }
  var torrentName = repo + '-' + version + '.torrent'
  
  webtorrentifyGithubRelease(owner, repo, version, torrentName)
  .then(function (buffer) {
    fs.writeFileSync(torrentName, buffer)
    if (process.env.PUTASSET_TOKEN) {
      putasset(process.env.PUTASSET_TOKEN, {
        owner: owner,
        repo: repo,
        tag: version,
        filename: torrentName
      },
      function (err) {
        if (err) return exitWithError(err)
        console.log('Uploaded .torrent to Github.')
      })
    } else {
      console.log('No PUTASSET_TOKEN environment variable provided so skipping upload to Github.')
    }
  })
  .catch(exitWithError)
})

function exitWithError (err) {
  console.log(err)
  process.exit(1)
}
