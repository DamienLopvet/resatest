import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  
    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
            ;
        </div>
    );
}
