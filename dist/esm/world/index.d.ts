import React from 'react';
import './styles.scss';
interface WorldMapProps {
    tooltip: 'on' | 'off';
    landColor: string;
    hoverColor: string;
    landBorder: string;
    tooltipBgColor: string;
    tooltipTextColor: string;
    onCountryClick: (countryAlpha2Code: string) => void;
}
declare const WorldMap: React.FC<WorldMapProps>;
export default WorldMap;
