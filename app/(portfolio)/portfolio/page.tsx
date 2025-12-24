import { getUserPublicProjects } from '@/actions/projects'
import Portfolio from '@/components/PortfolioPage'
import { getAuthUser } from '@/config/useAuth'
import React from 'react'

export default async  function page() {
  const user = await getAuthUser()
  const projects = await getUserPublicProjects(user?.id)||[]
  return (
    <div>
      <Portfolio projects={projects}/>
    </div>
  )
}
