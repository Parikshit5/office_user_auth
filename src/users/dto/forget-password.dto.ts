import { ApiProperty } from "@nestjs/swagger";

export class forgetPasswordDto{

    @ApiProperty()
    email:string

    @ApiProperty()
    oldpassword:string
    
    @ApiProperty()
    newpassword:string


}