import { useEffect } from 'react'
import { gsap } from "gsap/dist/gsap";
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import $ from 'jquery';

export default function Home() {


  const fkit = () => {
    /*
    See https://greensock.com/draggable/ for details. 
    This demo uses InertiaPlugin which is a membership benefit of Club GreenSock, https://greensock.com/club/
    */


    gsap.registerPlugin(InertiaPlugin);
    console.log($("body").width())
    let $snap = $("#snap");
    let $liveSnap = $("#liveSnap");
    let $container = $(".container");
    let gridWidth =  144
    let gridHeight = 100
    let gridRows = 2
    let gridColumns = 288
    let i
    let x
    let y;

    //loop through and create the grid (a div for each cell). Feel free to tweak the variables above
    for (i = 0; i < gridRows * gridColumns; i++) {
      y = Math.floor(i / gridColumns) * gridHeight; //calculate the y position
      x = (i * gridWidth) % (gridColumns * gridWidth); //calculate the x position
      $("<div/>").css({ position: "absolute", border: "1px solid #454545", width: gridWidth - 1, height: gridHeight - 1, top: y, left: x }).prependTo($container);
    }

    //set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
    gsap.set($container, { height: gridRows * gridHeight + 1, width:  gridWidth  });
    gsap.set(".box", { width: 60, height: gridHeight, lineHeight: gridHeight + "px" });
    gsap.set("#box2", { width: 120, height: gridHeight, lineHeight: gridHeight + "px", top: gridHeight * 1, left: (gridWidth * 288) });

    //the update() function is what creates the Draggable according to the options selected (snapping).
    function update() {
      var snap = $snap.prop("checked"),
        liveSnap = $liveSnap.prop("checked");
      Draggable.create(".box", {
        bounds: $('body'),
        edgeResistance: 0.65,
        type: "x,y",
        inertia: false,
        autoScroll: true,
        liveSnap: liveSnap,
        DragEvent: function (endValue) {
          console.log(endValue);
        },
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

        onDragEnd: function (endValue) {
          console.log(endValue);
        }


      });
    }

    //when the user toggles one of the "snap" modes, make the necessary updates...
    $snap.on("change", applySnap);
    $liveSnap.on("change", applySnap);

    function applySnap() {
      // if ($snap.prop("checked") || $liveSnap.prop("checked")) {

      $(".box").each(function (index, element) {
        gsap.to(element, {
          x: Math.round(gsap.getProperty(element, "x") / gridWidth) * gridWidth,
          y: Math.round(gsap.getProperty(element, "y") / gridHeight) * gridHeight,
          delay: 0.1,
          ease: "power2.inOut"
        });
      });
      // }
      update();
    }

    update();


  }
  useEffect(() => {


    // fitchData();
    gsap.registerPlugin(Draggable, InertiaPlugin);

    fkit();


  }, [])
  //see https://www.greensock.com/draggable/ for more details.


  //the overlapThreshold can be a percentage ("50%", for example, would only trigger when 50% or more of the surface area of either element overlaps) or a number of pixels (20 would only trigger when 20 pixels or more overlap), or 0 will trigger when any part of the two elements overlap.

  //we'll call onDrop() when a Draggable is dropped on top of one of the "droppables", and it'll make it "flash" (blink opacity). Obviously you can do whatever you want in this function.
  function onDrop(dragged, dropped) {
    gsap.fromTo(dropped, { opacity: 1 }, { duration: 0.1, opacity: 0, repeat: 3, yoyo: true });

  }



  // update();


  return (


    <section>



      <div id="container" className='container w-[1000]' >
        <div className="box" id="box1" style={{ width: "400px;" }}>fk me</div>
        <div className="box" id="box2" style={{ backgroundColor: "red;" }}>fk me 2</div>
        <div className='bg-red-400 w-full h-full absolute top-0 -z-20 '>
          <div className=' relative w-full h-full flex'>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
            <div className='w-[4.166666666666667%] grid'><div className='w-full h-full border-r-2'></div></div>
          </div>
        </div>
      </div>
      <div className="controls">
        <ul>
          <li className="controlsTitle">Options</li>
          <li>
            <label><input type="checkbox" name="snap" id="snap checked " value="1" /> Snap end position to grid</label>
          </li>
          <li>
            <label><input type="checkbox" name="liveSnap" id="liveSnap" value="1" /> Live snap</label>
          </li>
        </ul>
      </div>

    </section>

  )
}


