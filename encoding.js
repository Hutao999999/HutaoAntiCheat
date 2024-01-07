const start = Date.now()

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

const strings = "IiTt1l|!"

const encode = (message) => {
  message = message.split("").map(string => string.charCodeAt(0).toString(2))

  let all = 0

  for (let i = 0; i < message.length; i++) {
    if (message[i].length > 8) {
      const convertedMessage = split(message[i].split("").reverse().join(""), 8).map(string => string.split("").reverse().join("")).map(string => `0`.repeat(8 - string.length) + string).reverse().join("")

      message[i] = `A${convertedMessage}B`
      all += convertedMessage.length + 2
    } else {
      message[i] = `0`.repeat(8 - message[i].length) + message[i]
      all += 8
    }
  }

  while (all % 6 != 0) {
    message.push("00000000")
    all += 8
  }


  message = split(split(message.join(""), 6).map(string => string.split("").map(string => string.charCodeAt(0).toString(2)).map(string => `0`.repeat(8 - string.length) + string).join("")).join(""), 4).map(string => strings[parseInt(string, 2)])

  return message.join("")
}

const decode = (message) => {
  message = split(split(message.split("").map(string => strings.indexOf(string).toString(2)).map(string => `0`.repeat(4 - string.length) + string).join(""), 8).map(string => String.fromCharCode(parseInt(string, 2))).join(""), 8).filter(string => string != "00000000").join("")

  if (true) {
    let is = false
    let result = []
    let other = []
    let current = []

    for (let i = 0; i < message.length; i++) {
      if (message[i] == "A") {
        is = true

        if (other.length > 0) {
          result.push(other.join(""))
          other = []
        }
      } else if (message[i] == "B") {
        is = false

        result.push(`A${current.join("")}B`)
        current = []
      } else {
        if (is) {
          current.push(message[i])
        } else {
          other.push(message[i])
        }
      }
    }

    if (other.length > 0) {
      result.push(other.join(""))
      other = []
    }

    result = result.map(string => string.startsWith("A") ? string.slice(1, string.length - 1) : split(string, 8)).flat().map(string => String.fromCharCode(parseInt(string, 2)))
    message = result
  }

  return message.join("")
}

const string = "aaaa"


const encodeText = encode(string)
const encodeTime = `${((Date.now() - start) / 1000).toFixed(3)}${Math.floor(Math.random() * 9) + 1}`
const encodeTimeShow = (Date.now() - start) / 1000
const decodeText = decode(encodeText)
const decodeTime = `${((Date.now() - start) / 1000 - encodeTimeShow).toFixed(3)}${Math.floor(Math.random() * 9) + 1}`

console.log(encodeText)
console.log(decodeText)
console.log(`Encode Time: ${encodeTime}s`)
console.log(`Decode Time: ${decodeTime}s`)