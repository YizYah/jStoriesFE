import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom'

const SUBJECT = gql`
query GetSubject($id:ID!){
  subject(id:$id) {
    data {
      id 
      attributes {
        value
        stories {
          data {
            id
            attributes {
              summary
              title
              source
              subjects {
                data {
                  id
                  attributes {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  }
  `
export default function Subject() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(SUBJECT, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error: :(</p>
  }

  console.log(data)
  return (
    <div>
      <h1>{data.subject.data.attributes.value}</h1>
      {data.subject.data.attributes.stories.data.map(story => (
        <div key={story.id} className="story-info">
          <h2>{story.attributes.title}</h2>

          <p>{story.attributes.summary}</p>
          {story.attributes.subjects.data.map(storySubject => (
            <small key={storySubject.id} >{storySubject.attributes.value}</small>
          )

          )}
        </div>
      ))}

    </div>
  )
}
