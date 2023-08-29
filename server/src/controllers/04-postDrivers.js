const { Driver } = require("../db")

module.exports = async (req, res) => {
    try {
        let id = 1
        const { forename, surname, description, image, nationality, dob } = req.body
      
        if (!forename || !surname || !description || !image || !nationality || !dob)
          return res.status(401).send("Faltan datos")
      
        const newDriver = await Driver.findOrCreate({
          where: { forename, surname, description, image, nationality, dob }
        })
      
        res.status(200).json(newDriver) 
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
