export function getStateKeyFromApiPath(apiPath) {
  return apiPath
      .replace(/^\/|\/$/g, '')
      .split('?')[0]
      .split('/')[0]
}

export function getStateKeyFromUrl(url) {
  const apiPath = url.split('/').slice(3).join('/')
  return getStateKeyFromApiPath(apiPath)
}

export function getStateKeyFromConfig(config) {
  const { apiPath, url } = config

  const stateKey = config.stateKey ||
    (apiPath && getStateKeyFromApiPath(apiPath)) ||
    (url && getStateKeyFromUrl(url))

  return stateKey
}
