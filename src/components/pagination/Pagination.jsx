import { PropaneTankSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./pagination.css";



function Pagination(data) {
    // console.log(data)
    // const[data,setData] = useState()
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(20);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        data.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
            <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage == number ? "active" : null}
            >
            {number}
            </li>
        );
        } else {
        return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        console.log("currentPage;", currentPage)

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
        if (pages.length > maxPageNumberLimit) {
            pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const handleLoadMore = () => {
        setitemsPerPage(itemsPerPage + 5);
    };

    return (
        <>

        <ul className="pageNumber">
            <li >

                <button className="button"
                    onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false}
                >
                    Prev
                </button>
            </li>
                {pageDecrementBtn}

                {renderPageNumbers}

                {pageIncrementBtn}

            <li>
                <button
                    onClick={handleNextbtn}
                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                >
                Next
                </button>
            </li>

            </ul>
                <button onClick={handleLoadMore} className="loadmore">
                    Load More
                </button>
            </>
    );
}

export default Pagination;
