import * as React from 'react';
import { BaseComponentProps } from './../BaseComponent';
import { SizeDto, DirectionEnum } from '../../Models/System';

interface PictureProps extends BaseComponentProps {
    src: string;
    alt?: string;
    title?: string;
    size: SizeDto;
    bordered?: boolean;
    align?: DirectionEnum.Left | DirectionEnum.Right | DirectionEnum.Middle
}

export const Picture: React.FunctionComponent<PictureProps> = (props) => {

    const className = () => {
        let classList: string[] = ['picture'];

        if (props.className) {
            classList = classList.concat(props.className);
        }

        if (props.bordered) {
            classList.push('bordered');
        }

        if (props.align) {
            classList.push(props.align);
        }

        return classList.join(' ');
    }

    const size = () => {
        if (!props.size) {
            return {};
        }

        return {
            width: `${props.size.width}px`,
            height: `${props.size.height}px`
        } as React.CSSProperties
    }

    return (
        <figure title={props.title} className={className()}>
            <img src={props.src} alt={props.alt} style={size()} />
        </figure>
    )
}