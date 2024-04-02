import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
        // @ApiProperty({ description: 'The ID of the report' })
        id: string;
    
        @ApiProperty()
        name:string;

        @ApiProperty()
        email:string;

        @ApiProperty()
        password:string;

        @ApiProperty()
        mobile_no:string;

        @ApiProperty()
        address:string;

}
