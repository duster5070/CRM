import { getUserById } from '@/actions/users'
import BrandForm from '@/components/Forms/BrandForm'
import { getAuthUser } from '@/config/useAuth'
import { get } from 'http'
import React from 'react'

const page =async () => {
    const user=await getAuthUser()
    const userDetails=await getUserById(user?.id??"")
  return (
    <div className="p-8">
        <BrandForm initialData={userDetails} editingId={user?.id} />
    </div>
  )
}

export default page