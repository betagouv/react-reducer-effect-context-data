export function configureFetchDataWithRequestFail () {
  fetch.mockResponse(JSON.stringify(
    { global: 'Wrong request for foos' }
  ), { status: 400 })
}

export function configureFetchDataWithRequestSuccess () {
  fetch.mockResponse(JSON.stringify(
    [
      { text: "My foo is here" },
      { test: "My other foo also" }
    ],
  ), { status: 200 })
}
