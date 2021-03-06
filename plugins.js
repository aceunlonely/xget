var fs = require('fs'),stat = fs.statSync
var path = require('path')
var util = require('./util')
var config = require('peeriocjs').module("xget").invoke.sync.config()

var ioc = require('peeriocjs')


var isDir = function (p) {
    stat = fs.lstatSync(p);
    return stat.isDirectory();
};
    
var pluginsPath = config.pluginsPath || ( __dirname + "/plugins" )

var innerLoad =(p,m,notOverride)=>{
    fs.readdir(p,(err,files)=>{
        if(err){
            if(config.verbose)
                console.warn("xget-plugins: 读取路径出错：" + p  + " " + err)
        }else{
            files.forEach(filename=>{
                var rPath = path.join(p,filename)
                if(isDir(rPath)){
                    ////注册方法
                    var fn = require(rPath).run
                    if(!fn)
                        throw Error("xget-plugins: 插件必须实现exports.run方法:" + rPath )
                    ////注册方法
                    ioc.module(m).reg(filename,fn,null,notOverride)
                }else if(util.endWith(filename,".js")){
                    ////注册方法
                    var fn = require(rPath).run
                    if(!fn)
                        throw Error("xget-plugins: 插件必须实现exports.run方法:" + rPath )
                    ioc.module(m).reg(util.endTrim(filename,".js"),fn,null,notOverride)
                }
                else{
                    if(config.verbose){
                        console.log("xget-plugins:[" +rPath + "] is not file or dir wanted")
                    }
                }
            })
        }
    })
}

//load plugins
//load integrate
innerLoad(pluginsPath + "/integrate/input", "xget_input",true)
innerLoad(pluginsPath + "/integrate/finder", "xget_finder",true)
innerLoad(pluginsPath + "/integrate/extractor", "xget_extractor",true)
//load ext 
innerLoad(pluginsPath + "/ext/input", "xget_input",false)
innerLoad(pluginsPath + "/ext/finder", "xget_finder",false)
innerLoad(pluginsPath + "/ext/extractor", "xget_extractor",false)

