import { useState } from 'react'
import Result from './components/Result'
import Keypad from "./components/KeyPad"
import './App.css'
function App() {
 const [state, setState] = useState({ result: "" })
 const onClick = button => {
 switch (button) {
 case "=":
 calculate()
 break
 case "C":
 reset()
 break
 case "CE":
 backspace()
 break
 default:
 setState({ result: state.result + button })
 }
 }
 const calculate = () => {
 try {
 setState({
 result: (eval(state.result) || "") + ""
 })
} catch (e) {
  setState({
  result: "error"
  })
  }
  }
  const reset = () => {
  setState({
  result: ""
  })
  }
  const backspace = () => {
  setState({
  result: state.result.slice(0, -1)
  })
  }
  return (
  <div>
  <div className="srodek">
  <h3>Kalkulator</h3>
  <Result result={state.result} />
  <Keypad onClick={onClick} />
  </div>
  </div>
  )
 }
 export default App