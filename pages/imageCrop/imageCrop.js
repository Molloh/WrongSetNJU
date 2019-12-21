var t = void 0, a = void 0, e = (wx.getSystemInfoSync().pixelRatio, void 0), o = void 0, c = void 0, i = void 0, n = void 0, s = void 0, h = void 0, u = void 0, d = void 0, r = 750 / wx.getSystemInfoSync().windowWidth, g = 200, p = void 0;const app=getApp();
Page({
  data: {
    imageSrc: "",
    isShowImg: !1,
    cropperInitW: 750,
    cropperInitH: 750,
    cropperW: 750,
    cropperH: 750,
    cropperL: 0,
    cropperT: 0,
    scaleP: 0,
    cutL: 0,
    cutT: 0,
    cutB: 750,
    cutR: "100%",
    qualityWidth: p,
    innerAspectRadio: r,
    isShowBox: "Y",
    own: ""
  },
  onLoad: function (t) {
    wx.setNavigationBarColor && wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#f87f07"
    }), t.path && this.setData({
      imageSrc: t.path
    }), t.own && this.setData({
      own: t.own
    });
  },
  onReady: function () {
    this.loadImage();
  },
  getImage: function () {
    var t = this;
    wx.chooseImage({
      success: function (a) {
        t.setData({
          imageSrc: a.tempFilePaths[0],
          isShowBox: "Y"
        }), t.loadImage();
      }
    });
  },
  loadImage: function () {
    var t = this;
    wx.showLoading({
      title: "图片加载中..."
    }), wx.getImageInfo({
      src: t.data.imageSrc,
      success: function (a) {
        p = u = a.width, d = a.height, h = u / d;
        var e = u > d ? u : d;
        g = e > g ? g : e, h >= 1 ? t.setData({
          cropperW: 750,
          cropperH: 750 / h,
          cropperL: Math.ceil(0),
          cropperT: Math.ceil((750 - 750 / h) / 2),
          cutL: Math.ceil((0 + g) / 2),
          cutT: Math.ceil((750 / h - (750 / h - g)) / 2),
          cutR: Math.ceil((0 + g) / 2),
          cutB: Math.ceil((750 / h - (750 / h - g)) / 2),
          scaleP: u / 750,
          qualityWidth: p,
          innerAspectRadio: h
        }) : t.setData({
          cropperW: 750 * h,
          cropperH: 750,
          cropperL: Math.ceil((750 - 750 * h) / 2),
          cropperT: Math.ceil(0),
          cutL: Math.ceil((750 * h - 750 * h) / 2),
          cutT: Math.ceil((750 - g) / 2),
          cutB: Math.ceil((750 - g) / 2),
          cutR: Math.ceil((750 * h - 750 * h) / 2),
          scaleP: u / 750,
          qualityWidth: p,
          innerAspectRadio: h
        }), t.setData({
          isShowImg: !0
        }), wx.hideLoading();
      }
    });
  },
  contentStartMove: function (e) {
    t = e.touches[0].pageX, a = e.touches[0].pageY;
  },
  contentMoveing: function (e) {
    var o = (t - e.touches[0].pageX) * r, c = (a - e.touches[0].pageY) * r;
    o > 0 ? this.data.cutL - o < 0 && (o = this.data.cutL) : this.data.cutR + o < 0 && (o = -this.data.cutR),
      c > 0 ? this.data.cutT - c < 0 && (c = this.data.cutT) : this.data.cutB + c < 0 && (c = -this.data.cutB),
      this.setData({
        cutL: this.data.cutL - o,
        cutT: this.data.cutT - c,
        cutR: this.data.cutR + o,
        cutB: this.data.cutB + c
      }), t = e.touches[0].pageX, a = e.touches[0].pageY;
  },
  contentTouchEnd: function () { },
  cropImage: function () {
    var t = this;
    wx.showLoading({
      title: "图片生成中..."
    });
    var a = wx.createCanvasContext("myCanvas");
    a.drawImage(t.data.imageSrc, 0, 0, u, d), a.draw(!0, function () {
      var a = (t.data.cropperW - t.data.cutL - t.data.cutR) / t.data.cropperW * u, e = (t.data.cropperH - t.data.cutT - t.data.cutB) / t.data.cropperH * d, o = t.data.cutL / t.data.cropperW * u, c = t.data.cutT / t.data.cropperH * d;
      wx.canvasToTempFilePath({
        x: o,
        y: c,
        width: a,
        height: e,
        destWidth: a,
        destHeight: e,
        quality: .1,
        canvasId: "myCanvas",
        success: function (a) {
          wx.hideLoading(), console.log(a), t.setData({
            imageSrc: a.tempFilePath,
            isShowBox: "N"
          }), t.loadImage(), "listDetail" == t.data.own && (t.changeListDeatil(a.tempFilePath),
          app.globalData.imageurl=this.data.imageSrc,
            wx.navigateBack({
              delta: 1
            }));
        }
      });
    });
  },
  changeListDeatil: function (t) {
    var a = getCurrentPages(), e = a[a.length - 2];
    e.setData({
      back: !0
    }), e.data.pageData.currentImg = t;
  },
  saveImage: function () {
    wx.showLoading({
      title: "图片保存中..."
    }), console.log("function:saveImage");
    var t = this, a = wx.createCanvasContext("myCanvas");
    a.drawImage(t.data.imageSrc, 0, 0, u, d), a.draw(!0, function () {
      wx.canvasGetImageData({
        canvasId: "myCanvas",
        x: 0,
        y: 0,
        width: u,
        height: d,
        success: function (a) {
          console.log("canvasGetImageData>>>>>>>>>"), console.log(a), console.log("<<<<<<<<<canvasGetImageData"),
            t.doChangeImage(a);
        },
        fail: function (a) {
          wx.hideLoading(), t.jumpToNext(t.data.imageSrc);
        }
      });
    });
  },
  jumpToNext: function (t) {
    
    app.globalData.imageurl=t;
    
    wx.navigateTo({
       url: "/pages/camera/index?path"
    });
    
  },
  doChangeImage: function (t) {
    console.log("function:doChangeImage");
    for (var a = this, e = t.data, o = 0; o < e.length; o += 4) {
      var c = e[o], i = e[o + 1], n = e[o + 2], s = e[o + 3];
      (c + i + n) / 3 > 127.5 ? (e[o] = 255, e[o + 1] = 255, e[o + 2] = 255, e[o + 3] = s) : (e[o] = 0,
        e[o + 1] = 0, e[o + 2] = 0, e[o + 3] = s);
    }
    wx.canvasPutImageData({
      canvasId: "myCanvas",
      data: e,
      x: 0,
      y: 0,
      width: u,
      success: function (t) {
        console.log("canvasPutImageData>>>>>>>>"), console.log(t), console.log("<<<<<<<<canvasPutImageData"),
          a.getTempImage();
      },
      fail: function (t) {
        wx.hideLoading(), a.jumpToNext(a.data.imageSrc);
      }
    });
  },
  getTempImage: function () {
    console.log("function:getTempImage");
    var t = this;
    wx.createCanvasContext("myCanvas");
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: u,
      height: d,
      destWidth: u,
      destHeight: d,
      quality: 1,
      canvasId: "myCanvas",
      success: function (a) {
        wx.hideLoading(), console.log("canvasToTempFilePath>>>>>>>>"), console.log(a), console.log("<<<<<<<<canvasToTempFilePath"),
          t.jumpToNext(a.tempFilePath);
      },
      fail: function (a) {
        wx.hideLoading(), t.jumpToNext(t.data.imageSrc);
      }
    });
  },
  dragStart: function (t) {
    e = t.touches[0].pageX, o = t.touches[0].pageY, c = this.data.cutL, n = this.data.cutR,
      s = this.data.cutB, i = this.data.cutT;
  },
  dragMove: function (t) {
    switch (t.target.dataset.drag) {
      case "right":
        a = (e - t.touches[0].pageX) * r;
        n + a < 0 && (a = -n), this.setData({
          cutR: n + a
        });
        break;

      case "left":
        a = (e - t.touches[0].pageX) * r;
        c - a < 0 && (a = c), c - a > this.data.cropperW - this.data.cutR && (a = c - (this.data.cropperW - this.data.cutR)),
          this.setData({
            cutL: c - a
          });
        break;

      case "top":
        a = (o - t.touches[0].pageY) * r;
        i - a < 0 && (a = i), i - a > this.data.cropperH - this.data.cutB && (a = i - (this.data.cropperH - this.data.cutB)),
          this.setData({
            cutT: i - a
          });
        break;

      case "bottom":
        var a = (o - t.touches[0].pageY) * r;
        s + a < 0 && (a = -s), this.setData({
          cutB: s + a
        });
        break;

      case "rightBottom":
        var h = (e - t.touches[0].pageX) * r, u = (o - t.touches[0].pageY) * r;
        s + u < 0 && (u = -s), n + h < 0 && (h = -n), this.setData({
          cutB: s + u,
          cutR: n + h
        });
    }
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});