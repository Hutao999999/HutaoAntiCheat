const amount = 11
const string = "ItemCheck"

let origin = {
  change: {
    "commandAntiCheat{change}{type}Setting": "§6{change} {type} §7setting",
    "closeTheChatBarToOpen{change}{type}Menu": "Close the chat bar to open §6{change} {type} §7menu",
    "commandOpen{change}{type}Menu": "Open §6{change} {type} §7menu",
  },
  once: {
    "commandOpen{change}Menu": `Open §6{change} §7menu`,
  }
}

const strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const result = []

console.clear()
origin = JSON.parse(JSON.stringify(origin).replaceAll("{change}", string))

for (let i = 0; i < amount; i++) {
  for (let j = 0; j < 3; j++) {
    const item = JSON.parse(JSON.stringify(origin).replaceAll("{type}", strings[i]))

    result.push(`${Object.entries(item.change)[j][0]}: "${Object.entries(item.change)[j][1]}",`)
  }
}

result.push(`${Object.entries(origin.once)[0][0]}: "${Object.entries(origin.once)[0][1]}",`)

console.log(result.join("\n"))