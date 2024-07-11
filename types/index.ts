export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  path: string
}

export type createDarParams = {
  userId: string
  dar: {
    title: string
    description: string
    location: string
    imageUrl: string
    freeDateTime: Date | null
    categoryId: string
    price: string
    url: string
  }
  path: string
}

export type UpdateDarParams = {
  userId: string
  dar: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    freeDateTime: Date | null
    categoryId: string
    price: string
    url: string
  }
  path: string
}

export type GetAllDarsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type GetRelatedDarsByCategoryParams = {
  categoryId: string,
  darId: string,
  limit?: number,
  page: number | string,
}
export type DeleteDarParams = {
  darId: string
  path: string
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// URL

export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}
