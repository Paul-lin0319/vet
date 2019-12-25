<template>
  <div
    class="slide-verify"
    id="slideVerify"
    onselectstart="return false;"
  >
    <canvas
      :width="w"
      :height="h"
      ref="canvas"
    ></canvas>
    <div
      @click="refresh"
      class="slide-verify-refresh-icon"
    ></div>
    <canvas
      :width="w"
      :height="h"
      ref="block"
      class="slide-verify-block"
    ></canvas>
    <!-- container -->
    <div
      class="slide-verify-slider"
      :class="{
        'container-active': containerActive,
        'container-success': containerSuccess,
        'container-fail': containerFail
      }"
    >
      <div
        class="slide-verify-slider-mask"
        :style="{ width: sliderMaskWidth }"
      >
        <!-- slider -->
        <div
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
          class="slide-verify-slider-mask-item"
          :style="{ left: sliderLeft }"
        >
          <div class="slide-verify-slider-mask-item-icon"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const PI = Math.PI;

// 求和
function sum(x: number, y: number): number {
  return x + y;
}

// 求二次幂
function square(x: number): number {
  return x * x;
}

@Component({
  name: "sliderVerificationCode",
  components: {
    SliderVerificationCode
  }
})
export default class SliderVerificationCode extends Vue {
  // prop
  @Prop({
    type: Number,
    default: 42
  })
  private l!: number; // block length
  @Prop({
    type: Number,
    default: 10
  })
  private r!: number; // block radius
  @Prop({
    type: Number,
    default: 310
  })
  private w!: number; // canvas width
  @Prop({
    type: Number,
    default: 155
  })
  private h!: number; // canvas height
  @Prop({
    type: String,
    default: "Slide filled right"
  })
  private sliderText!: string;
  @Prop({
    type: Array,
    default: () => []
  })
  private imgs!: [];

  // data()
  private containerActive: boolean = false; // container active class
  private containerSuccess: boolean = false; // container success class
  private containerFail: boolean = false; // container fail class
  private canvasCtx: any = null;
  private blockCtx: any = null;
  private block: any = null;
  private block_x: any = undefined; // container random position
  private block_y: any = undefined;
  private L: number = this.l + this.r * 2 + 3; // block real lenght
  private img: any = undefined;
  private originX: any = undefined;
  private originY: any = undefined;
  private isMouseDown: boolean = false;
  private trail: any = [];
  private sliderLeft: number | string = 0; // block right offset
  private sliderMaskWidth: number | string = 0; // mask width

  // methods
  private init(): void {
    this.initDom();
    this.initImg();
    this.bindEvents();
  }
  private initDom(): void {
    this.block = this.$refs.block;
    this.canvasCtx = (this.$refs.canvas as any).getContext("2d");
    this.blockCtx = this.block.getContext("2d");
  }
  private initImg(): void {
    const img = this.createImg(() => {
      this.drawBlock();
      this.canvasCtx.drawImage(img, 0, 0, this.w, this.h);
      this.blockCtx.drawImage(img, 0, 0, this.w, this.h);
      let { block_x: x, block_y: y, r, L } = this;
      let _y = y - r * 2 - 1;
      let ImageData = this.blockCtx.getImageData(x, _y, L, L);
      this.block.width = L;
      this.blockCtx.putImageData(ImageData, 0, _y);
    });
    this.img = img;
  }
  private drawBlock() {
    this.block_x = this.getRandomNumberByRange(
      this.L + 10,
      this.w - (this.L + 10)
    );
    this.block_y = this.getRandomNumberByRange(
      10 + this.r * 2,
      this.h - (this.L + 10)
    );
    this.draw(this.canvasCtx, this.block_x, this.block_y, "fill");
    this.draw(this.blockCtx, this.block_x, this.block_y, "clip");
  }
  private draw(ctx: any, x: any, y: any, operation: any) {
    let { l, r } = this;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.stroke();
    ctx[operation]();
    ctx.globalCompositeOperation = "overlay";
  }
  private createImg(onload: any) {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.onload = onload;
    img.onerror = () => {
      img.src = this.getRandomImg();
    };
    img.src = this.getRandomImg();
    return img;
  }
  // 随机生成img src
  private getRandomImg() {
    // return require('../assets/img.jpg')
    const len = this.imgs.length;
    return len > 0
      ? this.imgs[this.getRandomNumberByRange(0, len)]
      : "https://picsum.photos/300/150/?image=" +
          this.getRandomNumberByRange(0, 1084);
  }
  private getRandomNumberByRange(start: number, end: number): number {
    return Math.round(Math.random() * (end - start) + start);
  }
  private refresh() {
    this.reset();
    this.$emit("refresh");
  }
  private sliderDown(event: any) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.isMouseDown = true;
  }
  private touchStartEvent(e: any) {
    this.originX = e.changedTouches[0].pageX;
    this.originY = e.changedTouches[0].pageY;
    this.isMouseDown = true;
  }
  private bindEvents() {
    document.addEventListener("mousemove", e => {
      if (!this.isMouseDown) return false;
      const moveX = e.clientX - this.originX;
      const moveY = e.clientY - this.originY;
      if (moveX < 0 || moveX + 38 >= this.w) return false;
      this.sliderLeft = moveX + "px";
      let blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX;
      this.block.style.left = blockLeft + "px";

      this.containerActive = true; // add active
      this.sliderMaskWidth = moveX + "px";
      this.trail.push(moveY);
    });
    document.addEventListener("mouseup", e => {
      if (!this.isMouseDown) return false;
      this.isMouseDown = false;
      if (e.clientX === this.originX) return false;
      this.containerActive = false; // remove active

      const { spliced, TuringTest } = this.verify();
      if (spliced) {
        if (TuringTest) {
          // succ
          this.containerSuccess = true;
          this.$emit("success");
        } else {
          this.containerFail = true;
          this.sliderText = "try again";
          this.reset();
        }
      } else {
        this.containerFail = true;
        this.$emit("fail");
        setTimeout(() => {
          this.reset();
        }, 1000);
      }
    });
  }
  private touchMoveEvent(e: any) {
    if (!this.isMouseDown) return false;
    const moveX = e.changedTouches[0].pageX - this.originX;
    const moveY = e.changedTouches[0].pageY - this.originY;
    if (moveX < 0 || moveX + 38 >= this.w) return false;
    this.sliderLeft = moveX + "px";
    let blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX;
    this.block.style.left = blockLeft + "px";

    this.containerActive = true;
    this.sliderMaskWidth = moveX + "px";
    this.trail.push(moveY);
  }
  private touchEndEvent(e: any) {
    if (!this.isMouseDown) return false;
    this.isMouseDown = false;
    if (e.changedTouches[0].pageX === this.originX) return false;
    this.containerActive = false;

    const { spliced, TuringTest } = this.verify();
    if (spliced) {
      if (TuringTest) {
        // succ
        this.containerSuccess = true;
        this.$emit("success");
      } else {
        this.containerFail = true;
        this.sliderText = "try again";
        this.reset();
      }
    } else {
      this.containerFail = true;
      this.$emit("fail");
      setTimeout(() => {
        this.reset();
      }, 1000);
    }
  }
  private verify() {
    const arr = this.trail; // drag y move distance
    const average = arr.reduce(sum) / arr.length; // average
    const deviations = arr.map((x: number) => x - average); // deviation array
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
    const left = parseInt(this.block.style.left);
    return {
      spliced: Math.abs(left - this.block_x) < 10,
      TuringTest: average !== stddev // equal => not person operate
    };
  }
  private reset() {
    this.containerActive = false;
    this.containerSuccess = false;
    this.containerFail = false;
    this.sliderLeft = 0;
    this.block.style.left = 0;
    this.sliderMaskWidth = 0;
    // canvas
    let { w, h } = this;
    this.canvasCtx.clearRect(0, 0, w, h);
    this.blockCtx.clearRect(0, 0, w, h);
    this.block.width = w;

    // generate img
    this.img.src = this.getRandomImg();
  }

  // mounted()
  private mounted() {
    this.init();
  }
}
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 310px;
}

.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background: url("./images/icon_light.png") 0 -437px;
  background-size: 34px 471px;
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 -13px;
}

.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url("./images/icon_light.png") 0 -26px;
  background-size: 34px 471px;
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
