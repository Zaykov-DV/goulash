<template>
  <div class="input">
    <label :for="name"
           class="input__label">
      {{ label }}
    </label>
    <input class="input__input"
           v-model="model"
           :required="required"
           :type="type"
           :name="name"
           :placeholder="placeholder"
           :label="label"
           :pattern="pattern"
           :disabled="disabled">
  </div>
</template>

<script setup>
const props = defineProps({
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: 'Placeholder',
      },
      label: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false
      },
      pattern: {
        type: String,
        default: null
      }
    }
)

const model = defineModel()
</script>
<style lang="scss" scoped>

.input {
  position: relative;

  &__input {
    width: 100%;
    height: 100%;
    outline: none;
    color: #0170AE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    transition: all 0.3s ease-in-out;
    border-radius: 0;
    border: 1px solid #000;
    background: #EEF8FF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;

    &[type='number'] {
      width: calc(100% - 32px);
    }

    &::placeholder {
      color: #0170AE;
    }

    &:hover {
      border-color: #EEF8FF;
    }

    &:focus {
      border-color: #0170AE;
    }

    &.disabled, &:disabled {
      border-color: rgba(0, 0, 0, 0.5);
      color: rgba(0, 0, 0, 0.5);

      &:hover, &:focus {
        border-color: rgba(0, 0, 0, 0.5);
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  &__label {
    display: block;
    margin-bottom: 4px;
    color: #222222;
  }
}
</style>
