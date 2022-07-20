import React, { useEffect, useState } from 'react'
// import Dragmain from '../components/Dragmain';
import Header from '../components/header';
import PreDrag from '../components/PreDrag';


export default function Testing() {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(process.browser);
    }, []);

    return (
        <>

            {/* <TechDashBoard /> */}

            <Header />
            <PreDrag />

        </>


    );
}
