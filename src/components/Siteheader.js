import React from "react";
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import logo from '../media/booklogo.png'

const SUBJECTS = gql`
    query {
        subjects {
        data {
            id 
            attributes {
            value
            }
        }
        }
    }
`

export default function SiteHeader() {
    const { loading, error, data } = useQuery(SUBJECTS)

    if (loading) return <p>Loading...</p>
    if (error) {
        console.error(error)
        return <p>Error: :(</p>
    }

    return (
        <div className="site-header">

            <img src={logo} style={{ width: "75px", height: "75px" }} alt='Jewish Stories' />
            <Link to="/"><h1>Jewish Stories</h1></Link>
            <nav className="subjects">
                <span>Filter stories by subject:</span>
                {data.subjects.data.map(subject => (
                    <Link key={subject.id} to={`/subject/${subject.id}`}>{subject.attributes.value}</Link>
                ))}
            </nav>
        </div>
    )
}