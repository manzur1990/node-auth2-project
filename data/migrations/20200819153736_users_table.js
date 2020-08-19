
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.string("username", 124).notNullable().unique();
        tbl.string("password", 124).notNullable();
        tbl.string("department", 124).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
};
