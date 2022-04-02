import React from 'react';

export default function Plus({ fill, width, height, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill={fill} />
        </svg>
    );
}
