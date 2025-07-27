import React, { useState } from "react";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Waste from "./assets/waste.png";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className='flex flex-col items-center  min-h-screen p-4'>
            <div className='flex items-center gap-4 mb-4'>
                <img 
                    src={Waste} 
                    className='w-20 h-20' 
                    alt='logo' />
                <h1 className='text-4xl font-bold text-[#000300]'>
                    Wastly Management
                </h1>
            </div>

            {isLoggedIn ? (
                <TodoList />
            ) : (
                <Login onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
}

export default App;
