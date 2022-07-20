
import moment from "moment";
import { useEffect, useState } from "react";


const JobsCard = ({ jobStartHour, jobEndHour, jobId, key, setCurrentHour, row, job, techID, i, top, setElement, jobTime, techName, getTime }) => {

    const [Time, setTime] = useState(0)
    useEffect(() => {
        newTime()
    }, [Time, setTime])

    const newTime = () => {
        setTime(getTimes((jobStartHour / 3) / 60))
    }

    const getTimes = (time) => {
        return moment(time).format('h:mm:ss a');
    }

    return (
        <div
            className="box z-10 ml-2 bg-teal-500 rounded-xl shadow-md inline  text-clip resize-x "

            style={{
                position: "absolute",
                left: `${jobStartHour}px`,
                width: `${jobTime * 3}px`,
                height: "100%",
                textAlign: "center"
            }}
            tech={techName}

            id={jobId}

        >



            Job id :  {jobId}
            <br />
            tech : {techName}
            <br />
            start : {Time}
            <br />
            end : {getTimes(((jobEndHour / 3) / 60))}
            <br />
            duration :{jobTime} min



        </div>

    )
}
export default JobsCard