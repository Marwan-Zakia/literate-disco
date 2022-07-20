import { memo, useEffect, useMemo, useRef, useState } from "react";

import data from "./jsonse.json";
import { gsap } from "gsap/dist/gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import $ from 'jquery';
function Dragmain() {
    const techDrag = () => {
        var rowSize = 100; // => container2 height / number of items
        var container2 = document.querySelector(".container2");
        var listItems = Array.from(document.querySelectorAll(".list-item2")); // Array of elements
        var sortables = listItems.map(Sortable); // Array of sortables
        var total = sortables.length ;

        gsap.to(container2, 0.5, { autoAlpha: 1 });

        function changeIndex(item, to) {

            // Change position in array
            arrayMove(sortables, item.index, to);

            // Change element's position in DOM. Not always necessary. Just showing how.
            if (to === total - 1) {
                container2.appendChild(item.element);
            } else {
                var i = item.index > to ? to : to + 1;
                container2.insertBefore(item.element, container2.children[i]);
            }

            // Set index for each sortable
            sortables.forEach((sortable, index) => sortable.setIndex(index));
        }

        function Sortable(element, index) {

            var content = element.querySelector(".item-content");
            var order = element.querySelector(".order");

            var animation = gsap.to(content, 0.3, {
                boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                force3D: true,
                scale: 1.1,
                paused: true
            });

            var dragger = new Draggable(element, {
                onDragStart: downAction,
                onRelease: upAction,
                onDrag: dragAction,
                cursor: "inherit",
                type: "y"
            });

            // Public properties and methods
            var sortable = {
                dragger: dragger,
                element: element,
                index: index,
                setIndex: setIndex
            };

            gsap.set(element, { y: index * rowSize });

            function setIndex(index) {

                sortable.index = index;
                order.textContent = index + 1;

                // Don't layout if you're dragging
                if (!dragger.isDragging) layout();
            }

            function downAction() {
                animation.play();
                this.update();
            }

            function dragAction() {

                // Calculate the current index based on element's position
                var index = clamp(Math.round(this.y / rowSize), 0, total - 1);

                if (index !== sortable.index) {
                    changeIndex(sortable, index);
                }
            }

            function upAction() {
                animation.reverse();
                layout();
            }

            function layout() {
                gsap.to(element, 0.3, { y: sortable.index * rowSize });
            }

            return sortable;
        }

        // Changes an elements's position in array
        function arrayMove(array, from, to) {
            array.splice(to, 0, array.splice(from, 1)[0]);
        }

        // Clamps a value to a min/max
        function clamp(value, a, b) {
            return value < a ? a : (value > b ? b : value);
        }




    }



    useEffect(() => {

        gsap.registerPlugin(Draggable, InertiaPlugin);
        techDrag()

    }, [])


    return (

        <div className="container2 relative h-[800px] w-[400px]"  >
                {data.map((job, i) => (
                    <div key={i} id={job.techName} className="list-item2 h-[200px] w-full absolute top-[0px] left-[0px]">
                        <div className="item-content h-full w-full">
                            <span className="order">{i}</span>{job.techName}
                        </div>
                                {/* <div className="h-[2px] w-full bg-black absolute bottom-0"></div> */}


                    </div>

                ))}

               </div>


    )

}
export default memo(Dragmain);

