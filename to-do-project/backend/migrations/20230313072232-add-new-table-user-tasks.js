'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_tasks', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
            },
            taskItemId: {
                type: Sequelize.UUID,
                references: {
                    model: 'task_item',
                    key: 'id',
                },
                allowNull: false,
            },
        });

        await queryInterface.addConstraint('user_tasks', {
            fields: ['userId', 'taskId'],
            type: 'unique',
            name: 'user_tasks_userId_taskId_unique_constraint',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_tasks');
    },
};
