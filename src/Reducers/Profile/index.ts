import { ProfileDto } from '../../Models/Profile/index';
import { iReducer } from '../../Models/System/index';

const ProfileInitiliazeReducer: ProfileDto = {
    Github: {
        id: 0,
        avatar_url: '',
        blog: '',
        company: '',
        location: '',
        name: '',
        url: ''
    },
    Profile: {
        Name: '',
        LastName: '',
        Title: '',
        Company: ''
    }
}

export enum ProfileActionTypes {
    GetGithubProfile = 'Profile.GetGithub'
}

export const Profile: iReducer<ProfileDto> = (state = ProfileInitiliazeReducer, action) => {
    switch (action.type) {
        case ProfileActionTypes.GetGithubProfile:
            return { ...state, Github: action.data }
        default:
            return state;
    }
}
