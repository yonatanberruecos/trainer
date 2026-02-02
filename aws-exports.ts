// const awsconfig = {
//     Auth: {
//         Cognito: {
//             region: 'us-east-2',
//             userPoolId: 'us-east-2_HauUlF27W',
//             userPoolWebClientId: '2m83ps583t65nd4ggt717iqt80',
//             userPoolClientId: '2m83ps583t65nd4ggt717iqt80',
//             loginWith: {
//                 email: true,
//               },
//               signUpVerificationMethod: "code",
//               userAttributes: {
//                 email: {
//                   required: true,
//                 },
//             },
//         }
//     }
// };
  
// export default awsconfig;

import { ResourcesConfig } from "aws-amplify"
import { LegacyConfig } from "aws-amplify/adapter-core"

export const COGNITO_CONFIG: ResourcesConfig | LegacyConfig = {
    Auth: {
        Cognito: {
            userPoolId: process.env.USER_POOL_ID as string,
            userPoolClientId: process.env.USER_POOL_CLIENT_ID as string,            
            loginWith: {
                oauth: {
                    domain: "domain",
                    scopes: ["email", "openid", "profile"],
                    redirectSignIn: ["http://localhost:3000/"],
                    redirectSignOut: ["http://localhost:3000/"],
                    responseType: "code",
                },
            },
        },
    },
};
  