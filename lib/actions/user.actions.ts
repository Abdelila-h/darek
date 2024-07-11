'use server'

import { CreateUserParams, UpdateUserParams } from '@/types'
import { handleError } from '@/lib/utils'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { revalidatePath } from 'next/cache'

export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    console.log('User created successfully:', newUser);
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.error('Error creating user:', error);
    handleError(error);
    throw error;
  }
}

