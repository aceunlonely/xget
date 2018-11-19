var ioc = require('peeriocjs')

var conf = require('./config.json')

conf.verbose = conf.verbose || false


ioc.module("xget").reg("config",function(){return conf},null,true)

var config = ioc.module("xget").invoke.sync.config()

config.lang  = config.lang || "en"