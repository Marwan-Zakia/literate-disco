/* 
  const techDrag = () => {
        const container = document.querySelector(".new-container");
        const listItems = Array.from(document.querySelectorAll(".new-list-item")); // Array of elements
        const sortables = listItems.map(Sortable); // Array of sortables
        const rowSize = 100;
        const total = sortables.length;



        function changeIndex(item, to) {
            arrayMove(sortables, item.index, to);

            // Change element's position in DOM. Not always necessary. Just showing how.
            if (to === total - 1) {
                container.appendChild(item.element);
            } else {
                const i = item.index > to ? to : to + 1;
                container.insertBefore(item.element, container.children[i]);
            }

            // Set index for each sortable
            sortables.forEach((sortable, index) => sortable.setIndex(index));


        }
        function Sortable(element, index) {
            const trigger = $(element).find("#trigger");
            const content = $(element).find(".new-item-content");
            const animation = gsap.to(content, 2, {
                ease: "power2.inOut",
                opacity: 1,
                stagger: {
                    amount: 10,
                    from: "center"
                }
            });


            const dragger = new Draggable(element, {
                onDragStart: downAction,
                onRelease: upAction,
                onDrag: dragAction,
                trigger: trigger,
                type: "y",
                bounds: container,
                inertia: false,
                liveSnap: true,
                snap: {
                    y: function (endValue) {
                        return Math.round(endValue / rowSize) * rowSize;
                    }

                }


            });

            const sortable = {
                dragger: dragger,
                element: element,
                index: index,
                setIndex: setIndex
            };
            gsap.set(parent, { y: index * rowSize, backgroundColor: 'white' });

            function setIndex(index) {
                sortable.index = index;
                if (!dragger.isDragging) layoutt()
            }
            function downAction() {
                animation.play();
                this.update();
                layoutt();
            }

            function dragAction() {
                const index = clamp(Math.round(this.y / rowSize), 0, total - 1);
                if (index !== sortable.index) {
                    changeIndex(sortable, index);
                }
                layoutt();
            }
            function upAction() {
                animation.reverse();
                layoutt();
            }

            function layoutt() {
                gsap.to(parent, 0.3, { y: sortable.index * rowSize })
            }
            return sortable;
        }

        // Changes an elements's position in array
        function arrayMove(array, from, to) {
            array.splice(to, 0, array.splice(from, 1)[0]);

        }

        // Clamps a value to a min/max
        function clamp(value, a, b) {
            return Math.max(a, Math.min(b, value));

        }

    }
    const techDrags = () => {
        const container = $(".new-container");
        const ArrayOfContainerItems = Array.from($(".new-list-item"));
        const sortables = ArrayOfContainerItems.map(Sortable);
        const rowSize = 50;
        const sortableLength = sortables.length;
        function Sortable(parent, index) {
            // const parent = element.parentElement.parentElement;
            const element = $(parent).find("#trigger");
            const content = $(parent).find(".new-item-content");
            const order = $(parent).find(".new-order");

            const animation = gsap.to(content, 0.3, {
                boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                force3D: true,
                scale: 1.01,
                paused: true,
                backgroundColor: "red",
            });
            const dragger = new Draggable(parent, {
                onDragStart: function () { animation.play() },
                onRelease: upAction,
                onDrag: dragAction,
                trigger: element,
                cursor: "inherit",
                type: "y"
            });

       

            // Public properties and methods
            const sortable = {
                dragger: dragger,
                parent: parent,
                index: index,
                setIndex: function (index) {
                    sortable.index = index;
                    order.text(index + 1);
                    if (!dragger.isDragging) layout(parent, sortable);
                }
            };

            gsap.set(parent, { y: index * rowSize, backgroundColor: 'white' });


            function dragAction() {

                // Calculate the current index based on element's position
                const index = clamps(Math.round(this.y / rowSize), 0, total - 1);
                if (index !== sortable.index) {
                    changeIndex(sortables, sortable, index, container, total);
                }
            }

            function upAction() {
                animation.reverse();
                layout(parent, sortable);
            }
            return sortable;
        }

        const changeIndex = (sortables, item, to, container, total) => {
            // Change position in array
            arrMove(sortables, item.index, to);

            // Change element's position in DOM. Not always necessary. Just showing how.
            if (to === total - 1) {
                container.appendChild(item.parent);
            } else {
                const i = item.index > to ? to : to + 1;
                container.insertBefore(item.parent, container.children[i]);
            }

            // Set index for each sortable
            sortables.forEach((sortable, index) => sortable.setIndex(index));
        }


        const clamps = (value, a, b) => {
            return value < a ? a : (value > b ? b : value);
        }
        const layout = (parent, sortable) => {
            gsap.to(parent, 0.3, { y: sortable.index * rowSize })
        }

        const arrMove = (array, from, to) => {
            array.splice(to, 0, array.splice(from, 1)[0]);
        }
    }
 */


/*     const techDrag = () => {
        console.log(IsMov);
        if (IsMov === false) return

        const container2 = document.querySelector(".new-container");
        const rowSize = 8;
        const listItems = Array.from(document.querySelectorAll(".btn")); // Array of elements
        const sortables = listItems.map(Sortable); // Array of sortables
        const total = sortables.length;



        function changeIndex(item, to) {
            arrayMove(sortables, item.index, to);
            if (to === total - 1) {
                container2.appendChild(item.element);
            } else {
                const i = item.index > to ? to : to + 1;
                container2.insertBefore(item.element, container2.children[i]);
            }
            sortables.forEach((sortable, index) => sortable.setIndex(index));
        }
        function Sortable(element, index) {
            const content = element.querySelector(".new-item-content");
            const animation = gsap.to(content, 2, {
                ease: "power2.inOut",
                opacity: 1,
                stagger: {
                    amount: 0.1,
                    from: "center"
                }
            });

            const dragger = new Draggable(element, {
                onDragStart: downAction,
                onRelease: upAction,
                onDrag: dragAction,
                cursor: "hold",
                type: "y",
                snap: {
                    y: function (endValue) {
                        return Math.round(endValue / rowSize) * rowSize * 10;
                    }
                },
                onDragEnd: function (e) {
                    layoutt();
                    setIsMov(false);
                }
            });
            const dragers = Array(dataFromSever.length).fill(dragger);

            if (IsMov) {
                dragers.forEach((dragger, index) => {
                    dragger.enable();

                });
            }
            console.log(dragers);



            const sortable = {
                dragger: dragger,
                element: element,
                index: index,
                setIndex: setIndex
            };
            gsap.set(element, { y: index + 1 });
            function setIndex(index) {
                sortable.index = index;
                if (!dragger.isDragging) {
                    layoutt()
                    setIsMov(false);
                    dragers.forEach((dragger, index) => {
                        dragger.disnable();

                    });

                };
            }

            function downAction() {
                animation.play();
                this.update();
            }

            function dragAction() {
                const index = clamp(Math.round(this.y / rowSize), 0, total - 1);
                if (index !== sortable.index) {
                    changeIndex(sortable, index);
                }
            }
            function upAction() {
                animation.reverse();
                dragers.forEach((dragger, index) => {
                    dragger.disable();
                    console.log('disabled');
                });
                layoutt();
            }

            function layoutt() {
                gsap.to(element, .2, { ease: "power2.inOut" });
            }
            return sortable;
        }

        // Changes an elements's position in array
        function arrayMove(array, from, to) {
            array.splice(to, 0, array.splice(from, 1)[0]);

        }

        // Clamps a value to a min/max
        function clamp(value, a, b) {
            return Math.max(a, Math.min(b, value));

        }


            // const Hours = dataFromSever.map(item => item.rows.map(item => item.rowJobs.map(item => item.jobStartHour))).flat().flat();
    // const EndHours = dataFromSever.map(item => item.rows.map(item => item.rowJobs.map(item => item.jobEndHour))).flat().flat();
    // const arr = []

    // for (let i = 0; i < Hours.length; i++) {
    //     const hour = Hours[i];
    //     const endHour = EndHours[i];
    //     const start = moment(hour).format("HH:mm");
    //     const end = moment(endHour).format("HH:mm");
    //     // const duration = moment.duration(end.diff(start));
    //     arr.push({ hour: (((hour -endHour)/3/60)) })
    // }





    } */