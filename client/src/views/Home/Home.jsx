import Filters from '../../components/Filters/Filters'
import Cards from "../../components/Cards/Cards"
import styles from './Home.module.css'


const Home = ({forCleaningDriversFiltered, teamsFormat, teamsOptions }) => {
    return(
        <div className={styles.homeContainer}>
            <Filters teamsOptions={teamsOptions} forCleaningDriversFiltered={forCleaningDriversFiltered}/>
            <Cards teamsFormat={teamsFormat} />
        </div>
    )
}

export default Home