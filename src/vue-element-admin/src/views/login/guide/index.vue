<!-- 简单说明 1.0版本不实现拖动动画-->
<!-- 以page为单位进行动画，cover页做鼠标监听 -->
<template>
  <div class="boya-login-guide">
    <div class="guide-main">
      <div class="guide-main-page guide-page" id="page-one" :class="cssClass.pageOne">
        <div class="page-container">
          <div class="page-map" :class="cssClass.pageOneBack">
            <img src="../../../assets/img/login_map.png" class="back-center"/>
          </div>
          <div class="page-consensus" :class="cssClass.pageOneImg">
            <img src="../../../assets/img/login_consensus.png" class="img-center"/>
          </div>
        </div>
      </div>
      <div class="guide-main-page guide-page" id="page-two">
        <div class="page-container">
          <div class="page-code" :class="cssClass.pageTwoBack">
            <img src="../../../assets/img/login_code.png" class="back-center"/>
          </div>
        </div>
      </div>
      <div class="guide-main-page guide-page" id="page-three">
        <div class="page-container">
          <div class="page-block" :class="cssClass.pageThreeImg">
            <div class="text-left">区块哈希{{ textLeft.slice(0, 7) }}</div>
            <div class="text-middle">区块哈希{{ textMiddle.slice(0, 7) }}</div>
            <div class="text-right">区块哈希{{ textRight.slice(0, 7) }}</div>
            <img src="../../../assets/img/login_block_hash.png" class="img-center"/>
          </div>
        </div>
      </div>
      <div class="guide-main-page guide-page" id="page-four">
        <div class="page-container">
          <div class="page-hash" :class="cssClass.pageFourImg">
            <img src="../../../assets/img/login_hash.png" class="img-flex-hash"/>
            <img src="../../../assets/img/login_tx.png" class="img-flex-tx"/>
          </div>
        </div>
      </div>
      <div class="guide-main-page guide-page" id="page-five">
        <div class="page-container">
          <div class="page-contract" :class="cssClass.pageFiveImg">
            <img src="../../../assets/img/login_contract.png" class="img-center"/>
          </div>
        </div>
      </div>
      <div class="guide-main-text" :class="step === 0?'text-show':''">
        <div class="guide-main-text-title mb-13">区块链技术</div>
        <div class="guide-main-text-info">区块链技术是密码算法、共识机制、点对点通讯协议、分布式存储等多种核心技术体</div>
        <div class="guide-main-text-info">系高度融合形成的一种分布式基础架构与计算范式。</div>
      </div>
      <div class="guide-main-text" :class="step === 1?'text-show':''">
        <div class="guide-main-text-title mb-13">数据存证</div>
        <div class="guide-main-text-info">数据经过多个节点共识完成后上链存证，具有防篡改、抗抵赖、可溯源的特性。</div>
        <div class="guide-main-text-info"></div>
      </div>
      <div class="guide-main-text" :class="step === 2?'text-show':''">
        <div class="guide-main-text-title mb-13">智能合约</div>
        <div class="guide-main-text-info">是一种旨在以信息化方式传播、验证或执行合同的计算机协议，其在分布式账本上体现为可</div>
        <div class="guide-main-text-info">自动执行的计算机程序。</div>
      </div>
      <div class="guide-main-page guide-main-cover" id="cover">

      </div>
      <div class="page-logo">
        <img src="../../../assets/img/logo_white.png" style="height: 100%"/>
      </div>
    </div>
    <div>
      <div class="page-dots">
        <div class="move-dot l-3" :class="cssClass.moveDot"></div>
        <div class="normal-dot l-0" :class="step !== 0?'dot-show':''" @click="changeStep(0)"><div class="normal-dot-dot"></div></div>
        <div class="normal-dot l-13" :class="cssClass.middleDot" @click="changeStep(1)"><div class="normal-dot-dot"></div></div>
        <div class="normal-dot l-44" :class="step !== 2?'dot-show':''" @click="changeStep(2)"><div class="normal-dot-dot"></div></div>

      </div>
    </div>
    <div class="login-copyright">
      Copyright © 京网信备 11010219285207290022 号
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        step: 0,
        cssClass: {
          pageOne: '',
          pageOneBack: '',
          pageOneImg: 'img-in-one',
          pageTwo: '',
          pageTwoBack: 'back-out-two',
          pageThreeImg: 'img-out-three-one',
          pageFourImg: 'img-out-four-one',
          pageFiveImg: 'img-out-five',
          middleDot: 'middle-dot-one',
          moveDot: '',
        },
        mouseStatus: {
          isDown: false,
          x: 0,
          y: 0,
          isChange: false,
        },
        timer: '',
        textLeft: '',
        textMiddle: '',
        textRight: ''
      }
    },
    mounted() {
      this.getHash()
      this.addMouseEvent()
      this.timer = setInterval(this.changeStepRealTime, 5000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      changeStepRealTime() {
        this.step = (this.step + 1) % 3
        this.changeClass()
      },
      changeStep(num) {
        this.step = num
        this.changeClass()
      },
      changeClass() {
        if (this.step === 0) {
          this.cssClass = {
            pageOne: '',
            pageOneBack: ' ',
            pageOneImg: 'img-in-one',
            pageTwo: '',
            pageTwoBack: 'back-out-two',
            pageThreeImg: 'img-out-three-one',
            pageFourImg: 'img-out-four-one',
            pageFiveImg: 'img-out-five',
            middleDot: 'middle-dot-one',
            moveDot: '',
          }
        } else if (this.step === 1) {
          this.cssClass = {
            pageOne: '',
            pageOneBack: 'back-out-one',
            pageOneImg: 'img-out-one',
            pageTwo: '',
            pageTwoBack: 'back-in-two',
            pageThreeImg: 'img-in-three-one',
            pageFourImg: 'img-in-four',
            pageFiveImg: 'img-out-five',
            middleDot: 'middle-dot-two',
            moveDot: 'move-dot-one',
          }
        } else if (this.step === 2) {
          this.cssClass = {
            pageOne: '',
            pageOneBack: 'back-out-one',
            pageOneImg: 'img-out-one',
            pageTwo: '',
            pageTwoBack: 'back-in-two',
            pageThreeImg: 'img-in-three-two',
            pageFourImg: 'img-out-four-two',
            pageFiveImg: 'img-in-five',
            middleDot: 'middle-dot-three',
            moveDot: 'move-dot-two',
          }
        }
      },
      nextPage() {
        if (this.step < 2) this.step += 1
        this.changeClass()
        return true
      },
      lastPage() {
        if (this.step > 0) this.step -= 1
        this.changeClass()
        return true
      },
      addMouseEvent() {
        const cover = document.getElementById('cover')
        const that = this
        cover.addEventListener('mousedown', function (event) {
          if (event) {
            that.mouseStatus.isDown = true
            that.mouseStatus.x = event.offsetX
            that.mouseStatus.y = event.offsetY
            that.mouseStatus.isChange = false
          }
        })
        cover.addEventListener('mouseup', function (event) {
          if (event) {
            that.mouseStatus.isDown = false
          }
        })
        cover.addEventListener('mousemove', function (event) {
          if (event && that.mouseStatus.isDown) {
            if (!that.mouseStatus.isChange) {
              if (event.offsetX - that.mouseStatus.x > 100) {
                that.mouseStatus.isChange = true
                that.lastPage()
              } else if (that.mouseStatus.x - event.offsetX > 100) {
                that.mouseStatus.isChange = true
                that.nextPage()
              }
            } else {
              //回退
            }
          }
        })
      },
      getHash() {
        this.http.hashshow().then(res => {
          if (res.data.code == '0') {
            this.textLeft = res.data.data.random_hash_0
            this.textMiddle = res.data.data.random_hash_1
            this.textRight = res.data.data.random_hash_2
          } else {
            this.http.messageFun('error', res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @font-face {
    // 区块哈希字体
    font-family: 'hashFont';
    src: url("../font/hashFont.TTF");
  }

  .boya-login-guide {
    position: relative;
    height: 100vh;
    width: 100%;
    background-color: #3B3783;

    .mb-13 {
      margin-bottom: 13px;
    }

    .back-center {
      opacity: 0.3;
      max-width: 100%;
      height: 100%;
      transition: 1s;
    }
    .img-center {
      opacity: 1;
      max-width: 100%;
      height: 100%;
      transition: 1s;
    }
    .img-flex-hash {
      display: inline-flex;
      opacity: 1;
      height: 25.6vh;
      max-width: 100%;
      margin-right: 40px;
      transition: 1s;
    }
    .img-flex-tx {
      display: inline-flex;
      opacity: 1;
      height: 14.6vh;
      max-width: 100%;
      transition: 1s;
    }

    .page-dots {
      width: 52px;
      height: 6px;
      margin: 0 auto;
      position: relative;

      .normal-dot {
        position: absolute;
        cursor: pointer;
        top: 0;
        width: 10px;
        height: 14px;
        padding: 4px 2px;
        transition: 1s;
        opacity: 0;
        z-index: 2;

        .normal-dot-dot {
          width: 6px;
          height: 6px;
          background: #7572A7;
          border-radius: 3px;
        }
      }

      .move-dot {
        position: absolute;
        width: 20px;
        height: 6px;
        background: #FFFFFF;
        top: 4px;
        border-radius: 3px;
        transition: 1s;
        z-index: 4;
      }

      .dot-show {
        opacity: 1;
      }

      .move-dot-one {
        transform: translate(14px, 0);
      }
      .move-dot-two {
        transform: translate(26px, 0);
      }
      .middle-dot-one {
        opacity: 1;
        transform: translate(18px, 0);
      }
      .middle-dot-two {
        opacity: 0;
      }
      .middle-dot-three {
        opacity: 1;
      }

      .l-0 {
        left: 0;
      }
      .l-3 {
        left: 3px;
      }
      .l-13 {
        left: 13px;
      }
      .l-22 {
        left: 22px;
      }
      .l-24 {
        left: 24px;
      }
      .l-30 {
        left: 30px;
      }
      .l-44 {
        left: 44px;
      }
    }
    .login-copyright {
      position: absolute;
      height: 20px;
      bottom: 40px;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: #9B99C0;
      line-height: 20px;
    }
    .guide-main {
      height: 82vh;
      width: 100%;
      position: relative;

      .guide-main-text {
        text-align: center;
        position: absolute;
        height: 76px;
        left: 0;
        right: 0;
        bottom: 30px;
        z-index: 1;
        opacity: 0;
        transition: 1s;
      }
      .guide-main-page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        .page-container {
          width: 100%;
          height: 100%;
          .page-map {
            position: absolute;
            text-align: center;
            height: 39.6vh;
            top: 24.6vh;
            left: 32px;
            right: 32px;
          }

          .page-consensus {
            position: absolute;
            text-align: center;
            height: 39vh;
            top: 13.1vh;
            left: 32px;
            right: 32px;
          }

          .page-code {
            position: absolute;
            text-align: center;
            height: 52vh;
            top: 2vh;
            left: 32px;
            right: 32px;
          }

          .page-block {
            position: absolute;
            text-align: center;
            height: 31.7vh;
            top: 0;
            left: 0;
            right: 0;
            .text-left {
              position: absolute;
              left: 13%;
              top: 40%;
              font-family: hashFont;
              font-size: 20px;
              color: #9C9BC1;
            }
            .text-middle {
              position: absolute;
              left: 42%;
              top: 11%;
              font-family: hashFont;
              font-size: 28px;
              color: #ffffff;
            }
            .text-right {
              position: absolute;
              left: 73%;
              top: 40%;
              font-family: hashFont;
              font-size: 20px;
              color: #9C9BC1;
            }
          }

          .page-hash {
            position: absolute;
            display: flex;
            justify-content: center;
            height: 25.6vh;
            top: 37vh;
            left: 0;
            right: 32px;
          }

          .page-contract {
            position: absolute;
            text-align: center;
            height: 15.6vh;
            top: 0;
            left: 0;
            right: 0;
          }
        }

      }
      .guide-page {
        z-index: 2;
      }
      .guide-main-cover {
        z-index: 10
      }
      .page-logo {
        position: absolute;
        top: 40px;
        left: 45px;
        height: 3.4vh;
        z-index: 12
      }
      .guide-main-text-title {
        width: 100%;
        height: 23px;
        font-size: 20px;
        font-family: FZZYJW--GB1-0, FZZYJW--GB1;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 23px;
        letter-spacing: 2px;
      }
      .guide-main-text-info {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #B9B6DE;
        line-height: 20px;
      }

      .text-show {
        opacity: 1;
      }
    }
    .img-in-one {
      transition: 1s;
      opacity: 1;
    }
    .img-out-one {
      transition: 1s;
      transform: translate(0, 5vh) scale(0.7);
      opacity: 0;
    }
    .back-out-one {
      transition: 1s;
      transform: translate(0, 5vh);
      opacity: 0;
    }
    .back-in-two {
      transition: 1s;
      transform: translate(0, 5vh);
      opacity: 1;
    }
    .back-out-two {
      transition: 1s;
      opacity: 0;
    }
    .img-out-three-one {
      transition: 1s;
      opacity: 0;
    }
    .img-in-three-one {
      transition: 1s;
      transform: translate(0, 13vh);
      opacity: 1;
    }
    .img-in-three-two {
      transition: 1s;
      transform: translate(0, 31.9vh);
      opacity: 1;
    }
    .img-out-four-one {
      transition: 1s;
      transform: translate(0, -2vh) scale(0.7);
      opacity: 0;
    }
    .img-in-four {
      transition: 1s;
      opacity: 1;
    }
    .img-out-four-two {
      transition: 1s;
      transform: translate(0, 20vh);
      opacity: 0;
    }
    .img-in-five {
      transition: 1s;
      transform: translate(0, 14.2vh);
      opacity: 1;
    }
    .img-out-five {
      transition: 1s;
      opacity: 0;
    }
  }
</style>
