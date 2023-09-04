import { useEffect, useState } from "react"
import axios from 'axios'

const Filters =  () => {

    const [teams, setTeams] = useState([])

    async function getTeams() {
        const { data } = await axios('http://localhost:3001/drivers/teams')
        setTeams(data)
    }

    useEffect(() => {
        getTeams()
    }, [])

    return (
        <div>
            <select name="orderByName" id="" defaultValue='orderByName'>
                <option value="orderByName" disabled='disabled'>Order by name</option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
            </select>

            <select name="orderByDob" id="" defaultValue='orderByDob'>
                <option value="orderByDob" disabled='disabled'>Order by birthdate</option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
            </select>

            <select name="filterByOrigin" id="" defaultValue='filterByOrigin'>
                <option value="filterByOrigin" disabled='disabled'>Filter by origin</option>
                <option value="db">Created drivers</option>
                <option value="api">Default drivers</option>
            </select>

            <select name="" id="" defaultValue='filterByTeam'>
                <option value="filterByTeam" disabled='disabled'>Filter by team</option>
                {
                    teams.map((team) => (
                        <option key={team.id} value={team.name}>{team.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Filters