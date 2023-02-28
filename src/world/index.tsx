import React, { useEffect } from 'react';
import Tooltip from './Tooltip';
import { ReactComponent as World } from '../assets/world.svg';
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

interface CSSPropertiesWithVars extends React.CSSProperties {
    '--landColor'?: string;
    '--hoverColor'?: string;
    '--landBorder'?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({
    tooltip = 'on',
    landColor = '#0f172a',
    hoverColor = '#f59e0b',
    landBorder = '#eeeeee',
    tooltipBgColor = '#000000',
    tooltipTextColor = '#ffffff',
    onCountryClick = null,
}) => {
    let _style: CSSPropertiesWithVars = {};

    if (landColor) _style['--landColor'] = landColor;
    if (hoverColor) _style['--hoverColor'] = hoverColor;
    if (landBorder) _style['--landBorder'] = landBorder;

    const handleCountryClick = (e: MouseEvent) => {
        if (onCountryClick) {
            const countryId = (e.target as SVGPathElement | SVGPolygonElement)
                .id;
            onCountryClick(countryId);
        }
    };

    useEffect(() => {
        if (onCountryClick) {
            const worldWrapper = document.getElementById('world')!;
            const countries = [
                ...worldWrapper.querySelectorAll('path'),
                ...worldWrapper.querySelectorAll('polygon'),
            ];

            countries.forEach((country) => {
                country.addEventListener('click', handleCountryClick);
            });

            return () => {
                countries.forEach((country) => {
                    country.removeEventListener('click', handleCountryClick);
                });
            };
        }
    }, [onCountryClick]);

    return (
        <div
            className="world__wrapper"
            style={{ ..._style }}>
            <section id="world">
                {tooltip === 'on' && (
                    <Tooltip
                        targetId="world"
                        background={tooltipBgColor}
                        color={tooltipTextColor}
                    />
                )}
                <World />
            </section>
        </div>
    );
};

export default WorldMap;
