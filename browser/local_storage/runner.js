JS.load(  "../../node_modules/underscore/underscore.js",
          "../../node_modules/backbone/backbone.js",
          "../../vendor/json2.js",

          "./todo_store.js",
          "./todo_store_spec.js",
          "./todo_store_save_spec.js",
          "./todo_store_load_spec.js",
          "./todo_store_remove_spec.js",

          function() { JS.Test.autorun() })

