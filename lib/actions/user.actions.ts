'use server'

import { CreateUserParams } from "@/types"
import { handleError } from "../utils"
import { db } from '@/lib/db';
import { ClerkRegister } from "@/schemas";
import * as z from 'zod';

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await db.user.create ({
            data: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                image: ''
            },
          });
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }

}