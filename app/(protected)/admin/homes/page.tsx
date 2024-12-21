// 
import { getAllAuthors } from '@/actions/author'
import { getAllNews } from '@/actions/news'
import React from 'react'
import { PoliciesActionArea } from './_components/PoliciesActionArea'
import { getAllPolicies } from '@/actions/policies'
import { AuthorType, PoliciesType } from '@/typings'

const AdminCasePage = async () => {

  // const allNews = await getAllNews() as NewsType[]
  const policies = await getAllPolicies() as PoliciesType[]
  const authors = await getAllAuthors() as AuthorType[]

  return (
    <div className='flex bg-white dark:bg-dark-bg'>
        <PoliciesActionArea authors={authors} policies={policies} />
    </div>
    )
}

export default AdminCasePage