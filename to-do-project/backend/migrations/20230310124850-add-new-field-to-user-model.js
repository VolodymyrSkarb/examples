// 'use strict';
//
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         await queryInterface.addColumn('User', 'firstName', {
//             type: Sequelize.STRING,
//             allowNull: true,
//         });
//         await queryInterface.addColumn('User', 'lastName', {
//             type: Sequelize.STRING,
//             allowNull: true,
//         });
//     },
//
//     async down(queryInterface, Sequelize) {
//         await queryInterface.removeColumn('User', 'firstName');
//         await queryInterface.removeColumn('User', 'lastName');
//     },
// };
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'firstName', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('users', 'lastName', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'new_field_1');
        await queryInterface.removeColumn('users', 'new_field_2');
    },
};
