/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from "react"
import gql from "graphql-tag"
import {useMutation} from "@apollo/client"

const FacebookAuthMutation = gql`
	mutation FacebookAuth($token: String!) {
		authenticate(input: {facebook: {token: $token}}) {
			... on CurrentUser {
				id
				identifier
			}
			... on ErrorResult {
				errorCode
				message
			}
		}
	}
`

export function FbLoginButton() {
	const fnName = `onFbLoginButtonSuccess`
	// const router = useRouter()
	const [error, setError] = useState("")
	const [socialLoginMutation] = useMutation(FacebookAuthMutation)

	useEffect(() => {
		(window as any)[fnName] = function () {
			(window as any).FB.getLoginStatus(login)
		}
		return () => {
			delete (window as any)[fnName]
		}
	}, [])

	useEffect(() => {
		(window as any)?.FB?.XFBML.parse()
	}, [])

	const login = async (response: any) => {
		const {status, authResponse} = response
		if (status === "connected") {
			const result = await socialLoginMutation({
				variables: {token: authResponse.accessToken}
			})
			if (result.data?.authenticate.__typename === "CurrentUser") {
				// The user has logged in, refresh the browser
				// trackLogin("facebook")
				// router.reload()
				return
			}
		}
		setError("An error occurred!")
	}

	return (
		<div className="text-center" style={{width: 188, height: 28}}>
			<div
				className="fb-login-button"
				data-width=""
				data-size="medium"
				data-button-type="login_with"
				data-layout="default"
				data-auto-logout-link="false"
				data-use-continue-as="false"
				data-scope="public_profile,email"
				data-onlogin={`${fnName}();`}
			/>
			{error && <div className="text-sm text-red-500">{error}</div>}
		</div>
	)
}
