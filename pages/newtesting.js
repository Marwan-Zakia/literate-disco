import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import data from "../components/jsonse.json";
import { resetServerContext } from 'react-beautiful-dnd';
export default function newtesting() {
    const [dataFromSever, setDataFromSever] = useState(data)


    // const onDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;
    //     if (!result.destination) {
    //         return;
    //     }


    //     console.log(destination, source, draggableId);

    //     // setDataFromSever(prev => {
    //     //     const listCopy = [...prev];
    //     //     const dropID = destination.droppableId.slice(0, -1);
    //     //     const sorceDropID = source.droppableId.slice(0, -1);
    //     //     console.log(dropID, sorceDropID);
    //     //     const id = draggableId.slice(0, -1);
    //     //     const IndexofSorce = listCopy.findIndex(x => x.techId === Number(sorceDropID));
    //     //     const IndexofDest = listCopy.findIndex(x => x.techId === Number(dropID));
    //     //     let rowIndex = 0
    //     //     console.log(listCopy[IndexofSorce]);
    //     //     const bs = listCopy[IndexofSorce].rows[0].rowJobs.findIndex(x => x.jobId === Number(id))
    //     //     // console.log(listCopy[IndexofSorce].rows.rowJobs[0].findIndex(x => x.jobId === Number(id)));
    //     //     if (bs.jobId !== Number(id) && listCopy[IndexofSorce].rows[0].rowJobs.findIndex(x => x.jobId === Number(id)).jobId !== -1) {
    //     //         rowIndex = 0
    //     //     }
    //     //     else {
    //     //         rowIndex = 1
    //     //     }
    //     //     const currentJobIndex = listCopy[IndexofSorce].rows[rowIndex].rowJobs.findIndex(x => x.jobId === Number(id))
    //     //     const currentJob = listCopy[IndexofSorce].rows[rowIndex].rowJobs[currentJobIndex]


    //     //     listCopy[IndexofSorce].rows[rowIndex].rowJobs.splice(currentJobIndex, 1)
    //     //     listCopy[IndexofDest].rows[0].rowJobs.splice(destination.index, 0, currentJob)

    //     //     return listCopy
    //     // }
    //     // )

    //     console.log(result, 'resulst');
    // }

    // const onDragStart = (result) => {
    //     // console.log(result, 'resulst');
    // }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = (result) => {
        // dropped outside the list
        const { destination, source, draggableId } = result;

        if (!result.destination) {
            return;
        }

        const items = reorder(
            dataFromSever,
            result.source.index,
            result.destination.index
        );

        setDataFromSever(items)
    }

    return (

        <div className='grid '>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            className='grid m-auto'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {dataFromSever.map((item, index) => (

                                <Draggable key={item.techId} draggableId={`${item.techId}`} index={index} >
                                    {(provided, snapshot) => (
                                        <div
                                        
                                            className={`test${index} w-48 m-1 flex text-center justify-center items-center border  border-amber-400 `}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}

                                        >
                                            <div {...provided.dragHandleProps}>DRAG</div>
                                            {item.techName}
                                        </div>
                                    )}
                                </Draggable>


                            ))}





                            
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}


export const getServerSideProps = async (ctx) => {
    resetServerContext();

    return {
        props: {}
    }
}







