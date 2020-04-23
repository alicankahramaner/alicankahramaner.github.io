import * as React from 'react';
import { Section } from '../Components/Section/Section';
import { DirectionEnum } from '../Models/System';
import { BasePage } from './BasePage';

export class Error404 extends BasePage<any, any> {

    render() {
        return (
            <React.Fragment>
                <Section noTransparentContent={true} contentDirection={DirectionEnum.Middle} className={['page404', 'bgi-light']}>
                    <h3>Aradığınız sayfayı silmiş veya hala geliştiriyor olabilir. :)</h3>
                    <h5>Tekrar Başlamak için [index.html]</h5>
                </Section>
            </React.Fragment>
        );
    }

}