import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto{

    

    @ApiProperty()
    oldpassword:string
    
    @ApiProperty()
    newpassword:string


}