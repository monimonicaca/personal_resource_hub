import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = ref(initialValue)

  const storedRaw = localStorage.getItem(key)
  if (storedRaw) {
    try {
      storedValue.value = JSON.parse(storedRaw) as T
    } catch (error) {
      console.warn('Failed to parse localStorage value', error)
    }
  }

  function safeSetItem(value: T) {
    try {
      const cloned = cloneDeep(value)
      const serialized = JSON.stringify(cloned)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('Failed to serialize value to localStorage:', error)
    }
  }

  watch(
    storedValue,
    (value) => {
      safeSetItem(value)
    },
    { deep: true },
  )

  return {
    storedValue,
  }
}
