
export function getConfigWithDefaultValues(config) {
  return Object.assign({
    method: 'GET'
  }, config)
}

export function getTypeSuffixFromConfig(config) {
  const { apiPath, method, stateKey, tag, url } = config
  return `${method}_${stateKey || apiPath || url}${tag ? `_${tag}` : ''}`.toUpperCase()
}
