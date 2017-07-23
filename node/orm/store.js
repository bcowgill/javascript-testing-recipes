var redis = require("redis")

module.exports = {
  configure: function(config) {
    this._conn = redis.createClient(config.port, config.host)
    this._conn.select(config.database)
  },

  getConnection: function() {
    return this._conn
  }
}

