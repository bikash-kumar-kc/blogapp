
import {Container,PostCard} from "../components"
import { useSelector } from 'react-redux'


const AllPosts = () => {

    
    const posts = useSelector(store=>store.blog.posts)
    
  return (
    <div className='w-full py-8' >
      <Container>
        <div className='flex flex-wrap gap-10'>
            {
                posts?posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/3'>
                        <PostCard {...post} />
                    </div>
                )):(<div
                className='min-h-4xl bg-red-600'
                >

                </div>)
            }
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
