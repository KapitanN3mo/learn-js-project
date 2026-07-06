import { useState, useEffect } from "react"

export default function Counter() {

    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("call timer")
            setCount(prevCount => prevCount + 1)
        }, 1000)
        return () => { clearInterval(timer) }
    }, [])


    return (
        <div>
            <div>{count}</div>
            <button onClick={(ev) => {
                setCount(count - 1)
            }}>-1</button>

            <button onClick={(ev) => {
                setCount(count + 1)
            }}>+1</button>
        </div>
    )
}