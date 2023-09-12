import Filters from "../Filters/Filters"
import Cards from "../Cards/Cards"
import styles from './Home.module.css'


const Home = ({forCleanDriversFiltered, teamsFormat, teamsOptions }) => {
    return(
        <div className={styles.homeContainer}>
            <Filters teamsOptions={teamsOptions} forCleanDriversFiltered={forCleanDriversFiltered}/>
            <Cards teamsFormat={teamsFormat} />
        </div>
    )
}

export default Home