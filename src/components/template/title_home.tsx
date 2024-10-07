import React from 'react'

const title_home = (props: any) => {
    return (
        <div className=' w-full h-1/6 rounded-sm shadow-sm bg-white pt-24 pl-20 pb-28'>
            <span className='text-3xl font-semibold pr-12 text-lime-700'>{props.titulo}</span>
            <span className=' font-extralight'>{props.etapa}</span>
        </div>
    )
}

export default title_home