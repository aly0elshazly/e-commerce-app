import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./role.decorators"
import { AuthGuard } from "@common/guards"
import { RolesGuard } from "@common/guards/ roles.guard"

export const Auth = (roles:string[])=>{
    return applyDecorators(
    Roles(roles),  
     UseGuards(AuthGuard,RolesGuard)
)
}