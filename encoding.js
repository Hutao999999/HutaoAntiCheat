const split = (message, key) => {
  let replacer = []
  let changer = []

  for (let i = 0; i < message.length; i++) {
    changer.push(message[i])

    if ((i + 1) % key == 0) {
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

const strings = "i1ltI|!T[]"

const numbers = [2, 3, 7]

const encode = (message) => {
  message = split(message.split("").map(string => String(string.charCodeAt())).map(string => `0`.repeat(4 - string.length) + string).join(""), 2).map(string => Number(string))

  for (const number of numbers) {
    for (let i = 0; i < message.length; i++) {
      message[i] *= number
    }

    numbers.reverse()
  }

  message = message.map(string => String(string)).map(string => `0`.repeat(4 - string.length) + string).join("").split("").map(string => strings[string])

  return message.join("")
}

const decode = (message) => {
  message = split(message.split("").map(string => strings.indexOf(string)).join(""), 4).map(string => Number(string))

  numbers.reverse()

  for (const number of numbers) {
    for (let i = 0; i < message.length; i++) {
      message[i] /= number
    }

    numbers.reverse()
  }

  message = split(message.map(string => String(string)).map(string => `0`.repeat(2 - string.length) + string).join(""), 4).map(string => String.fromCharCode(string))

  return message.join("")
}

const message = "I am BlueBoot6336422"

console.log(`Encoding String: `, encode(message))
console.log(`Decode String: `, decode(encode(message)))