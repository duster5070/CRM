import { getUserById } from '@/actions/users'
import BrandForm from '@/components/Forms/BrandForm'
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm'
import { getAuthUser } from '@/config/useAuth'
import { get } from 'http'
import React from 'react'

const page =async () => {
    const user=await getAuthUser()
  
  return (
    <div className="p-8">
        <ChangePasswordForm editingId={user?.id} />
    </div>
  )
}

export default page