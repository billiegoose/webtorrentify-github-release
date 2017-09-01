#!/usr/bin/env node
var fs = require('fs')
var minimisted = require('minimisted')
var putasset = require('putasset')

var webtorrentifyGithubRelease = require('./index')

minimisted(function (args) {
  var _ = args._
  if (_.length !== 3) return console.log('Usage: webtorrentify-github-release user repo version')
  var torrentName = _[1] + '-' + _[2] + '.torrent'
  webtorrentifyGithubRelease(_[0], _[1], _[2], torrentName)
  .then(function (buffer) {
    fs.writeFileSync(torrentName, buffer)
    if (process.env.PUTASSET_TOKEN) {
      putasset(process.env.PUTASSET_TOKEN, {
        owner: _[0],
        repo: _[1],
        tag: _[2],
        filename: torrentName
      , function (err) {
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
