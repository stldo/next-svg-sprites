module.exports = function DisableCacheForSvg (source) {
  this.cacheable(false)
  return source
}
