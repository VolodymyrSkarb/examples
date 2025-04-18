import {
    BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface JwtRefreshTokenCreationAttrs {
    userId: string;
    refreshToken: string;
}

@Table({ tableName: 'jwt-token' })
export class JwtRefreshToken extends Model<
    JwtRefreshToken,
    JwtRefreshTokenCreationAttrs
> {
    @ApiProperty({ example: '1sffasdwa', description: 'JWT Refresh Token' })
    @Column({
        type: DataType.STRING(10000),
        unique: true,
        allowNull: false,
    })
    refreshToken: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
