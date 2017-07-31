var JS = require("../../jstest-skip")
require("./server_spec")
require("./server_mock_spec")
require("./header_matcher_spec")
require("./json_matcher_spec")
require("./server_matcher_spec")
require("./alternate_server_mock_spec")
JS.Test.autorun()

