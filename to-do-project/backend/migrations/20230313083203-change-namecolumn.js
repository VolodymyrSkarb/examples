'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('user_tasks', 'taskId', 'taskItemId');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('user_tasks', 'taskItemId', 'taskId');
    },
};
