import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Calculator from './Calculator.jsx'
import './css/App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Calculator' element={<Calculator />}/>
			</Routes>
		</BrowserRouter>
		</>
	)
}

export default App
