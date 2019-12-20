// components/quiz-new-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
      console.log(e);
      this.triggerEvent(
        'onChangeAnswer',
        { tmp: 1 }
      );
    }
  }
})
