## 核心配置config
```javascript
//easy xgetObjetRequst  xgor
{
    input:" name,age | lily,13 | lucy, 15  | site http://apporoad.com",
    finder: {
        type:"default"
        ...
    },
    extractor:{
        type:"default"
        ...
    },
    output:null
}

//combo xgor
{
    input:" name,age | lily,13 | lucy, 15  | site http://apporoad.com",
    finder: {
        type:"default"
        ...
    },
    extractor:{
        type:"default"
        ...
    },
    output:{
        input:null,
        finder:{
            type:"default"
            ...
        },
        extractor:{
            type:"default"
            ...
        },
        output:null
    }
}

```


## 插件方式实现 finder extractor
插件组件采用peerioc.js
