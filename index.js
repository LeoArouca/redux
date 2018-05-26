// Actions (just object that represents an event that will
// occurr and chane the state
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Redux',
    complete: false
  }
}

{
  type: 'REMOVE_TODO',
  id: 0
}

{
  type: 'TOGGLE_TODO',
  id: 0
}

{
  TYPE: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a marathon'
  }
}

{
  TYPE: 'REMOVE_GOAL',
  id: 0
}


// PURE FUNCTION - REDUCER (get state, action and return new state)
// 1* Always return same result if the same args are passed in
// 2* depend only on the arguments passed in (they ignore anything else)
// 3* never produce side effects (never ajax, dom, mutate states)
function todos (state = [], action){

  if (action.type === 'ADD_TODO'){
    // concat does not mutate , unlike push.
    return state.concat([action.todo])
  }

  return state
}


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
