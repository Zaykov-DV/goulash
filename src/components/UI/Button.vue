<template>
  <button :class="['btn',
                   `btn_${color}`,
                  {'btn_without-text' : withoutText },
                  ]"
          :disabled="disabled"
          @click="clickOnButton()">
    <div class="btn__content" :class="{'is-loading' : loading}">
      <span>{{ label }}</span>
      <div class="btn__loader" v-if="loading">
        <svg id="loading-circle" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" xml:space="preserve">
             <path
                 d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform attributeType="XML"
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 25 25"
                                  to="360 25 25"
                                  dur="0.8s"
                                  repeatCount="indefinite"/>
             </path>
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
    default: 'Button'
  },
  color: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  withoutText: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const clickOnButton = () => {
  emit('click')
}

</script>


<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 52px;
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 24px;
  transition: all .3s ease-in-out;

  &_primary {
    background: #2FA6EA;
  }

  &_secondary {
    background: #61A91A;
  }

  &:disabled {
    opacity: .6;
    cursor: default;
    pointer-events: none;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;

    &.is-loading {
      visibility: hidden;
    }
  }
  &__loader {
    width: 20px;
    height: 20px;
    visibility: visible;
    fill: white;
    position: absolute;
  }
}
</style>
