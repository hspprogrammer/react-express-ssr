import React from 'react';
import history from '../../history';


function isLeftClickEvent (event) {
    return event.button === 0;
}

function isModifiedEvent (event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function handleClick (props, event) {
    if (props.onClick) {
        props.onClick(event);
    }

    if (props.target === '_blank') {
        return;
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
    }

    if (event.defaultPrevented === true) {
        return;
    }

    event.preventDefault(); //阻止默认行为
    history.push(props.to);
}


export default function Link (props) {
    const { to, children, target = '_self' } = props;
    return (
        <a href={to} target={target} onClick={e => handleClick(props, e)}>
            {children}
        </a>
    );
}

