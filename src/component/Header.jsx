import React from 'react'
import '../assets/Header.css'

// 🔥 NEW PROP: openWishlist
const Header = ({ wishlistCount, openWishlist }) => {
  return (
    <>
      {/* TOP TITLE */}
      <div>
        <h3>Stores for online shopping</h3>
      </div>

      {/* MAIN HEADER */}
      <div className='Pdiv'>
        <p className='Pstore'>Product Store</p>

        {/* 🔥 CLICKABLE WISHLIST */}
        <p 
          id="wishlistCount"
          onClick={openWishlist}           // 🔥 NEW
          style={{ cursor: "pointer" }}   // 🔥 UX improvement
        >
          ❤️ Wishlist: {wishlistCount}
        </p>
      </div>
    </>
  )
}

export default Header






























// import React from 'react'
// import '../assets/Header.css'

// const Header = ({ wishlistCount }) => {
//   return (
//     <>
//       {/* TOP TITLE */}
//       <div>
//         <h3>Stores for online shopping</h3>
//       </div>

//       {/* MAIN HEADER */}
//       <div className='Pdiv'>
//         <p className='Pstore'>Product Store</p>

//         {/* DYNAMIC WISHLIST COUNT */}
//         <p id="wishlistCount">
//           ❤️ Wishlist: {wishlistCount}
//         </p>
//       </div>
//     </>
//   )
// }
// // className='Pdiv'
// export default Header;






















// import React from 'react'
// import  '../assets/Header.css'

// const Header = () => {
//   return (
//     <>
//     <div >
//       <h3>Stores for online shopping</h3>
//     </div>
//     <div className='Pdiv'>
//         <p className='Pstore'>Product Store </p>
//         {/* <input type='text' placeholder='Seach Productd' className="searchproduct"/> */}
//         {/* <input type="text" placeholder='All Category ' className='All-Category'/> */}
//         <p id="wishlistCount">❤️ Wishlist: 0</p>

//     </div>
// </>
//   )
// }

// export default Header
