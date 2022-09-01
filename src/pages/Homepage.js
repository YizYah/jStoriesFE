import React from 'react'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'

const STORIES = gql`
query GetStories {
    stories {
      data {
        id
        attributes {
          title
          subjects {
            data {
              id
              }
            }
          }
        }
      }
    }
`

export default function Homepage() {
    // const { loading, error, data } = useFetch('http://localhost:1337/api/stories')
    const { loading, error, data } = useQuery(STORIES)

    console.log(`data=${JSON.stringify(data, null, 2)}`)

    if (loading) return <p>Loading...</p>
    if (error) {
        console.error(error)
        return <p>Error: :(</p>
    }
    return (
        <div>
            {data.stories.data.map(story => (
                <div key={story.id} className="story-info">
                    <h2>{story.attributes.title}</h2>

                    <p>{story.attributes.summary}</p>
                </div>
            ))}
        </div>
    )
}
