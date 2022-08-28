import React from 'react'
import useFetch from '../hooks/useFetch'

export default function Homepage() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/stories')
    console.log(`data=${JSON.stringify(data, null, 2)}`)

    if (loading) return <p>Loading...</p>
    if (error) {
        console.error(error)
        return <p>Error: :(</p>
    }
    return (
        <div>
            {data.data.map(story => (
                <div key={story.id} className="story-info">
                    <h2>{story.attributes.title}</h2>

                    <p>{story.attributes.summary}</p>
                </div>
            ))}
        </div>
    )
}
