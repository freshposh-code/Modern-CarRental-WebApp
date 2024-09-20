import React from 'react'

const Loader = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center absolute top-0 bg-white-100/35 dark:bg-black-100/35 z-20'>
            <span className="loader"></span>
        </div>
    )
}

export default Loader