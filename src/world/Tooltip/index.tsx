import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';

interface TooltipProps {
    targetId: string;
    background: string;
    color: string;
}

interface ITarget extends EventTarget {
    id: string;
    tagName: 'path' | 'polygon';
}

const width = 120;

const Tooltip: React.FC<TooltipProps> = ({ targetId, background, color }) => {
    const tooltip = useRef<HTMLDivElement>();
    const target = useRef<HTMLElement>();

    const [tooltipContent, setTooltipContent] = useState('');

    useEffect(() => {
        if (tooltip.current) {
            if (tooltipContent) {
                tooltip.current.classList.add('show');
            } else {
                tooltip.current.classList.remove('show');
            }
        }
    }, [tooltipContent]);

    const handleMouseMove = (e: MouseEvent) => {
        if (target.current && tooltip.current) {
            if (
                (e.target as ITarget).tagName === 'path' ||
                (e.target as ITarget).tagName === 'polygon'
            ) {
                setTooltipContent((e.target as ITarget).id);
            } else {
                setTooltipContent('');
            }

            if (e.offsetY > target.current.offsetHeight / 2) {
                tooltip.current.style.top = `${e.offsetY - 40}px`;
            } else {
                tooltip.current.style.top = `${e.offsetY + 20}px`;
            }
            if (e.offsetX > target.current.offsetWidth / 2) {
                tooltip.current.style.left = `${e.offsetX - width - 10}px`;
            } else {
                tooltip.current.style.left = `${e.offsetX + 10}px`;
            }
        }
    };

    useEffect(() => {
        const targetRef = document.getElementById(targetId) as HTMLElement;
        const tooltipRef = document.querySelector('.tooltip') as HTMLDivElement;

        if (targetRef) {
            target.current = targetRef;
            tooltip.current = tooltipRef;

            targetRef.addEventListener('mousemove', handleMouseMove);

            return () => {
                targetRef.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    let _style: React.CSSProperties = {};

    if (background) _style.backgroundColor = background;
    if (color) _style.color = color;

    return (
        <div
            className="tooltip"
            style={{ ..._style }}>
            <p>{tooltipContent}</p>
        </div>
    );
};

export default Tooltip;
