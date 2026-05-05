import { ref, watch } from 'vue'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storedValue = ref(initialValue)

  const storedRaw = localStorage.getItem(key)
  if (storedRaw) {
    try {
      storedValue.value = JSON.parse(storedRaw, (k, v) => {
        if (v && typeof v === 'object' && v.__type) {
          switch (v.__type) {
            case 'Function':
              return new Function(`return ${v.code}`)()
            case 'Undefined':
              return undefined
            case 'NaN':
              return NaN
            case 'Infinity':
              return v.sign > 0 ? Infinity : -Infinity
            case 'BigInt':
              return BigInt(v.value)
            case 'Symbol':
              return Symbol(v.value)
          }
        }
        return v
      }) as T
    } catch (error) {
      console.warn('Failed to parse localStorage value', error)
    }
  }

  function safeSetItem(value: T) {
    try {
      const seen = new WeakSet()
      const serialized = JSON.stringify(value, (k, v) => {
        if (v && typeof v === 'object') {
          if (seen.has(v)) return undefined
          seen.add(v)
        }
        if (typeof v === 'function') {
          return { __type: 'Function', code: v.toString() }
        }
        if (typeof v === 'undefined') {
          return { __type: 'Undefined' }
        }
        if (typeof v === 'bigint') {
          return { __type: 'BigInt', value: v.toString() }
        }
        if (typeof v === 'symbol') {
          return { __type: 'Symbol', value: v.toString() }
        }
        if (typeof v === 'number') {
          if (Number.isNaN(v)) {
            return { __type: 'NaN' }
          }
          if (!Number.isFinite(v)) {
            return { __type: 'Infinity', sign: v > 0 ? 1 : -1 }
          }
        }
        return v
      })
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
