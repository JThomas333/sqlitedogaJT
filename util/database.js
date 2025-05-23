import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
    "CREATE TABLE IF NOT EXIST recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)"
).run();

export const getAllRecipes = () => db.prepare("SELECT * FROM recipes").all();
export const getRecipes = (id) => db.prepare("SELECT * FROM recipes WHERE id = ?").get(id);
export const createRecipes = (title,content) => db.prepare("INSERT INTO recipes (title,content) VALUES (?,?)").run(title,content);
export const deleteRecipes = (id) => db.prepare("DELETE FROM recipes WHERE id = ?").run(id);


const recipes = [
{title: "Süti", content: "csoki, cukor"},{title: "Leves", content: "víz,hús"},{title: "Makaroni", content: "tészta,hús"},{title: "Süti2", content: "vanilia,tojás"}
];