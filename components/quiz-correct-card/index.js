// components/quiz-correct-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    date: String,
    isCorrect: Boolean,
    picture: String,
    desc: String,
    answer: String,
    myAnswer: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    radioItem: [
      {
        id: 0,
        name: "×"
      },
      {
        id: 1,
        name: "√"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCorrectAnswer(e) {
      let { currentKey } = { ...e.detail }
      this.triggerEvent(
        'correctEvent', {
          index: this.properties.index,
          isCorrect: currentKey>0 ? true : false 
        }
      );
    }
  }
})
