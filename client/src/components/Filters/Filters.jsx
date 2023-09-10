import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { orderByName, orderByDob, filterByOrigin, filterByTeam, getTeams } from "../../redux/actions"
import styles from './Filters.module.css'


const Filters =  ({ forCleanDriversFiltered }) => {
    const teams = useSelector(state => state.teams)
    const dispatch = useDispatch()

    useEffect(() => {
        teams.length === 0 && dispatch(getTeams())
    }, [])

    /* const orderByName = 'orderByName'
    const orderByDob = 'orderByDob'
    const filterByOrigin = 'filterByOrigin'
    const filterByTeam = 'filterByTeam' */

    const orderByNameSelector = document.getElementById('orderByName')
    const orderByDobSelector = document.getElementById('orderByDob')
    const filterByOriginSelector = document.getElementById('filterByOrigin')
    const filterByTeamSelector = document.getElementById('filterByTeam')

    const orderByNameHandler = (event) => {
        const sort = event.target.value
        dispatch(orderByName(sort))
        orderByDobSelector.value = 'orderByDob'
        filterByOriginSelector.value = 'filterByOrigin'
        filterByTeamSelector.value = 'filterByTeam'
    }

    const orderByDobHandler = (event) => {
        const sort = event.target.value
        dispatch(orderByDob(sort))
        orderByNameSelector.value = "orderByName"
        filterByOriginSelector.value = 'filterByOrigin'
        filterByTeamSelector.value = 'filterByTeam'
    }

    const filterByOriginHandler = (event) => {
        const origin = event.target.value
        dispatch(filterByOrigin(origin))
        orderByNameSelector.value = "orderByName"
        orderByDobSelector.value = 'orderByDob'
        filterByTeamSelector.value = 'filterByTeam'
    }
    
    const filterByTeamHandler = (event) => {
        const team = event.target.value
        dispatch(filterByTeam(team))
        orderByNameSelector.value = "orderByName"
        orderByDobSelector.value = 'orderByDob'
        filterByOriginSelector.value = 'filterByOrigin'
    }

    /* const sortedTeams = () => {
        teams.sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
            <option key={team.id} value={team.name}>{team.name}</option>
        ))
    } */
    
    return (
        <section className={styles.containerFilters}>
            <select id="orderByName" defaultValue='orderByName' onChange={orderByNameHandler}>
                <option value="orderByName" disabled>Order by name</option>
                <option value="A">A to Z</option>
                <option value="D">Z to A</option>
            </select>

            <select id="orderByDob" defaultValue='orderByDob' onChange={orderByDobHandler}>
                <option value="orderByDob" disabled>Order by birthdate</option>
                <option value="A">Older to younger</option>
                <option value="D">Younger to older</option>
            </select>

            <select id="filterByOrigin" defaultValue='filterByOrigin' onChange={filterByOriginHandler}>
                <option value="filterByOrigin" disabled>Filter by origin</option>
                <option value="db">Created drivers</option>
                <option value="api">Default drivers</option>
            </select>

            <select id="filterByTeam" defaultValue='filterByTeam' onChange={filterByTeamHandler}>
                <option value="filterByTeam" disabled>Filter by team</option>
                {
                    teams.sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
                        <option key={team.id} value={team.name}>{team.name}</option>
                    ))
                }
            </select>

            <button onClick={forCleanDriversFiltered} className={styles.filterButton}>Clear</button>
            
        </section>
    )
}

export default Filters