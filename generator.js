function gen16id() {
  let result = ''
  for (let i = 0; i < 16; i++) {
    let num = Number(Math.round((Math.random() * 10)-1))
    if (num < 0) {
      num = num * -1
    }
    result += num
  }

  return result
}

console.log(gen16id())