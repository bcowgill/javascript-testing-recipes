var JS = require("jstest")
require("./spec/register_spec")
require("./spec/register_mock_spec")
require("./spec/redis_error_spec")
require("./spec/post_message_spec")
require("./spec/get_messages_spec")
JS.Test.autorun()

