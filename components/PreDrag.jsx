import { memo, useEffect, useMemo, useRef, useState } from "react";

import data from "./jsonse.json";
import Drop from "./drop";
import { gsap } from "gsap/dist/gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";

import { DragDropContext as ContextDnd, Droppable as Dropa } from "react-beautiful-dnd";
import { resetServerContext } from 'react-beautiful-dnd';
import Drag from "./Drag";
import Borders from "./Borders";
function PreDrag() {
    const [dataFromSever, setDataFromSever] = useState(data);
    const [activeId, setActiveId] = useState(dataFromSever.reduce((acc, cur) => {
        let rowNum = cur.rowCount;
        acc += rowNum;
        return acc
    }, 0));


    useEffect(() => {
        gsap.registerPlugin(Draggable, InertiaPlugin);
        Drag(dataFromSever);

    }, [])

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


        <ContextDnd onDragEnd={onDragEnd}>
            <Dropa droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        className='grid m-auto'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div id="techsList" className=" relative "  >
                            <div className="containers" >
                                <div className="new-container sticky z-[100] ">

                                    {dataFromSever.map((tech, i) => (
                                        <Drop
                                            i={i}
                                            index={i}
                                            techID={tech.techId}
                                            tech={tech}
                                            dataFromSever={dataFromSever}
                                            setDataFromSever={setDataFromSever}

                                        />




                                    ))}
                                </div>

                                <Borders />
                                <label><input type="checkbox" name="snap" id="snap checked " value="1" defaultChecked /> Snap end position to grid</label>
                                <label><input type="checkbox" name="liveSnap" id="liveSnap" value="1" defaultChecked /> Live snap</label>
                            </div>
                            <div className="absolute top-0  grid grid-cols-[200px_1fr]">
                                <div>

                                </div>
                                <div id="gsapGrid" className="w-[4320px] h-[700px]"
                                    style={{
                                        height: activeId * 100 + "px",
                                    }}
                                >

                                </div>
                            </div>
                        </div >

                        {provided.placeholder}
                    </div>
                )}
            </Dropa>
        </ContextDnd>



    )

}
export default memo(PreDrag);




export const getServerSideProps = async (ctx) => {
    resetServerContext();

    return {
        props: {}
    }
}