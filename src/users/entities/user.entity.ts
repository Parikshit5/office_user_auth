import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name: 'user_info'})
export class User_entity {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    mobile_no:string;

    @Column()
    address:string;

}
