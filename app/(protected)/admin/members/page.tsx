import React from 'react'
import { getAllhomes } from '@/actions/homes'
// import {  } from './_components/TeamMemberActionArea'
import { Homes, TeamMemberType } from '@/typings'
import { getAllTeamMembers } from '@/actions/teamMember'
import { TeamMemberActionArea } from './_components/TeamMemberActionArea'


const AdminCasePage = async () => {


  const members = await getAllTeamMembers() as TeamMemberType[]

  return (
    <div className='flex bg-white dark:bg-dark'>
        <TeamMemberActionArea members={members} />
    </div>
    )
}

export default AdminCasePage