function createStore () {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state
  // Listen to changes
  const subscribe = (listener) => {
    listeners.push(listener);
    // this will return a function to remove the listener
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return {
    getState,
    subscribe,
  }
}
// Returns an object with the method getState.
// When user creates a new store they can acces that

// example usage
const store = createStore()
// This would listen to it
store.subscribe(() => {})
// to unsubscribe
const unsubscribe = store.subscribe(() => {})
// So in the store you need to keep track of the calls
