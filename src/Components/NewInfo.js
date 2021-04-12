import React from 'react'

function NewInfo(props) {
    const { newsInfo } = props
    
    return (
        <li>
            {newsInfo?.id} - {newsInfo?.by}
        </li>
    )
}

export default NewInfo
