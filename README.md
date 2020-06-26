mobx是很好，很容易理解的状态管理工具

先讲一下这个案例是做TODOlist的案例，利用antd样式，用mobx做的状态管理

具体效果如下

![5ef5a3af7d15c_5ef5a3afc2ef5.gif](https://upload-images.jianshu.io/upload_images/1379609-7bf33b4973a55ec3.gif?imageMogr2/auto-orient/strip)

项目案例源码：
[https://github.com/xiaqijian/react-mobx-demo](https://github.com/xiaqijian/react-mobx-demo)


1.初始化项目
--
第一步用create-react-app初始化一个项目，并打开webpack配置项

```
npx create-react-app react-mobx-demo

cd react-mobx-demo

npm run eject
```

2.配置支持修饰符
--
目前初始化的项目是不支持修饰符的，安装相关依赖
 
```
cnpm install --save-dev @babel/plugin-proposal-decorators
cnpm install --save-dev @babel/plugin-proposal-class-properties
```
上面安装好之后，找到项目中package.json文件修改如下

```json

.....
"babel": {
   // 新增
    "plugins": [
       [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  },

```
找到babel添加plugins就可以了’

3.安装antd和mobx
--

这一步没有什么特别，安装就行
```
yarn add antd
yarn add mobx
yarn add mobx-react
```
4.修改src目录下面的文件
--
新建todolist.js, mobx。。。

最终目录如下

![image.png](https://upload-images.jianshu.io/upload_images/1379609-460719967f020e79.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面贴代码

#### mobx/index.js代码

```

import { observable, action, computed } from 'mobx'

class Store {
  @observable Inputvalue = ''
  @observable listdata = [
    '2222223344',
    '2222223344',
    '2222223344',
    '2222223344',
    '2222223344'
  ]
  @action
  changeInput (value) {
     this.Inputvalue = value
    //  console.log(value)
  }

  @computed
  get todolen () {
    return this.listdata.length
  }


  @action
  addTodo () {
    this.listdata = [this.Inputvalue].concat(this.listdata)
    // let arr = this.listdata
    // this.listdata = arr.unshift(this.Inputvalue)
    this.Inputvalue = ""
    console.log(this.Inputvalue)
  }
  @action
  deletodo (index) {
    this.listdata.splice(index,1)
  }
}

export default new Store()
```
#### Todolist.js代码

```
import React, { useEffect} from 'react'
import { Button, Input, List} from 'antd'
import { inject, observer} from 'mobx-react'

// const data = [
//   '22222',
//   '22222',
//   '22222',
//   '22222',
//   '22222'
// ]



const Todolist = inject("store")(observer(({ store}) => {
  useEffect(()=>{
    console.log(store)
  })
  return (
    <div style={{ padding: '10px' }}>
      <div>
        <Input
          onChange={(e)=> { store.changeInput(e.target.value)}}
          style={{ width: '500px', marginRight: '10px' }}
          value={store.Inputvalue}
          placeholder="输入内容"
        />
        <Button type="primary" onClick={() => { store.addTodo()}}>添加</Button>
      </div>
      <i>一共有{store.todolen}条</i>
      <div style={{ width: '500px', marginTop: '10px' }}>
        <List
          dataSource={store.listdata}
          bordered
          renderItem={(item, index) => (
            <List.Item
              actions={[<div onClick={()=> { store.deletodo(index)}}>删除</div>]}
            >{item}</List.Item>
          )}
        />
      </div>
    </div>
  )
}))




export default Todolist
```
其他文件的代码具体去GitHub上看地址：
[https://github.com/xiaqijian/react-mobx-demo](https://github.com/xiaqijian/react-mobx-demo)


5.mobx如何使用
--
大白话意思就是这样子的：

mobx中有个observable方法是监听变量的
mobx中有个action是修改observable中的变量的
mobx中有个observer是讲监听变量变化，告诉给视图

具体更加详细的内容，看mobx文档