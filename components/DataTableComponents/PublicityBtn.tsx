import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { updateProjectPublicity } from '@/actions/projects'
import toast from 'react-hot-toast'

export default function PublicityBtn({id,status}:{id:string,status:boolean}) {
    const [isPublic,setIsPublic] = useState(status)

    async function handleUpdate() {
        try {
            const res =await updateProjectPublicity(id,!isPublic)
            if(res.ok){
                setIsPublic(!isPublic)
                toast.success("updated successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button 
    onClick={handleUpdate}
    size={"sm"}
    className={cn("",isPublic?"bg-red-500 hover:bg-red-600":"bg-green-500 hover:bg-green-600")}>
        {isPublic?"Public":"Private"}
    </Button>
  )
}
