const knex = require("../database/knex");

class NotesController {
    async create(req, res) {
        const {title, description, rating, tags} = req.body;
        const {user_id} = req.params;

        const note_id = await knex("notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        res.json();
    }

    async show(req, res) {
        const {id} = req.params;

        const note = await knex("notes").where({id}).first();
        const tags = await knex("tags").where({note_id: id}).orderBy("name");


        return res.json({
            ...note,
            tags
        });
    }

    async delete(req, res) {
        const {id} = req.params;

        await knex("notes").where({id}).delete();

        return res.json();
    }

    async index(req, res) {
        const {user_id} = req.query;

        const notes = await knex("notes")
        .where({user_id})
        .orderBy("title");

        return res.json({notes});
    }
}

module.exports = NotesController;