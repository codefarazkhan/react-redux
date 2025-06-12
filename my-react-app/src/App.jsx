import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from './store/counterSlice'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Redux Counter Example</h1>
      <div>
        <h2>Counter: {count}</h2>
        <div>
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
          <button onClick={() => dispatch(incrementByAmount(5))}>
            Add 5
          </button>
          <button onClick={() => dispatch(reset())}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
