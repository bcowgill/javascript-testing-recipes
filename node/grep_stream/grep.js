var grep  = require("./grep_stream"),
    query = process.argv[2]

process.stdin
    .pipe(grep(query))
    .pipe(process.stdout)

