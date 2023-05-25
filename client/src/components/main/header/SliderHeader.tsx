import React, { useEffect, useState } from 'react'

const SliderHeader = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => (prevCount + 1) % 3);
        }, 3000); 

        return () => {
            clearInterval(interval); 
        };
    }, []); 

    return (
        <div className="slider">
            {
                [0, 1, 2].map(item => {
                    let classN = ''
                    if (item === count) {
                        classN = 'current'
                    }
                    if (item === (count + 1) % 3) {
                        classN = 'next'
                    }
                    return <div key={item} className={classN + ' slide style--image'} ></div>
                })
            }
        </div>
    )
}

export default SliderHeader