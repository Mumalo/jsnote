import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;

        if (timer){
            clearTimeout(timer);
        }

        const listener = () => {
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);

                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100)
        }

        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width])

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints: [innerWidth* 0.2, Infinity],
            maxConstraints: [innerWidth * 0.7, Infinity],
            height: Infinity,
            width,
            resizeHandles: ["e"],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ["s"],
            maxConstraints: [Infinity, innerHeight*0.9]
        }
    }
    return (
        <ResizableBox{...resizableProps}>
            {children}
        </ResizableBox>
    )
};

export default Resizable;


/*
 height={200}
            width={Infinity}
            resizeHandles={["s"]}
            maxConstraints={[Infinity, window.innerHeight*0.9]}
 */
