import {useDispatch, useSelector} from 'react-redux';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {SET_AUTHENTICATION_STATUS} from '../../redux/Type';
import {useCallback, useEffect} from 'react';
import {AppState} from 'react-native';

const Authentication = ({navigation}) => {
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(state => state.isUserAuthenticated);
  const biometricCheck = useCallback(async () => {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });

    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (
        available &&
        (biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.Biometrics)
      ) {
        rnBiometrics
          .simplePrompt({promptMessage: 'Confirm fingerprint'})
          .then(resultObject => {
            const {success} = resultObject;
            if (success) {
              dispatch({
                type: SET_AUTHENTICATION_STATUS,
                isUserAuthenticated: true,
              });
            } else {
              biometricCheck();
            }
          })
          .catch(() => {
            //nothing
          });
      } else {
        dispatch({
          type: SET_AUTHENTICATION_STATUS,
          isUserAuthenticated: true,
        });
      }
    });
  }, [dispatch]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAppStateChange = nextAppState => {
    console.log('called');
    if (nextAppState.toLowerCase() === 'active' && !isUserAuthenticated) {
      biometricCheck();
    }
  };
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    !isUserAuthenticated && biometricCheck();
    return () => {
      subscription.remove();
    };
  }, [biometricCheck, handleAppStateChange, isUserAuthenticated]);
};

export default Authentication;
