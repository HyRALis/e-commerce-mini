import React from 'react';

export default function ArrowDown({ fill, width, height, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} viewBox="0 0 24 24">
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" fill={fill} />
        </svg>
    );
}
