export class Tools {
  static repair(array) {
    return array.sort()
  }

  static betterNumberToTen(number) {
    if (number < 10) number = `0${number}`

    return number
  }

  static betterNumberToHundred(number) {
    if (number < 10) number = `00${number}`
    else if (number < 100) number = `0${number}`

    return number
  }

  static average(array) {
    let numbers = 0

    for (const num of array) {
      numbers += num
    }

    return numbers / array.length
  }
}