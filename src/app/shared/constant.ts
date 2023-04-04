import { environment } from '../../environments/environment';

const BASEURL = environment.ApiURL + '/api';

export const EndPoints = {
    ONBOARDING: BASEURL + '/auth',
    USER: BASEURL + '/user',
    ADMIN: BASEURL + '/admin',
    MEAL: BASEURL + '/meal',
    FOODITEM: BASEURL + '/fooditem',
    SUBSCRIPTION: BASEURL + '/subscription',
    SCHEDULE: BASEURL + '/mealschedule',
    ROLE: BASEURL + '/roles',
    ACCOUNT: BASEURL + '/account'
};

export const SystemConstant: any = {
    EMAILREGEX: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    ENCRYPTIONSECRETKEY: '</#%!Spe@rHe@d!%#/>Zci>b"T|aM<tB5R|dsMMR-83q2:oc@qYix{b.vrI=n',
    HEADER: {
        'Content-Type': 'application/json',
        'client-apiKey': 'We@ReDGre@teSt',
        Authorization: 'Bearer',
        Accept: 'application/json'
    },
    // SERVICEURL: environment.ServiceURL,
    APPNAME: environment.appName,

    SESSIONKEY: '_WH@TD0Y0UW@NT_'

};