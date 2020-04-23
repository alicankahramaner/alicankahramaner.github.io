import * as React from 'react';
import { BasePage } from './BasePage';
import { Section } from '../Components/Section/Section';
import { connect } from 'react-redux';
import * as ProfileAction from '../Actions/Profile/index';
import { bindActionCreators } from 'redux';
import { DirectionEnum } from '../Models/System';
import { SkillList } from '../Components/SkillList/SkillList';

const data = require('../Resources/data.json');

interface AboutProps extends ProfileAction.ProfileActionDeclarations {
}

export class About extends BasePage<AboutProps, any> {

    render() {
        return (
            <Section className={['bgi-workspace']} contentDirection={DirectionEnum.Middle}>
                <h1>About</h1>
                <p>Merhabalar,</p>
                <p>Ben <strong>Alican KAHRAMANER</strong> Front-End Developer olarak çalışmaktayım.</p>
                <p>Lise ve Üniversite de yazılım alanında okumuş ama daha öncesinden beri bilgisayar donanım ve yazılıma olan ilgim ile işimi sevmiş oldum.</p>
                <p>Front-End teknolokilerindeki gelişmeler ve yenilikleri yakından takip çalıştığım şirket ve çalışmış olduğum şirketler deki projelerin ve kendi projelerimin ihtiyaçları doğrultusunda kullanmaya çalışıyorum.</p>
                <p>Bir Apple hayranı ve aynı zamanda OpenSource destekçisi olarak Front-End developer olarak hayatıma devam etmekteyim.</p>

                <SkillList title="Teknolojiler ve Kavramlar" data={data.skils} />
                <SkillList title="Kullandığım Uygulamalar" data={data.applications} />
            </Section>
        );
    }
}

const mapStateToProps = (state: any, props: AboutProps) => {
    return {
        ...props,
        ProfileData: state.Profile.Github
    }
}
const mapDispatchToProps = (dispatch: any, state: any) => {
    return bindActionCreators({
        ...ProfileAction
    }, dispatch)
}

connect(mapStateToProps, mapDispatchToProps)(About);