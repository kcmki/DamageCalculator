
import './css/Header.css'
import logo from './assets/Sword.png'
import { useState } from 'react'

function Header(){


    function handleMouseMove(e){

        let x = e.pageX
        let y =e.pageY
        let floater = document.querySelector('.floater')
        let rect = floater.getBoundingClientRect()


        x = x-rect.left
        y = y-rect.top
        floater.style.setProperty("--mouse-x",x+"px")
        floater.style.setProperty("--mouse-y",y+"px")


    }


    return(
    <header>
        <a className="logo" href="/"><img src={logo}></img> </a>
        <ul className="buttons floater" onMouseMove={handleMouseMove} >
            <li><a href="/">Home</a></li>
            <li><a href="/Calculator">Calculator</a></li>
            
        </ul>

        
    </header>
    )
}



export default Header