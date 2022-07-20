import JobsCard from "./JobsCard"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
// import { Draggable } from "gsap/dist/Draggable";
import { Draggable as DndDraggable  } from "react-beautiful-dnd";
import $ from 'jquery';


const Drop = ({ job, dataFromSever, setDataFromSever, techID, i, index, tech, getTime }) => {
    const [top, setTop] = useState(0)
    const [element, setElement] = useState(null)
    const [currentHour, setCurrentHour] = useState({})





    return (
        <DndDraggable key={tech.techId} draggableId={`${tech.techId}`} index={index} >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}

                >



                    <div key={i} className="new-list-item  w-full">
                        <div id={i} index={i} className=" new-item-content  grid grid-cols-[4.1%_1fr] "   >

                            <div className={` new-order grid bg-gray-200 sticky relatvie left-0 z-[9999999] grid-cols-[20px_1fr] w-[200px] `} >
                                {/* sharmta */}
                                <div className=" h-[2px] w-full bg-black absolute bottom-0"> </div>


                                <button
                                  

                                    className=" btn bg-[#929191b5] h-full w-full">
                                    &#9783;
                                </button>


                                <p className=" order grid m-auto "   id={tech.techID} {...provided.dragHandleProps}>{tech.techName}</p>
                            </div>


                            <div id={tech.techName} tech={tech.techName} className=' bg-gray-400  relative w-[4320px] '>

                                {/* sharmta */}
                                {tech.rows.map((row, i) => (

                                    <div id={`row-${row.rownumber}`} tech={tech.techName} className='h-[100px]  relative' key={i} >

                                        {
                                            row.rowJobs.map((job, j) => {

                                                return (
                                                    <JobsCard
                                                        key={j}
                                                        jobTime={job.jobTime}
                                                        techName={tech.techName}
                                                        setElement={setElement}
                                                        top={top} setTop={setTop}
                                                        handle={true} i={index} row={i} job={j} techID={techID} setCurrentHour={setCurrentHour}
                                                        jobStartHour={job.jobStartHour} jobEndHour={job.jobEndHour} jobId={job.jobId} getTime={getTime}

                                                    />



                                                )
                                            }



                                            )
                                        }

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

      
     
                </div>
            )}
        </DndDraggable>


    )
}
export default Drop



