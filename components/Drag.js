
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import $ from 'jquery';
const Drag = (data) => {
    const gridRows = data.reduce((acc, cur) => {
        let rowNum = cur.rowCount;
        acc += rowNum;
        return acc
    }, 0)
    // setActiveId(gridRows);
    let $snap = $("#snap");
    let $liveSnap = $("#liveSnap");
    let $container = $(".containers");
    let gridWidth = 4320 / 144;
    let gridHeight = 100
    let gridColumns = 28
    // let gridRows = rows
    let i
    let x
    let y;

    //loop through and create the grid (a div for each cell). Feel free to tweak the letiables above

    for (i = 0; i < gridRows * gridColumns; i++) {
        y = Math.floor(i / gridColumns) * gridHeight;
        x = (i * gridWidth) % (gridColumns * gridWidth);
        $("<div/>").css({ position: "absolute", border: "1px solid #454545", width: gridWidth - 1, height: gridHeight - 1, top: y, left: x }).prependTo($container);
    }
    //set the container's size to match the grid, and ensure that the box widths/heights reflect the letiables above

    const jobIds = data.map(tech => tech.rows.map(row => row.rowJobs.map(job => job.jobId))).flat().flat()
    // console.log($('#helloThere').width(), '#helloThere');

    gsap.set($container, { height: gridRows * gridHeight + 1, width: gridWidth * gridColumns + 4000 });


    function update() {
        const TechNames = data.map(tech => tech.techName);
        let snap = $snap.prop("checked")
        let liveSnap = $liveSnap.prop("checked");
        let lastGridBeforeDead = 0;
        const drag = Draggable.create(".box", {
            bounds: $('#gsapGrid'),
            // edgeResistance: 0.65,
            type: "x,y",
            autoScroll: true,
            liveSnap: true,
            onDrop: function (e) { console.log('e') },
            snap: {
                x: function (endValue) {
                    // console.log(endValue);
                    return (snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
                },
                y: function (endValue) {
                    // console.log(endValue);
                    return (snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
                }
            },
            onDrag: function (e) {
                let rowIndex = e.target?.parentElement?.id;
                try {
                    if (rowIndex.startsWith('row') && !TechNames.includes(rowIndex)) {
                        lastGridBeforeDead = rowIndex.split('-')[1];

                    }
                    else {
                        return
                    }
                } catch (error) {
                }



            },
            onDragEnd: function (e) {
                try {
                    // const st = {
                    //     "text-align ": e.target.style["text-align"],
                    //     "touch-action": e.target.style["touch-action"],
                    //     "cursor": e.target.style["cursor"],
                    //     "user-select ": e.target.style["user-select"],

                    // }
                    // const setyle = { ...e.target.style, ...st }



                    const t = e.target.style.transform.split(',')[0].split('translate3d(').join('')
                    const tX = parseInt(t.split('px')[0])
                    let rowIndex = lastGridBeforeDead - 1

                    const jobId = parseInt(e.target?.id)
                    const tech = $('#' + jobId).attr('tech')
                    const techIndex = data.findIndex(techs => techs.techName === tech)
                    const jobIndex = data[techIndex].rows[rowIndex].rowJobs.findIndex(job => job.jobId === jobId)
                    const job = data[techIndex].rows[rowIndex].rowJobs.find(job => job.jobId === jobId)

                    if (!isNaN(tX) && rowIndex !== undefined) {
                        // setdata(prev => {
                        //     const newData = [...prev];
                        //     newData[techIndex].rows[rowIndex].rowJobs[jobIndex].jobStartHour += tX
                        //     return newData
                        // }
                        // )
                    }



                    for (let i = 0; i < TechNames.length; i++) {
                        const container = $('#' + TechNames[i]);
                        if (this.hitTest(container, '50%')) {
                            if (tech === TechNames[i] && rowIndex !== undefined) return
                            const name = TechNames[i];
                            const indexOfTechName = data.findIndex(tech => tech.techName === name)
                            // setdata(prev => {
                            //     const newData = [...prev];
                            //     newData[techIndex].rows[rowIndex].rowJobs.splice(jobIndex, 1)
                            //     newData[indexOfTechName].rows[0].rowJobs.push(job)
                            //     return newData
                            // })


                        }

                    }
                    // e.target.style = setyle
                    console.log(drag);
                } catch (error) {

                }
            },

        });
        console.log(drag);
    }
    $snap.on("change", applySnap);
    $liveSnap.on("change", applySnap);



    function applySnap() {
        if (!$snap.prop("checked") || $liveSnap.prop("checked")) {
            $(".box").each(function (i, element) {
                gsap.to(element, {
                    x: Math.round(gsap.getProperty(element, "x") / gridWidth) * gridWidth,
                    y: Math.round(gsap.getProperty(element, "y") / gridHeight) * gridHeight,
                    delay: 0.1,
                    ease: "power2.inOut"
                });
            });
        }
        update();
    }

    update()


}
export default Drag;