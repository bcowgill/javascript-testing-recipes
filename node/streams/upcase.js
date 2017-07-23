process.stdin.on("data", function(chunk) {
  chunk = chunk.toString("utf8").toUpperCase()
  process.stdout.write(chunk)
})

