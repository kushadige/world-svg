import React from 'react';
import './styles.scss';
interface TooltipProps {
    targetId: string;
    background: string;
    color: string;
}
declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
