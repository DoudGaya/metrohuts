import React from 'react'

const page = () => {
  return (
    <div  className=' w-full flex flex-col'>
      <div className="">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Home Listings</h2>
          <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className=' h-full'>
              <div className=' h-full flex flex-col'>
                {/* <div className="w-full h-48 object-cover rounded-t-lg"></div> */}
                <div className=' flex flex-col'>
                  <div className=' text-xl'></div>
                  <p className="text-sm text-gray-500"> </p>
                  <small className=" italic font-poppins">  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page