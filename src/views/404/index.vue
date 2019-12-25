<template>
  <div
    class="page-404"
    :style="`background:url(${imgSrc404});background-size:cover;`"
  >
    <p class="element-animation">
      童鞋,你似乎到了个不得了的地方呢,貌似它叫...<strong>404</strong>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'page404'
})
export default class Page404 extends Vue {
  private imgSrc404: string = require('@/assets/images/404.jpg');
}
</script>

<style lang="scss" scoped>
.page-404 {
  @extend %flex-all-center;
  width: 100%;
  height: calc(100% - 70px);
  p {
    padding: 30px;
    font-size: 30px;
    color: #fff;
    text-shadow: #3182bd 1px 0 1px, #3182bd 0 1px 1px, #3182bd -1px 0 1px,
      #3182bd 0 -1px 1px;
    border-radius: 15px;
    background: rgba($color: #fff, $alpha: 0.5);
  }
  .element-animation {
    animation: animationFrames linear 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
    -webkit-animation: animationFrames linear 1s;
    -webkit-animation-iteration-count: 1;
    -webkit-transform-origin: 50% 50%;
    -moz-animation: animationFrames linear 1s;
    -moz-animation-iteration-count: 1;
    -moz-transform-origin: 50% 50%;
    -o-animation: animationFrames linear 1s;
    -o-animation-iteration-count: 1;
    -o-transform-origin: 50% 50%;
    -ms-animation: animationFrames linear 1s;
    -ms-animation-iteration-count: 1;
    -ms-transform-origin: 50% 50%;
  }

  @keyframes animationFrames {
    0% {
      transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }

  @-moz-keyframes animationFrames {
    0% {
      -moz-transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      -moz-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      -moz-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      -moz-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      -moz-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      -moz-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }

  @-webkit-keyframes animationFrames {
    0% {
      -webkit-transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      -webkit-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      -webkit-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      -webkit-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      -webkit-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      -webkit-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }

  @-o-keyframes animationFrames {
    0% {
      -o-transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      -o-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      -o-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      -o-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      -o-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      -o-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }

  @-ms-keyframes animationFrames {
    0% {
      -ms-transform: rotate(0deg) scaleX(1) scaleY(1);
    }
    10% {
      -ms-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    20% {
      -ms-transform: rotate(-3deg) scaleX(0.8) scaleY(0.8);
    }
    30% {
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    40% {
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    50% {
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    60% {
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    70% {
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    80% {
      -ms-transform: rotate(-3deg) scaleX(1.2) scaleY(1.2);
    }
    90% {
      -ms-transform: rotate(3deg) scaleX(1.2) scaleY(1.2);
    }
    100% {
      -ms-transform: rotate(0deg) scaleX(1.2) scaleY(1.2);
    }
  }
}
</style>
