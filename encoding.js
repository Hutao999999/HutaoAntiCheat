const strings = "/abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-[];'.=,\\{}|:\"<>?`~§¥£"

const split = (message, index) => {
  let replacer = []
  let changer = []

  for (let i = 0; i < message.length; i++) {
    changer.push(message[i])

    if ((i + 1) % index == 0) {
      replacer.push(changer.join(""))
      changer = []
    }
  }

  if (changer.length > 0) {
    replacer.push(changer.join(""))
    changer = []
  }

  return replacer
}

const encode = (message, key) => {
  message = split(
    message.split("").map(string => String(key * (string.charCodeAt(0) + key) - key)).map(string => `0`.repeat(32 - string.length) + string).join(""),
    2
  ).map(string => strings[Number(string)]).join("")

  return message
}

const decode = (message, key) => {
  message = split(
    message.split("").map(string => String(strings.indexOf(string))).map(string => `0`.repeat(2 - string.length) + string).join(""),
    32
  ).map(string => String.fromCharCode((Number(string) + key) / key - key)).join("")

  return message
}

const key = 512
const message = "隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀隀"

console.log("Encoding String: ", encode(message, key))
console.log("Decoding String: ", decode(encode(message, key), key))