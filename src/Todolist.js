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