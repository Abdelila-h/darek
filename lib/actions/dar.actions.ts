"use server";

import {
  GetAllDarsParams,
  createDarParams,
  DeleteDarParams,
  UpdateDarParams,
  GetRelatedDarsByCategoryParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Dar from "../database/models/dar.model";
import Category from "../database/models/category.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

const populateDar = async (query: any) => {
  return query
    .populate({
      path: "user",
      model: User,
      select: "_id firstName lastName clerkId",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createDar = async ({ dar, userId, path }: createDarParams) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const categoryId = new mongoose.Types.ObjectId(dar.categoryId);
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    console.log("Creating dar with data:", {
      ...dar,
      category: categoryId,
      user: userId,
    });

    const newDar = await Dar.create({
      ...dar,
      category: new mongoose.Types.ObjectId(dar.categoryId),
      user: userId,
    });

    return JSON.parse(JSON.stringify(newDar));
  } catch (error) {
    handleError(error);
  }
};

export const getDarById = async (darId: string) => {
  try {
    await connectToDatabase();
    const dar = await populateDar(Dar.findById(darId));

    if (!dar) {
      throw new Error("dar not found");
    }

    return JSON.parse(JSON.stringify(dar));
  } catch (error) {
    handleError(error);
  }
};

export const getAllDars = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllDarsParams) => {
  try {
    await connectToDatabase();

    const conditions = query? { title: { $regex: query, $options: 'i' } } : {};
    const darsQuery = Dar.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const dars = await populateDar(darsQuery);
    const darsCount = await Dar.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(dars)),
      totalPages: Math.ceil(darsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export async function updateDar({ userId, dar, path }: UpdateDarParams) {
  try {
    await connectToDatabase();

    const darToUpdate = await Dar.findById(dar._id);
    if (!darToUpdate || darToUpdate.user.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedDar = await Dar.findByIdAndUpdate(
      dar._id,
      { ...dar, category: dar.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedDar));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteDar({ darId, path }: DeleteDarParams) {
  try {
    await connectToDatabase();

    const deletedDar = await Dar.findByIdAndDelete(darId);
    if (deletedDar) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedDarsByCategory({
  categoryId,
  darId,
  limit = 3,
  page = 1,
}: GetRelatedDarsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: darId } }],
    };

    const eventsQuery = Dar.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const dars = await populateDar(eventsQuery);
    const darsCount = await Dar.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(dars)),
      totalPages: Math.ceil(darsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
