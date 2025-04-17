import { useEffect, useState } from "react";
import { ReactComponent as PrevPageIcon } from "../assets/svgs/chevron_left.svg";
import { ReactComponent as NextPageIcon } from "../assets/svgs/chevron_right.svg";

// const PageButton = (page, setPage, isActive) => {

//     return (
//     )
// }

const PageTransitionBar = ({current, setPage, maxPage}) => {
    const [pageShows, setPageShows] = useState([]);

    useEffect(() => {
        var pages = current == 1 ? [current, current+1, current+2] : (current == maxPage ? [current-2, current-1, current] : [current-1, current, current+1]);
        
        setPageShows(pages);
        console.log("Pages: ", pages)
    }, [current])

    const nextPage = () => {
        if (current < maxPage) {
            setPage(current+1);
        }
    }

    const prevPage = () => {
        if (current > 1) {
            setPage(current-1);
        }
    }

    return (
        <div className="items-center flex flex-row space-x-6">
            <PrevPageIcon onClick={prevPage} className="cursor-pointer" />
            {pageShows[0] > 1 ? <p>...</p> : <></>}
            {pageShows.map((item) => (
                
                <div className={`w-10 aspect-square rounded-full flex justify-center items-center ${current == item ? 'bg-gray-light' : 'bg-none'} cursor-pointer`} onClick={() => setPage(item)} key={item}>
                    <p className="text-black italic text-lg">{item}</p>
                </div>
            ))}
            {pageShows[2] < maxPage ? <p>...</p> : <></>}
            <NextPageIcon onClick={nextPage} className="cursor-pointer" />
        </div>
    )
}

export default PageTransitionBar;