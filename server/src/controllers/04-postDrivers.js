const { Driver } = require("../db")

module.exports = async (req, res) => {
    try {
        const { forename, surname, description, image, nationality, dob } = req.body

        
        if (!forename || !surname || !description || !image || !nationality || !dob){
          return res.status(401).send("Faltan datos")
        }
      
      const formatedForename = forename.charAt(0).toUpperCase() + query.slice(1).toLowerCase() 
      const formatedSurname = surname.charAt(0).toUpperCase() + query.slice(1).toLowerCase() 

        const newDriver = await Driver.findOrCreate({
          where: { formatedForename, formatedSurname, description, image, nationality, dob }
        })
      
        res.status(200).json(newDriver) 
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
