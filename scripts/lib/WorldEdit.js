export class WorldEdit {
  static getBlock(strings = "") {
    let block = []
    let items = []
    let types = []
    let values = []
    let parantheses = false
    let equal = false

    strings = strings.replaceAll("\"", "")
      .replaceAll("'", "")

    for (const string of strings) {
      if (string == "[") {
        parantheses = true

        continue
      } else if (string == "]") {
        parantheses = false

        if (types.length > 0) {
          let doneValues = values.join("")

          if (doneValues == "true") {
            doneValues = true
          } else if (doneValues == "false") {
            doneValues = false
          } else if (!isNaN(Number(doneValues))) {
            doneValues = Number(doneValues)
          }

          items.push({
            type: types.join(""),
            value: doneValues
          })
        }

        break
      } else if (string == "=") {
        equal = true

        continue
      } else if (string == ",") {
        equal = false

        let doneValues = values.join("")

        if (doneValues == "true") {
          doneValues = true
        } else if (doneValues == "false") {
          doneValues = false
        } else if (!isNaN(Number(doneValues))) {
          doneValues = Number(doneValues)
        }

        items.push({
          type: types.join(""),
          value: doneValues
        })

        continue
      } else {
        if (!parantheses) {
          block.push(string)
        } else {
          if (equal) {
            values.push(string)
          } else {
            types.push(string)
          }
        }
      }
    }

    return {
      block: block.join(""),
      state: items
    }
  }
}