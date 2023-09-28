import { useState,useContext,createContext  } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './Header.jsx'
import Home from './Home.jsx'
import Calculator from './Calculator.jsx'
import './css/App.css'
import DataLoader from './KEY.js'

function App() {


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
