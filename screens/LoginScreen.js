import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Login Error", error.message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return (
      <LoadingOverlay message="Logging..." />
    )
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;