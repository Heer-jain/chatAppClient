import React from 'react'
import {Helmet} from "react-helmet-async"

const Title = ({title = "Chat App", description = "This is chat app"}) => {
    return <div>
        <title>{title}</title>
        <meta name='description' content={description} />
    </div>
}

export default Title
