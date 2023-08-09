import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SmoothStyle = styled.div`
    opacity: 0;
    transform: translateY(40vh);
    visibility: hidden;
    transition: opacity 0.6s ease-out, transform 1.2s ease-out;
    will-change: opacity, visibility;

    &.show{
        opacity: 1;
        transform: none;
        visibility: visible;
    }
`

interface SmoothContentProps {
}

export const SmoothContent: React.FC<SmoothContentProps> = props => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const firstObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                ref.current?.classList.add('show');
            } else {
                ref.current?.classList.remove('show')
            }
        })
        firstObserver.observe(ref.current as any);
    }, [])

    return (
        <SmoothStyle ref={ref}>
            {props.children}
        </SmoothStyle>
    )
}