const Card = ({ id, image, name, teams }) => {
    return(
        <li>
            <img src={image.url} alt={name}/>
            <h2>Name: {name.forename} {name.surname}</h2>
            <h2>Teams: {teams}</h2>
            
        </li>
    )
}

export default Card