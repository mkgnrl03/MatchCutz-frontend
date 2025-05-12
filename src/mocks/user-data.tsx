import { RoleEnum, type UserEntity } from "@/types/api";

export const mockUserData: Array<UserEntity> = [
  {
    id: "ada94185-3d62-48b8-905b-c51ff3a28dcb",
    email: 'mikognrl@gmail.com',
    
    // profile table
    first_name: "Miko",
    last_name: "Generale",
    username: "mkgnrl",
    
    // UserRoles -> Role
    role: [RoleEnum.ADMIN],
    password: 'mkgnrl123'
  },
  {
    id: "bcs44185-3d62-48b8-905b-c51ff3r28dcb",
    email: 'johndoe@gmail.com',
    
    // profile table
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    
    // UserRoles -> Role
    role: [RoleEnum.BARBER],
    password: 'johndoe123'
  },
    {
    id: "zvf95185-3e62-48b8-905b-c51ff3r28dca",
    email: 'johndoe@gmail.com',
    
    // profile table
    first_name: "Jane",
    last_name: "Doe",
    username: "janedoe",
    
    // UserRoles -> Role
    role: [RoleEnum.USER],
    password: 'janedoe123'
  }
]