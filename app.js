import express from "express";
import * as db from "./util/database.js";

const PORT = 8080;
const app = express();
app.use(express.json());

app.get("/recipes", (req,res) =>{
    
    try {
        const recipes = db.getAllRecipes();
        if (!recipes) {
            return res.status(404).json({message: "Failed"});
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get("/recipes/:id", (req,res) =>{
    
    try {
        const recipe = db.getRecipes(req.params.id)
    if (!recipe) {
        return res.status(404).json("Recipe not found")
    }
    res.status(200).json(recipe)

    } catch (error) {
        res.status(500).json({message: error})
    }
})
app.post("/recipes", (req,res) =>{
    
    try {
        const {title,content} = req.body
        if (!title || !content) {
            return res.status(404).json("Invalid data")
        }
        const savedRecipe = db.createRecipes(title,content)
        if (savedRecipe.changes != 1) {
            return res.status(422).json("Unprocesable Entity")
        
        }
        res.status(201).json({id: savedRecipe.lastInsertRowid,title,content})


    } catch (error) {
        res.status(500).json({message: error})
    }
})
app.delete("/recipes/:id", (req,res) =>{
    
    try {
        const deletedRecipe = db.getRecipes(req.params.id)
    if (deletedRecipe.changes != 1) {
        return res.status(404).json({ message: "Delete error"})
    }
    res.status(204).json({ message: "Delete successfull"});
    } catch (error) {
        res.status(500).json({message: error})
    }
})


app.listen(PORT, () => console.log("Server run "+ PORT))