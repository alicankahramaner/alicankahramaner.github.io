import * as React from 'react';
import { BasePage } from './BasePage';
import { Section } from '../Components/Section/Section';
import { connect } from 'react-redux';
import * as ProfileAction from '../Actions/Profile/index';
import { ProfileDto } from '../Models/Profile';
import { bindActionCreators } from 'redux';
import { DirectionEnum } from '../Models/System';
import { Picture } from '../Components/Picture/Picture';

interface HomeProps extends ProfileAction.ProfileActionDeclarations {
    ProfileData: ProfileDto;
}

export class Home extends BasePage<HomeProps, any> {

    render() {
        return (
            <React.Fragment>
                <Section noTransparentContent={true} contentDirection={DirectionEnum.Middle} className={['homepage','bgi-room']}>
                    <Picture bordered align={DirectionEnum.Middle} size={{width:150,height:150}} src="https://avatars0.githubusercontent.com/u/12401497?s=460&u=d717dc1b7f7466ce16e94de40a90a2c06f3db3d8&v=4" />
                    <h1>Alican Kahramaner</h1>
                    <h4>Front-End Developer</h4>
                </Section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, props: HomeProps) => {
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

connect(mapStateToProps, mapDispatchToProps)(Home);