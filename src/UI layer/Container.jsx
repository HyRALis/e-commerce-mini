import React from 'react';

export default function Container({ children, tag, classes }) {
    const CustomTag = tag || 'div';

    return <CustomTag className={`container ${classes}`}>{children}</CustomTag>;
}
