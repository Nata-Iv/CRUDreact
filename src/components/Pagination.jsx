import React from "react"

const Pagination = () => {
    
}

// const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
//     const pageNumbers = []
//     for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
//         pageNumbers.push(i)
//     }
//     return (
//         <div>
//             <ul className="pagination">
//                {
//                 pageNumbers.map(number => (
//                     <li className="page-item" key={number}>
//                         <a href="#" className="page-num" onClick={() => paginate(number)}>
//                             {number}
//                         </a>
//                     </li>
//                 ))
//                } 
//             </ul>
//         </div>
//     )
// }

export default Pagination