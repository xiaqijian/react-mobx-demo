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