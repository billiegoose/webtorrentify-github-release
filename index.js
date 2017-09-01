const downloadRelease = require('download-github-release')
const createTorrent = require('create-torrent')
const temp = require('temp').track()

module.exports = function (user, repo, version, torrentName) {
  torrentName = torrentName || repo + '-' + version + '.torrent'
  var filterRelease = function (release) {
    return (release.tag_name === version)
  }
  var filterAsset = function (asset) {
    return (asset.name !== torrentName)
  }
  return new Promise(function (resolve, reject) {
    temp.mkdir(torrentName, function (err, dir) {
      if (err) return reject(err)
      downloadRelease(user, repo, dir, filterRelease, filterAsset, false)
      .then(function () {
        createTorrent(dir, {name: torrentName}, function (err, torrent) {
          if (err) return reject(err)
          resolve(torrent)
        })
      }).catch(reject)
    })
  })
}
