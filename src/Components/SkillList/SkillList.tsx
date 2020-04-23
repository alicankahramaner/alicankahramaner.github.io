import * as React from 'react';
import { BaseComponent, BaseComponentProps } from '../BaseComponent';


interface SkillListProps extends BaseComponentProps {
    data: string[];
    title: string;
}

export class SkillList extends BaseComponent<SkillListProps, any> {
    constructor(props: SkillListProps) {
        super(props);

        this.name = 'skillList';
    }

    private className(suffix?: string) {
        if (suffix) {
            return `${this.name}-${suffix}`;
        }

        let classList: string[] = [this.name];

        if (this.props.className) {
            classList = classList.concat(this.props.className);
        }

        return classList.join(' ');
    }

    render() {
        return (
            <div className={this.className()}>
                <span>{this.props.title}</span>
                <ul>
                    {
                        this.props.data.map((skill: string, index: number) => {
                            return (
                                <li key={skill} className={this.className('item')}>{skill}</li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}