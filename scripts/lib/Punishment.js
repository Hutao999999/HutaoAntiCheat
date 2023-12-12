export class Punishment {
  static getText() {
    return `<ban/kick/tempkick/notify/none>`
  }

  static getAll() {
    return [
      "ban",
      "kick",
      "tempkick",
      "notify",
      "none"
    ]
  }
}