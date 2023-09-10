import Filters from "../Filters/Filters"
import Cards from "../Cards/Cards"
import styles from './Home.module.css'


const Home = ({forCleanDriversFiltered}) => {
    return(
        <div className={styles.homeContainer}>
            <Filters forCleanDriversFiltered={forCleanDriversFiltered}/>
            <Cards  />
        </div>
    )
}

export default Home