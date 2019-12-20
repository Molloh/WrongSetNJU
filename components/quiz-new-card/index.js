// components/quiz-new-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    picture: String,
    desc: String,
    date: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeAnswer(e) {
      let { value } = { ...e.detail };
      this.triggerEvent(
        'inputEvent', { 
          myAnswer: value,
          index: this.properties.index
        }
      );
    }
  }
})
