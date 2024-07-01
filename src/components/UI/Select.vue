<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    default: null
  },
})

const selectedOption = ref(null)

const isDropdownVisible = ref(false);

const dropdown = ref(null)
const toggleOptionSelect = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option);
  setTimeout(() => {
    isDropdownVisible.value = false
  }, 300)
}

const mappedSelectedOption = computed(() => {
  return (selectedOption.value?.title || selectedOption.value) || 'Выберите продукцию'
})

const closeDropdown = (element) => {
  if (!dropdown.value?.contains(element.target)) {
    isDropdownVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.addEventListener('click', closeDropdown)
})

</script>

<template>
  <div class="custom-select" ref="dropdown">
    <button @click="isDropdownVisible = !isDropdownVisible"
            class="custom-select__button"
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="select-dropdown">
      <span class="custom-select__selected-value"> {{ mappedSelectedOption }}</span>
      <span class="custom-select__arrow" :class="{'is-open' : isDropdownVisible}">
        <img src="../../assets/icons/arrow-down.svg" alt="arrow-down" />
      </span>
    </button>
    <Transition name="fade">
      <ul class="custom-select__dropdown" role="listbox" id="select-dropdown" v-if="isDropdownVisible">
        <li class="custom-select__option" role="option" v-for="option in options" :key="option.id"
            @click="toggleOptionSelect(option)">
          <input class="custom-select__input" type="radio" :id="option.id" name="options"
                 :checked="option === selectedOption"/>
          <label class="custom-select__label" :for="option.title">{{ option.title || option }}
<!--            <Transition name="fade">-->
<!--              <font-awesome-icon v-if="option === selectedOption" :icon="['fas', 'check']"/>-->
<!--            </Transition>-->
          </label>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.custom-select {
  position: relative;
  max-width: 100%;
  color: #000;

  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    border-radius: 0;
    border: 1px solid #000;
    cursor: pointer;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    background-color: #EEF8FF;
    color: #0170AE;

    &:hover {
      border: 1px solid #A0C3FF;
    }

    &:focus, &:focus-visible {
      border: 1px solid #116ACC;
    }
  }

  &__selected-value {
    text-align: left;
  }

  &__arrow {
    transition: transform ease-in-out 0.3s;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    list-style: none;
    width: 100%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 7px;
    padding: 10px 0;
    margin-top: 2px;
    max-height: 152px;
    overflow-y: auto;
    transition: 0.5s ease;
    z-index: 1;

    &:focus-within {
      box-shadow: 0 10px 25px rgba(94, 108, 233, 0.6);
    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 25px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 25px;
    }
  }

  &__option {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;


    &:hover {
      background: rgba(160, 195, 255, 0.10);
    }
  }

  &__label {
    width: 100%;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #374151;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__input {
    position: absolute;
    left: 0;
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
