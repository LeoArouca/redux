const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// LIBRARY ------------------------------------------------------
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state. (getState)
  // 3. Listen to changes on the state. (subscribe)
  // 4. Update the state (dispatch)

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

  const dispatch = (action) => {
    // call todos
    state = reducer(state, action)
    // loop over listeners and invoke them
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}


// APP CODE ------------------------------------------------------

// PURE FUNCTION - REDUCER (get state, action and return new state)
// 1* Always return same result if the same args are passed in
// 2* depend only on the arguments passed in (they ignore anything else)
// 3* never produce side effects (never ajax, dom, mutate states)
// Gets state and actions and reduce then
function todos (state = [], action){

  if (action.type === ADD_TODO){
    // concat does not mutate , unlike push.
    return state.concat([action.todo])
  } else if (action.type === REMOVE_TODO) {
    return state.filter((todo) => todo.id !== action.id)
  } else if (action.type === TOGGLE_TODO) {
    // return new object as todo, not changing the original one
    // return state.map((todo) => todo.id !== action.id ? todo : {
    //   name: todo.name,
    //   id: todo.id,
    //   complete: !todo.complete
    // })
    // OR
    return state.map((todo) => todo.id !== action.id ? todo : {
      // Allows to merge object together
      Object.assign({}, todo, {complete: !todo.complete})
    })
  } else {
    return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

// Adds the 2 reducers togheter as objects
function app (state = {}, action){
  return {
    goals: goals(state.goals,action),
    todos: todos(state.todos, action)
  }
}

// Actions (just object that represents an event that will
// occurr and chane the state
// {
//   type: 'ADD_TODO',
//   todo: {
//     id: 0,
//     name: 'Walk the dog',
//     complete: false,
//   }

// Returns an object with the method getState.
// When user creates a new store they can acces that

// example usage
const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux'
  }
})

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Lose 20 pounds'
  }
})

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 0
})
