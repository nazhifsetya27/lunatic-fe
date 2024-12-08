import React from 'react'
import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react'
import MyButton from '../Button/MyButton'

const MyPagination = ({ meta, onChange }) => {
  const generatePagination = () => {
    const pagination_range = 3
    const current_page = parseInt(meta?.current_page)
    const total_page = meta?.total_page
    const pages_to_display = []

    if (total_page > 7) {
      if (current_page - pagination_range <= 0) {
        for (let page = 1; page <= 5; page++) {
          pages_to_display.push({ page: page, text: page })
        }
        pages_to_display.push({ page: null, text: '...' })
        pages_to_display.push({ page: total_page, text: total_page })
      } else if (current_page + pagination_range >= total_page) {
        pages_to_display.push({ page: 1, text: 1 })
        pages_to_display.push({ page: null, text: '...' })
        for (let page = total_page - 4; page <= total_page; page++) {
          pages_to_display.push({ page: page, text: page })
        }
      } else {
        pages_to_display.push({ page: 1, text: 1 })
        pages_to_display.push({ page: null, text: '...' })
        for (let page = current_page - 1; page <= current_page + 1; page++) {
          pages_to_display.push({ page: page, text: page })
        }
        pages_to_display.push({ page: null, text: '...' })
        pages_to_display.push({ page: total_page, text: total_page })
      }
    } else {
      for (let page = 1; page <= total_page; page++) {
        pages_to_display.push({ page: page, text: page })
      }
    }

    return pages_to_display
  }

  // const generatePagination = () => {
  //     const pagination_range = 2;
  //     const current_page = parseInt(meta?.current_page);
  //     const total_page = meta?.total_page;
  //     const pages_to_display = [];

  //     if (total_page > 5) {
  //         if (current_page <= pagination_range) {
  //             for (let page = 1; page <= 5; page++) {
  //                 pages_to_display.push({ page: page, text: page });
  //             }

  //             pages_to_display.push({ page: total_page, text: `... ${total_page}` });
  //         } else if (current_page > (total_page - pagination_range)) {
  //             let end = Math.max(1, (total_page - 5));
  //             for (let page = total_page; page > end; page--) {
  //                 pages_to_display.push({ page: page, text: page });
  //             }

  //             if (end !== 1) {
  //                 pages_to_display.push({ page: 1, text: `1 ...` });
  //             }

  //             pages_to_display.reverse();
  //         } else {
  //             let start = Math.max(1, current_page - pagination_range);
  //             let end = Math.min(total_page, current_page + pagination_range);

  //             if (start !== 1) {
  //                 pages_to_display.push({ page: 1, text: `1 ...` });
  //             }

  //             for (let page = start; page <= end; page++) {
  //                 pages_to_display.push({ page: page, text: page });
  //             }

  //             if (end !== total_page) {
  //                 pages_to_display.push({ page: total_page, text: `... ${total_page}` });
  //             }
  //         }
  //     } else {
  //         for (let page = 1; page <= total_page; page++) {
  //             pages_to_display.push({ page: page, text: page });
  //         }
  //     }

  //     return pages_to_display;
  // };

  const renderPageButtons = () => {
    const pages_to_display = generatePagination()
    return pages_to_display.map((e, i) =>
      e.text === '...' ? (
        <div
          key={i}
          className="flex h-10 w-max min-w-[40px] items-center justify-center"
        >
          <div className="text-sm-medium flex h-5 w-3 items-end justify-center text-center text-gray-light/600">
            {e.text}
          </div>
        </div>
      ) : (
        <button
          key={i}
          className={`${e.page === parseInt(meta?.current_page) ? 'bg-gray-light/50 text-gray-light/800' : 'text-gray-light/600'} text-sm-medium h-10 w-max min-w-[40px] rounded-md`}
          onClick={() => onChange && onChange(e.page)}
        >
          {e.text}
        </button>
      )
    )
  }
  // const renderPageButtons = () => {
  //     const pages_to_display = generatePagination();

  //     return pages_to_display.map((e, i) => (
  //         <button key={i} className={`${e.page === parseInt(meta?.current_page) ? 'bg-gray-light/50 text-gray-light/800' : 'text-gray-light/600'} text-sm-medium w-max h-10 min-w-[40px] rounded-md`}
  //             onClick={() => onChange && onChange(e.page)}
  //         // onClick={() => setParams((value) => { return { ...value, page: e.page }; })}
  //         >
  //             {e.text}
  //         </button>
  //     ));
  // };

  const handlePrevious = () => {
    if (meta.prev_page) {
      onChange && onChange(meta.prev_page)
      // setParams((value) => {
      //     return { ...value, page: value.page - 1 };
      // })
    }
  }
  const handleNext = () => {
    if (meta.next_page) {
      onChange && onChange(meta.next_page)
      // setParams((value) => {
      //     return { ...value, page: value.page + 1 };
      // })
    }
  }

  return (
    <div className="flex w-full items-center justify-between gap-x-3 px-6 pb-4 pt-3">
      {/* <div>
                <p className="text-sm-medium text-gray-light/700">Page <span>1</span> of <span>10</span></p>
            </div>
            <div className="flex items-center gap-3">
                <MyButton color={"secondary"} variant={'outlined'} disabled size={"sm"} >
                    <p className='text-sm-semibold'>Previous</p>
                </MyButton>
                <MyButton color={"secondary"} variant={'outlined'} disabled size={"sm"} >
                    <p className='text-sm-semibold'>Next</p>
                </MyButton>
            </div> */}
      <div className="flex flex-1 justify-start">
        <button
          disabled={!meta?.prev_page}
          onClick={handlePrevious}
          className={`${meta?.prev_page ? 'border border-gray-light/300 text-gray-light/700 shadow-shadows/shadow-xs' : 'border border-gray-light/200 text-gray-light/400'} flex items-center gap-x-1.5 rounded-md px-3 py-2`}
        >
          <ArrowLeft size={20} stroke={'currentColor'} />
          <p className="text-sm-semibold">Previous</p>
        </button>
      </div>
      <div className="flex items-center gap-0.5">{renderPageButtons()}</div>
      <div className="flex flex-1 justify-end">
        <button
          disabled={!(meta?.next_page && meta?.next_page <= meta?.total_page)}
          onClick={handleNext}
          className={`${meta?.next_page && meta?.next_page <= meta?.total_page ? 'border border-gray-light/300 text-gray-light/700 shadow-shadows/shadow-xs' : 'border border-gray-light/200 text-gray-light/400'} flex items-center gap-x-1.5 rounded-md px-3 py-2`}
        >
          <ArrowRight size={20} stroke={'currentColor'} />
          <p className="text-sm-semibold">Next</p>
        </button>
      </div>
    </div>
  )
}

export default MyPagination
