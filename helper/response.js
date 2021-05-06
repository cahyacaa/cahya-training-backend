module.exports = {
  response: (response, status, msg, data, pagination) => {
    const result = {}
    result.status = status || true
    result.msg = msg
    result.data = data
    return response.status(result.status).send(result)
  }
}
