import React, { useEffect, useRef, useState } from 'react';
import './MouseFollower.css';

const MouseFollower = () => {
    const followerRef = useRef(null);

    const [circleSize, setCircleSize] = useState(30)

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${e.clientX - circleSize / 2}px, ${e.clientY - circleSize / 2}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <div ref={followerRef} className="mouse-follower" style={{ '--size': `${circleSize}px` }} />;
};

export default MouseFollower;