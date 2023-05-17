/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Inventario', function (table) {
        table.increments('patrimonio').primary();
        table.string('unidade', 10);
        table.string('descricao', 50);
        table.string('modelo', 50);
        table.string('localizacao', 20);
        table.decimal('valorestim', 10, 2);
        table.string('usuario', 50);
        table.string('nserie', 50);
        table.date('data_compra');
        table.timestamp('modificado').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('Inventario');
};
