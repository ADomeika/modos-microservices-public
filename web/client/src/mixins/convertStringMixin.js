export const convertStringMixin = {
  methods: {
    convertString (phrase) {
      var maxLength = 100
      var str = phrase.toLowerCase()
      var charMap = {
        'ą': 'a',
        'č': 'c',
        'ę': 'e',
        'ė': 'e',
        'į': 'i',
        'š': 's',
        'ų': 'u',
        'ū': 'u',
        'ž': 'z'
      }
      var rx = /(ą|č|ę|ė|į|š|ų|ū|ž)/g
      if (rx.test(str)) {
        str = str.replace(rx, function (m, key, index) {
          return charMap[key]
        })
      }
      str = str.replace(/[^a-z\d\s-]/gi, '')
      str = str.replace(/[\s-]+/g, ' ')
      str.replace(/^\s+|\s+$/g, '')
      str = str.substring(0, str.length <= maxLength ? str.length : maxLength)
      str = str.replace(/\s/g, '-')
      return str
    }
  }
}
