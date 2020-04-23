import * as React from 'react';
import { BaseComponent, BaseComponentProps } from './../BaseComponent';
import { DirectionEnum } from '../../Models/System';

interface SectionProps extends BaseComponentProps {
    title?: string;
    bgColor?: string;
    bgImage?: string;
    noTransparentContent?: boolean;
    contentDirection?: DirectionEnum;
}


export class Section extends BaseComponent<SectionProps, any> {

    constructor(props: SectionProps) {
        super(props);

        this.name = 'section';
    }

    private className(suffix?: string) {

        if (suffix) {
            return `${this.name}-${suffix}`;
        }

        let classList: string[] = [this.name];

        if (this.props.className) {
            classList = classList.concat(this.props.className);
        }

        if (this.props.contentDirection) {
            classList.push(this.props.contentDirection);
        }

        if (this.props.noTransparentContent) {
            classList.push('noTransparentContent');
        }

        return classList.join(' ');
    }

    get style() {

        this.styleProperties = {};

        if (this.props.bgImage) {
            this.styleProperties.backgroundImage = `url(${this.props.bgImage})`;
        }

        return this.styleProperties;
    }

    render() {
        return (
            <section id={this.id} className={this.className()} style={this.style}>
                {
                    this.props.title ?
                        <h3>{this.props.title}</h3>
                        : null
                }
                <div className={this.className('content')}>
                    {this.props.children}
                </div>
            </section>
        );
    }
}