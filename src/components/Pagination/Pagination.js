import React from "react";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="pageItem">
                        <a onClick={() => paginate(number)} href="!#" className="pageLink">
                            {number}
                        </a>
                    </li>
                ) )}
            </ul>
        </nav>
    )
}

export default Pagination;